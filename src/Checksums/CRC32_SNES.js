import Base from '../Base';

/**
 * Checksum algorithm of Super Nintendo ROMs
 */

class CRC32_SNES extends Base {
    constructor() {
        super();
        this.table = this.createTable();
    }

    createTable() {
        return new Array(256).fill().map((_, c) => {
            new Array(8).fill().forEach(() =>
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1))
            );
            return c;
        });
    }

    checksum(bytes) {
        if (bytes.constructor === String) {
            bytes = this.stringToByteArray(bytes);
        }

        let crc = -1;
        for (let i = 0; i < bytes.length; i++) {
            crc = (crc >>> 8) ^ this.table[(crc ^ bytes[i]) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    }
}

export default CRC32_SNES;
