import Base from '../Base';

class Xxenconding extends Base {
    constructor() {
        super();

        this.chars = '+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }

    encode(input) {
        const inputArray = new Uint8Array(input.length);
        for (const i in input) inputArray[i] = input.charCodeAt(i);

        const charArr = new Array(3);

        let len = input.length;
        let [i, j, k, s] = [0, 0, 0, 0];

        const lines = [];
        let line = [];

        while (len--) {
            charArr[i++] = inputArray[k++];

            if (i === 3) {
                const remappedChars = this.remap3to4chars(charArr);

                for (let n = 0; n < 4; n++) {
                    line[s++] = this.chars[remappedChars[n]];
                }

                i = 0;
            }

            if (k % 45 === 0) {
                lines.push(this.chars[45] + line.join(''));
                line = [];
            }
        }

        if (i) {
            for (j = i; j < 3; j++) {
                charArr[j] = 0;
            }

            const remappedChars = this.remap3to4chars(charArr);

            for (let n = 0; n < 4; n++) {
                line[s++] = remappedChars[n] === 0 ? '+' : this.chars[remappedChars[n]];
            }
        }

        lines.push(this.chars[k > 45 ? k % 45 : k] + line.join(''));

        return lines.join('\n') + '\n';
    }

    decode(input) {
        const lines = input.split('\n');

        const result = lines.reduce((acc, cur) => {
            const curArr = this.stringToByteArray(cur);
            const resArr = new Array(4);
            const lineRes = [];

            // Last line is of length 0
            if (curArr.length === 0) return acc + '';

            const origLen = this.chars.indexOf(String.fromCharCode(curArr[0]));
            let curLen = curArr.length;
            let i = 0;
            let k = 1; // Skip first character because it indicates length

            while (curLen--) {
                resArr[i++] = curArr[k++];

                if (i === 4) {
                    lineRes.push(
                        resArr.map(c => {
                            const index = this.chars.indexOf(String.fromCharCode(c));
                            if (index !== -1) {
                                return index.toString(2).padStart(6, 0);
                            }
                        })
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

export default Xxenconding;
