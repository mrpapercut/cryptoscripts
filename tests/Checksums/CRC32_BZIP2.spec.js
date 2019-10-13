import CRC32_BZIP2 from '../../src/Checksums/CRC32_BZIP2';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const crc32 = new CRC32_BZIP2();

test('Create CRC32/BZIP2 checksum for short string', () => {
    expect(crc32.checksum(shortString)).toEqual(0x8E9A7706);
});

test('Create CRC32/BZIP2 checksum for long string', () => {
    expect(crc32.checksum(longString)).toEqual(0x8296ED70);
});
