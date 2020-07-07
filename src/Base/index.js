class Base {
    constructor() {

    }

    bitstringToByteArray(input) {
        const output = new Uint8Array(input.length / 8);

        for (let i = 0, j = 0; i < input.length; i += 8) {
            output[j++] = parseInt(input.substring(i, i + 8), 2);
        }

        return output;
    }

    byteArrayToBitstring(input) {
        const output = [];

        for (const i in input) output[i] = input[i].toString(2).padStart(8, 0);

        return output.join('');
    }

    stringToByteArray(input) {
        const output = new Uint8Array(input.length);

        for (const i in input) output[i] = input.charCodeAt(i);

        return output;
    }

    byteArrayToString(input) {
        const output = [];

        for (const i in input) output[i] = String.fromCharCode(input[i]);

        return output.join('');
    }

    decToHex(dec, padLength = 0) {
        return dec.toString(16).padStart(padLength, '0');
    }

    stringToHex(str) {
        let res = '';

        for (const i in str) {
            res += str[i].charCodeAt(0).toString(16).padStart(2, 0);
        }

        return res;
    }

    remap3to4chars(input, transform) {
        let resArr = new Array(4);

        resArr[0] = (input[0] & 0xfc) >> 2;
        resArr[1] = ((input[0] & 0x03) << 4) + ((input[1] & 0xf0) >> 4);
        resArr[2] = ((input[1] & 0x0f) << 2) + ((input[2] & 0xc0) >> 6);
        resArr[3] = input[2] & 0x3f;

        if (transform && transform.constructor instanceof Function) {
            resArr = resArr.map(transform);
        }

        return resArr;
    }

    remap4to5chars(input, transform) {

    }

    encodeBitstring(input) {
        /**
         * Format: [ length of length of original string (1 byte) |  length of original bitstring | original string, padded to bytes ]
         */
        const slen = input.length.toString(16).padStart(2, 0);
        const slenlen = slen.length.toString(16).padStart(2, 0);
        const padded = input.match(/.{1,8}/g).map(c => parseInt(c, 2).toString(16).padStart(2, 0)).join('');

        return `${slenlen}${slen}${padded}`;
    }

    decodeBitstring(input) {
        const slenlen = parseInt(input.substring(0, 2), 16); // Length of slen
        const slen = parseInt(input.substring(2, 2 + slenlen), 16); // Length of original bitstring
        const parts = input.substring(2 + slenlen).match(/.{2}/g).map(c => parseInt(c, 16).toString(2).padStart(8, 0));

        if (slen % 8 !== 0) {
            parts[parts.length - 1] = parts[parts.length - 1].substring(8 - (slen % 8));
        }

        return parts.join('');
    }
}

export default Base;
