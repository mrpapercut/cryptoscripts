import CRC32_SNES from '../../src/Checksums/CRC32_SNES';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const crc32 = new CRC32_SNES();

test('Create CRC32/SNES checksum for short string', () => {
    expect(crc32.checksum(shortString)).toEqual(3957769958);
});

test('Create CRC32/SNES checksum for long string', () => {
    expect(crc32.checksum(longString)).toEqual(4042999572);
});
