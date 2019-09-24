import Base from '../Base';

/**
 * GCC CRC32
 * aka CRC32_BZIP
 */

class CRC32_BZIP2 extends Base {
    constructor() {
        super();

        this.table = this.createTable();
    }

    createTable() {
        let c, j;
        return new Array(256).fill().map((_, i) => {
            for (c = i << 24, j = 8; j > 0; --j) c = c & 0x80000000 ? (c << 1) ^ 0x04c11db7 : (c << 1);

            return c;
        });
    }

    checksum(bytes) {
        if (bytes.constructor === String) {
            bytes = this.stringToByteArray(bytes);
        }

        let crc = -1;

        for (let i = 0; i < bytes.length; i++) {
            crc = this.table[((crc >> 24) ^ bytes[i]) & 0xff] ^ (crc << 8);
        }

        return (crc ^ (-1)) >>> 0;
    }
}

export default CRC32_BZIP2;
