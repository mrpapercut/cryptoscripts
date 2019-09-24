import Base64 from '../../src/Encoders/Base64';

const shortString = 'Hello, world!';
const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';

let encoder = new Base64();

test('Should encode short string to Base64 encoding', () => {
    let proof = Buffer.from(shortString).toString('base64');

    expect(encoder.encode(shortString)).toEqual(proof);
});

test('Should encode long string to Base64 encoding', () => {
    let proof = Buffer.from(longString).toString('base64');

    expect(encoder.encode(longString)).toEqual(proof);
});
