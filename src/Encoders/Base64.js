import Base from '../Base';

class Base64 extends Base {
    constructor() {
        super();

        this.base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    }

    encode(input) {
        const inputArray = this.stringToByteArray(input);
        let length = inputArray.length;

        const charArr = new Array(3);
        const b64Arr = [];

        let i = 0; // Count 0-3 in charArr
        let j = 0; // Counts through all characters in inputArray
        let s = 0; // Counts through all characters in output
        while (length--) {
            charArr[i++] = inputArray[j++];
            if (i === 3) {
                const remappedChars = this.remap3to4chars(charArr);

                for (let k = 0; k < 4; k++) {
                    b64Arr[s++] = this.base64_chars[remappedChars[k]];
                }

                i = 0;
            }
        }

        if (i) {
            for (let l = i; l < 3; l++) {
                charArr[l] = '\0';
            }

            const remappedChars = this.remap3to4chars(charArr);

            for (let m = 0; m < i + 1; m++) {
                b64Arr[s++] = this.base64_chars[remappedChars[m]];
            }

            while (i++ < 3) {
                b64Arr[s++] = '=';
            }
        }

        return b64Arr.join('');
    }

    decode(input) {
        let len = input.length;

        const charArray = new Array(4);

        let i = 0;
        let k = 0;

        const result = [];

        while (len--) {
            charArray[i++] = input[k++];

            if (i === 4) {
                result.push(
                    charArray.map(c => { // Get original char from base64_chars
                        const index = this.base64_chars.indexOf(c);
                        if (index !== -1) {
                            return index.toString(2).padStart(6, 0);
                        }
                    })
                        .filter(Boolean) // Clear empty values in array
                        .join('')
                        .match(/(.{8})/g) // Split string into pairs of 8bits
                        .map(m => String.fromCharCode(parseInt(m, 2))) // 8bit to Character
                        .join('')
                );

                i = 0;
            }
        }

        return result.join('');
    }
}

export default Base64;
