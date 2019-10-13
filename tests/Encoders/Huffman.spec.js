import Huffman from '../../src/Encoders/Huffman';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const encoder = new Huffman();

test('Should encode & decode short string using Huffman encoding', () => {
    const encoded = encoder.encode(shortString);

    expect(encoder.decode(encoded)).toEqual(shortString);
});

/*
test('Should encode & decode long string using Huffman encoding', () => {
    const encoded = encoder.encode(longString);

    expect(encoder.decode(encoded)).toEqual(longString);
});
*/
