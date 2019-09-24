import Huffman from '../../src/Encoders/Huffman';

const shortString = 'Hello, world!';
const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';

const encoder = new Huffman();

test('Should encode & decode short string using Huffman encoding', () => {
    const encoded = encoder.encode(shortString);

    expect(encoder.decode(encoded)).toEqual(shortString);
});

test('Should encode & decode long string using Huffman encoding', () => {
    const encoded = encoder.encode(longString);

    expect(encoder.decode(encoded)).toEqual(longString);
});
