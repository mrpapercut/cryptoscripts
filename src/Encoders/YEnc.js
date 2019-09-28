/**
 * http://www.yenc.org/yenc-draft.1.3.txt
 */
import Base from '../Base';

class YEnc extends Base {
    constructor() {
        super();
    }

    encode(input) {
        const inputArray = this.stringToByteArray(input);
        const filename = 'binary.dat'; // irrelevant but required

        const lines = [`=ybegin line=128 size=${inputArray.length} name=${filename}`];

        let length = inputArray.length;
        let line = [];
        let i = 0;
        let j = 0;

        while (length--) {
            let nc = (inputArray[i++] + 42) % 256;

            if ([0, 10, 13, 61].indexOf(nc) !== -1) nc = `=${String.fromCharCode(nc)}`;
            else nc = String.fromCharCode(nc);

            line.push(nc);

            if (i % 128 === 0) {
                lines.push(line.join(''));
                line = [];
            }
        }

        if (i) {
            lines.push(line.join(''));
        }

        lines.push(`=yend size=${inputArray.length}`);

        return lines.join('\r\n') + '\r\n';
    }

    decode(input) {
        const lines = input.split('\r\n');

        if (!lines[0].match(/^=ybegin/)) return 'Invalid yEncoding';

        // Get info from header
        const [fm, linelen, decodelen, filename] = lines[0].match(/=ybegin line=(\d+) size=(\d*) name=(.*)/);
        lines.shift();

        // Remove last line of whitespace
        if (lines[lines.length - 1].match(/^\s*$/)) lines.pop();
        // Last line contains decodelen (again) and optional checksum that we ignore
        if (lines[lines.length - 1].match(/^=yend/)) lines.pop();

        const resArr = new Array(decodelen);

        let k = 0;
        lines.forEach(line => {
            for (let i = 0; i < line.length; i++) {
                // Handle escape characters
                if (line.charCodeAt(i) === 61) i++;

                resArr[k++] = String.fromCharCode((line.charCodeAt(i) - 42) & 0xff);
            }
        });

        return resArr.join('');
    }
}

export default YEnc;
