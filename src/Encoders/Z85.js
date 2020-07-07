/**
 * https://rfc.zeromq.org/spec:32/Z85
 */
import Base from '../Base';

class Z85 extends Base {
    constructor() {
        super();
        this.encoder = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
        this.decoder = [
            0x00, 0x44, 0x00, 0x54, 0x53, 0x52, 0x48, 0x00,
            0x4B, 0x4C, 0x46, 0x41, 0x00, 0x3F, 0x3E, 0x45,
            0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
            0x08, 0x09, 0x40, 0x00, 0x49, 0x42, 0x4A, 0x47,
            0x51, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A,
            0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32,
            0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A,
            0x3B, 0x3C, 0x3D, 0x4D, 0x00, 0x4E, 0x43, 0x00,
            0x00, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10,
            0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
            0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20,
            0x21, 0x22, 0x23, 0x4F, 0x00, 0x50, 0x00, 0x00
        ];
    }

    encode(input) {
        let srccount = 0;
        let charcount = 0;
        let value = 0;

        while (input.length % 4) {
            input += '\0';
        }

        const inputArr = this.stringToByteArray(input);

        const encoded = [];

        while (srccount < inputArr.length) {
            value = value * 256 + inputArr[srccount++];

            if (srccount % 4 === 0) {
                let divisor = 85 * 85 * 85 * 85;
                while (divisor) {
                    encoded[charcount++] = this.encoder[Math.floor(value / divisor % 85)];
                    divisor = Math.floor(divisor / 85);
                }

                value = 0;
            }
        }

        return encoded.join('');
    }

    decode(input) {
        if (input.length % 5 !== 0) return; // Invalid Z85-encoding length

        let charcount = 0;
        let destcount = 0;
        let value = 0;

        const inputArr = this.stringToByteArray(input);

        const decoded = [];

        while (charcount < input.length) {
            value = value * 85 + this.decoder[inputArr[charcount++] - 32];

            if (charcount % 5 === 0) {
                let divisor = 256 * 256 * 256;
                while (divisor) {
                    decoded[destcount++] = String.fromCharCode(Math.floor(value / divisor % 256));
                    divisor = Math.floor(divisor / 256);
                }

                value = 0;
            }
        }

        return decoded
            .join('')
            .replace(/\0{1,3}$/, ''); // Remove trailing padding
    }
}

export default Z85;
