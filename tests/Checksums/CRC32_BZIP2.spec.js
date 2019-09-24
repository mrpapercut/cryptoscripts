import CRC32_BZIP2 from '../../src/Checksums/CRC32_BZIP2';

const crc32 = new CRC32_BZIP2();

const shortString = 'Hello, world!';
const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';

test('Create CRC32/BZIP2 checksum', () => {
    expect(crc32.checksum(shortString)).toEqual(0x8E9A7706);

    expect(crc32.checksum(longString)).toEqual(0x8296ED70);
});
