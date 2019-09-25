import Base from '../Base';

class UUEncoding extends Base {
    constructor() {
        super();
    }

    encode(input) {
        let inputArray = new Uint8Array(input.length);
        for (let i in input) inputArray[i] = input.charCodeAt(i);

        let char_array_3 = new Array(3);
        let char_array_4 = new Array(4);

        let len = input.length;
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

        lines.push(String.fromCharCode((k > 45 ? k % 45 : k) + 32) + line.join('') + '\n');

        return lines.join('') + '`\n';
    }

    decode(input) {
        const lines = input.split('\n');

        const result = lines.reduce((acc, cur) => {
            const curArr = this.stringToByteArray(cur);
            const resArr = new Array(4);
            const lineRes = [];

            // Last line is of length 0
            if (curArr.length === 0) return acc + '';
            // End of input is indicated with charCode 96
            if (curArr[0] === 96) return acc + '';

            let origLen = curArr[0] - 32;
            let curLen = curArr.length;
            let i = 0;
            let k = 1; // Skip first character because it indicates length

            while (curLen--) {
                resArr[i++] = curArr[k++] - 32;

                if (i === 4) {
                    lineRes.push(
                        resArr.map(c => c.toString(2).padStart(6, 0))
                        .join('')
                        .match(/(.{8})/g)
                        .map(m => String.fromCharCode(parseInt(m, 2)))
                        .join('')
                    );

                    i = 0;
                }
            }

            let decodedLine = lineRes.join('');
            if (decodedLine.length > origLen) {
                decodedLine = decodedLine.substring(0, origLen);
            }

            return acc + decodedLine;
        }, '');

        return result;
    }
}

export default UUEncoding;