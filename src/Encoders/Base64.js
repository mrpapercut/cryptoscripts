import Base from '../Base';

class Base64 extends Base {
    constructor() {
        super();

        this.base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    }

    encode(input) {
        let inputArray = [];

        for (let i in input) {
            inputArray.push(input[i].charCodeAt(0));
        }

        let length = inputArray.length;

        let [i, j, k, s] = [0, 0, 0, 0];

        let char_array_3 = new Array(3);
        let char_array_4 = new Array(4);

        const b64len = (length + 2 - ((length + 2) % 3)) * 4 / 3;
        const b64str = new Array(b64len + 1);

        while (length--) {
            char_array_3[i++] = inputArray[k++];
            if (i == 3) {
                char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
                char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
                char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
                char_array_4[3] = char_array_3[2] & 0x3f;

                for (i = 0; i < 4; i++)
                    b64str[s++] = this.base64_chars[char_array_4[i]];

                i = 0;
            }
        }

        if (i) {
            for (j = i; j < 3; j++)
                char_array_3[j] = '\0';

            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;

            for (j = 0; j < i + 1; j++)
                b64str[s++] = this.base64_chars[char_array_4[j]];

            while (i++ < 3)
                b64str[s++] = '=';
        }

        return b64str.join('');
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
                        let index = this.base64_chars.indexOf(c);
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
