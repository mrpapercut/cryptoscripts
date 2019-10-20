import LZ77 from '../../src/Compressors/LZ77';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const rwt = `import Base from '../Base';

class LZ77 extends Base {
    constructor(window_size = 20) {
        super();
        this.MAX_WINDOW_SIZE = 400;

        this.window_size = Math.min(window_size, this.MAX_WINDOW_SIZE);

        this.lookahead_buffer_size = 15;
    }

    compress(data) {
        let i = 0;
        let output_buffer = '';

        while (i < data.length) {
            const match = this.findLongestMatch(data, i);

            if (match) {
                const {best_match_distance, best_match_length} = match;

                // Add 1 bit flag, followed by 12 bit for distance and 4 bit for the length of the match
                output_buffer += 1;
                output_buffer += String
                    .fromCharCode(best_match_distance >> 4)
                    .charCodeAt(0)
                    .toString(2)
                    .padStart(8, '0');

                output_buffer += String
                    .fromCharCode(((best_match_distance & 0xf) << 4) | best_match_length)
                    .charCodeAt(0)
                    .toString(2)
                    .padStart(8, '0');

                i += best_match_length;
            } else {
                // No useful match. Add 0 bit flag, followed by 8 bit for the character
                output_buffer += 0;
                output_buffer += data[i].charCodeAt(0).toString(2).padStart(8, '0');

                i += 1;
            }
        }

        let buff_len = output_buffer.length % 8;
        if (buff_len !== 0) {
            for (let i = 0; i < buff_len; i++) {
                output_buffer += 0;
            }
        }

        return output_buffer;
    }

    decompress(data) {
        let output_buffer = '';

        while (data.length >= 9) {
            let flag = data[0];
            data = data.slice(1);

            if (flag === '0') {
                let byte = String.fromCharCode(parseInt(data.substring(0, 8), 2));
                output_buffer += byte;

                data = data.slice(8);
            } else {
                let byte1 = parseInt(data.substring(0, 8), 2);
                let byte2 = parseInt(data.substring(8, 16), 2);

                data = data.slice(16);

                let distance = (byte1 << 4) | (byte2 >> 4);
                let length = (byte2 & 0xf);

                for (let i = 0; i < length; i++) {
                    output_buffer += output_buffer[output_buffer.length - distance];
                }
            }
        }

        return output_buffer;
    }

    findLongestMatch(data, current_position) {
        let k = 0;

        let end_of_buffer = Math.min(current_position + this.lookahead_buffer_size, data.length + 1);

        let best_match_distance = -1;
        let best_match_length = -1;

        for (let i = current_position + 2; i < end_of_buffer; i++) {
            let start_index = Math.max(0, current_position - this.window_size);
            let substring = data.substring(current_position, i);

            for (let j = start_index; j < current_position; j++) {
                let repetitions = Math.round(substring.length / (current_position - j));
                let last = substring.length % (current_position - j);

                let matched_string = '';
                for (let k = 0; k < repetitions; k++) {
                    matched_string += data.substring(j, current_position);
                }
                matched_string += data.substring(j, j + last);

                if (matched_string === substring && substring.length > best_match_length) {
                    best_match_distance = current_position - j;
                    best_match_length = substring.length;
                }
            }
        }

        if (best_match_distance > 0 && best_match_length > 0) {
            return {
                best_match_distance,
                best_match_length
            };
        } else {
            return null;
        }
    }
}

export default LZ77;`;

for (let i = 200; i <= 400; i += 50) {
    const lz77 = new LZ77(i);

    test(`Should compress & decompress short string using LZ77 algorithm with windowSize ${i}`, () => {
        const encodedCompressed = lz77.safeEncode(shortString);

        // console.log(`Original length: ${shortString.length}, Compressed length: ${encodedCompressed.length}`);

        expect(lz77.safeDecode(encodedCompressed)).toEqual(shortString);
    });

    test(`Should compress & decompress long string using LZ77 algorithm with windowSize ${i}`, () => {
        const encodedCompressed = lz77.safeEncode(longString);

        // console.log(`Original length: ${longString.length}, Compressed length: ${encodedCompressed.length}`);

        expect(lz77.safeDecode(encodedCompressed)).toEqual(longString);
    });

    test(`Should compress & decompress real-world test using LZ77 algorithm with windowSize ${i}`, () => {
        const encodedCompressed = lz77.safeEncode(rwt);

        // console.log(`Original length: ${rwt.length}, Compressed length: ${encodedCompressed.length}`);

        expect(lz77.safeDecode(encodedCompressed)).toEqual(rwt);
    });
}
