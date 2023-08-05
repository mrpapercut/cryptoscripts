import MD4 from '../../src/Hashers/MD4';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString,
    loadSourcefile
} from '../TestBase';

const hasher = new MD4();

test('Should encode and decode short string using MD4 hasher', () => {
    const encodedString = hasher.encode(shortString);

    expect(hasher.decode(encodedString)).toEqual(shortString);
});

test('Should encode and decode long string using MD4 hasher', () => {
    const encodedString = hasher.encode(longString);

    expect(hasher.decode(encodedString)).toEqual(longString);
});

test('Should encode and decode its own sourcecode using MD4 hasher', (done) => {
    loadSourcefile('../src/Hashers/MD4.js').then((res, rej) => {
        const sourcecode = res.toString();
        const encodedString = hasher.encode(sourcecode);

        expect(hasher.decode(encodedString)).toEqual(sourcecode);

        done();
    });
});
