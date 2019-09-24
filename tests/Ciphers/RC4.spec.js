import RC4 from '../../src/Ciphers/RC4';

const cipher = new RC4();

const shortString = 'Hello, world!';
const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';

test('Should encrypt/decrypt short string using RC4 algorithm', () => {
    const key = '9yC57X809uklPobZQ7b9o5Kemr2SEk7l0vbsDcKtr5U207XZ8WWWAwkd8rx0Gzah';

    const encrypted = cipher.cipher(shortString, key);

    expect(cipher.cipher(encrypted, key)).toEqual(shortString);
});

test('Should encrypt/decrypt long string using RC4 algorithm', () => {
    const key = 'D1zGlkfqfwtlAY4iM1l52xJz7txik4r0PlS9bJznAD1fM5kz62rYVzrM8wlYz0lc';

    const encrypted = cipher.cipher(longString, key);

    expect(cipher.cipher(encrypted, key)).toEqual(longString);
});
