import Huffman from '../../src/Encoders/Huffman';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString,
    loadSourcefile
} from '../TestBase';

const encoder = new Huffman();

test('Should encode & decode short string using Huffman encoding', () => {
    const encoded = encoder.encode(shortString);

    expect(encoder.decode(encoded)).toEqual(shortString);
});

test('Should safeEncode & safeDecode short string using Huffman encoding', () => {
    const encoded = encoder.safeEncode(shortString);

    expect(encoder.safeDecode(encoded)).toEqual(shortString);
});

test('Should encode & decode long string using Huffman encoding', () => {
    const encoded = encoder.encode(longString);

    expect(encoder.decode(encoded)).toEqual(longString);
});

test('Should safeEncode & safeDecode long string using Huffman encoding', () => {
    const encoded = encoder.safeEncode(longString);

    expect(encoder.safeDecode(encoded)).toEqual(longString);
});

test('Should encode and decode its own sourcecode using Huffman encoding', (done) => {
    loadSourcefile('../src/Encoders/Huffman.js').then((res, rej) => {
        const sourcecode = res.toString();
        const encodedString = encoder.encode(sourcecode);

        expect(encoder.decode(encodedString)).toEqual(sourcecode);

        done();
    });
});

test('Should safeEncode and safeDecode its own sourcecode using Huffman encoding', (done) => {
    loadSourcefile('../src/Encoders/Huffman.js').then((res, rej) => {
        const sourcecode = res.toString();
        const encodedString = encoder.encode(sourcecode);

        expect(encoder.decode(encodedString)).toEqual(sourcecode);

        done();
    });
});
