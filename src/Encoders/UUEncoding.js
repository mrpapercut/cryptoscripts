import Base from '../Base';

class UUEncoding extends Base {
    constructor() {
        super();
    }

    encode(str) {
        let inputArray = new Uint8Array(str.length);
        for (let i in str) inputArray[i] = str.charCodeAt(i);

        let char_array_3 = new Array(3);
        let char_array_4 = new Array(4);

        let len = str.length;
        let [i, j, k, s] = [0, 0, 0, 0];

        let lines = new Array();
        let line = new Array();

        while (len--) {
            char_array_3[i++] = inputArray[k++];

            if (i === 3) {
                char_array_4[0] = ((char_array_3[0] & 0xfc) >> 2) + 32;
                char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4) + 32;
                char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6) + 32;
                char_array_4[3] = (char_array_3[2] & 0x3f) + 32;

                for (let n = 0; n < 4; n++) {
                    line[s++] = String.fromCharCode(char_array_4[n]);
                }

                i = 0;
            }

            if (k % 45 === 0) {
                lines.push(String.fromCharCode(77) + line.join('') + '\n');
                line = new Array();
            }
        }

        if (i) {
            for (j = i; j < 3; j++) {
                char_array_3[j] = '\0';
            }

            char_array_4[0] = ((char_array_3[0] & 0xfc) >> 2) + 32;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4) + 32;
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6) + 32;
            char_array_4[3] = (char_array_3[2] & 0x3f) + 32;

            for (let n = 0; n < 4; n++) {
                line[s++] = char_array_4[n] === 32 ? '`' : String.fromCharCode(char_array_4[n]);
            }
        }

        lines.push(String.fromCharCode((k > 45 ? k % 45 : k + 1) + 32) + line.join('') + '\n');

        return lines.join('') + '`\n';
    }

    decode(str) {

    }
}

export default UUEncoding;
