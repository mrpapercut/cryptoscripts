import RC4 from '../../src/Ciphers/RC4';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const cipher = new RC4();

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
