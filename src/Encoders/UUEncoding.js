import Base from '../Base';

class Uuencoding extends Base {
    constructor() {
        super();
    }

    encode(input) {
        let inputArray = new Uint8Array(input.length);
        for (let i in input) inputArray[i] = input.charCodeAt(i);

        let charArr = new Array(3);

        let len = input.length;
        let [i, j, k, s] = [0, 0, 0, 0];

        let lines = new Array();
        let line = new Array();

        while (len--) {
            charArr[i++] = inputArray[k++];

            if (i === 3) {
                const remappedChars = this.remap3to4chars(charArr, c => c + 32);

                for (let n = 0; n < 4; n++) {
                    line[s++] = String.fromCharCode(remappedChars[n]);
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
                charArr[j] = '\0';
            }

            const remappedChars = this.remap3to4chars(charArr, c => c + 32);

            for (let n = 0; n < 4; n++) {
                line[s++] = remappedChars[n] === 32 ? '`' : String.fromCharCode(remappedChars[n]);
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

export default Uuencoding;
