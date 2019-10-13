class Base {
    constructor() {

    }

    bitstringToByteArray(input) {
        let output = new Uint8Array(input.length / 8);

        for (let i = 0, j = 0; i < input.length; i += 8) {
            output[j++] = parseInt(input.substring(i, i + 8), 2);
        }

        return output;
    }

    byteArrayToBitstring(input) {
        let output = [];

        for (let i in input) output[i] = input[i].toString(2).padStart(8, 0);

        return output.join('');
    }

    stringToByteArray(input) {
        let output = new Uint8Array(input.length);

        for (let i in input) output[i] = input.charCodeAt(i);

        return output;
    }

    byteArrayToString(input) {
        let output = [];

        for (let i in input) output[i] = String.fromCharCode(input[i]);

        return output.join('');
    }

    decToHex(dec, padLength = 0) {
        return dec.toString(16).padStart(padLength, '0');
    }

    stringToHex(str) {
        let res = '';
        for (let i in str) {
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
}

export default Base;
