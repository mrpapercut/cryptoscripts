import MD4 from '../../src/Hashers/MD4';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString,
    loadSourcefile
} from '../TestBase';

const hasher = new MD4();

test('Should encode and decode short string using Z85 encoding', () => {
    const encodedString = encoder.encode(shortString);

    expect(encoder.decode(encodedString)).toEqual(shortString);
});

test('Should encode and decode long string using Z85 encoding', () => {
    const encodedString = encoder.encode(longString);

    expect(encoder.decode(encodedString)).toEqual(longString);
});

test('Should encode and decode its own sourcecode using Z85 encoding', (done) => {
    loadSourcefile('../src/Encoders/Z85.js').then((res, rej) => {
        const sourcecode = res.toString();
        const encodedString = encoder.encode(sourcecode);

        expect(encoder.decode(encodedString)).toEqual(sourcecode);

        done();
    });
});
