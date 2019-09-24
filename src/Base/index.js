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
}

export default Base;
