import Base from '../Base';

/**
 * Code adapted from https://tools.ietf.org/html/rfc1320
 */

class MD4 extends Base {
    constructor() {
        super();

        this.s11 = 3;
        this.s12 = 7;
        this.s13 = 11;
        this.s14 = 19;
        this.s21 = 3;
        this.s22 = 5;
        this.s23 = 9;
        this.s24 = 13;
        this.s31 = 3;
        this.s32 = 9;
        this.s33 = 11;
        this.s34 = 15;

        this.state = [
            0x67452301,
            0xefcdab89,
            0x98badcfe,
            0x10325476
        ];

        this.count = [
            0,
            0
        ];

        this.buffer = new Uint32Array(64);
    }

    F(x, y, z) {
        return ((x & y) | (~x & z));
    }

    G(x, y, z) {
        return ((x & y) | (x & z) | (y & z));
    }

    H(x, y, z) {
        return x ^ y ^ z;
    }

    FF(a, b, c, d, x, s) {
        a += F(b, c, d) + x;
        return this.rotateLeft(a, s);
    }

    GG(a, b, c, d, x, s) {
        a += G(b, c, d) + x + 0x5a827999; // 0x9979825a?
        return this.rotateLeft(a, s);
    }

    HH(a, b, c, d, x, s) {
        a += H(b, c, d) + x + 0x6ed9eba1; // 0xa1ebd96e?
        return this.rotateLeft(a, s);
    }

    rotateLeft(x, n) {
        return ((x << n) | x >> (32 - n));
    }

    update(input, inputLen) {
        const index = (this.count[0] >> 3) & 0x3f;

        if ((this.count[0] + (inputLen << 3)) < (inputLen << 3)) {
            this.count[0] += (inputLen << 3); // Necessary?
            this.count[1]++;
        }

        this.count[1] += (inputLen >> 29);

        const partLen = 64 - index;

        if (inputLen > partLen) {
            this.buffer = this.memcpy(this.buffer, input, partLen);
            this.transform(this.state, this.buffer);

            for (let i = partLen; i + 63 < inputLen; i += 64) {
                this.transform(this.state, input.charCodeAt(i));
            }
        } else {
            i = 0;
        }

        this.buffer = this.memcpy(this.buffer[index], input[i], inputLen - i);
    }

    finalize(digest) {

    }

    transform(block) {

    }

    encode(output, input, len) {
        for (let i = 0, j = 0; j < len; i++, j += 4) {
            output[j] = input[i] & 0xff;
            output[j + 1] = (input[i] >> 8) & 0xff;
            output[j + 2] = (input[i] >> 16) & 0xff;
            output[j + 3] = (input[i] >> 24) & 0xff;
        }

        return output;
    }

    decode(output, input, len) {
        for (let i = 0, j = 0; j < len; i++, j += 4) {
            output[i] = input[j] | (input[j + 1] << 8) | (input[j + 2] << 16) | (input[j + 3] << 24);
        }

        return output;
    }

    memcpy(output, input, len) {
        for (let i = 0; i < len; i++) {
            output[i] = input.charCodeAt(i);
        }

        return output;
    }

    memset(output, value, len) {
        for (let i = 0; i < len; i++) {
            output[i] = value;
        }

        return output;
    }
}

export default MD4;
