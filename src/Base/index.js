class Base {
    constructor() {

    }

    bitstringToArray(data) {
        let output = new Array();

        for (let i = 0; i < data.length; i += 8) {
            output.push(String.fromCharCode(parseInt(data.substring(i, i + 8), 2)));
        }

        return output;
    }

    byteArrayToBase64() {

    }

    base64ToBytes() {

    }

    bytesToBitstring() {

    }

    stringToByteArray(str) {
        let arr = new Uint8Array(str.length);

        for (let i in str) arr[i] = str.charCodeAt(i);

        return arr;
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
}

export default Base;
