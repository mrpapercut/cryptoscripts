import Base64 from '../../src/Encoders/Base64';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const shortStringProof = Buffer.from(shortString).toString('base64');
const longStringProof = Buffer.from(longString).toString('base64');

let encoder = new Base64();

test('Should encode short string to Base64 encoding', () => {
    expect(encoder.encode(shortString)).toEqual(shortStringProof);
});

test('Should encode long string to Base64 encoding', () => {
    expect(encoder.encode(longString)).toEqual(longStringProof);
});

test('Should decode short base64-string from Base64 encoding', () => {
    expect(encoder.decode(shortStringProof)).toEqual(shortString);
});

test('Should decode long base64-string from Base64 encoding', () => {
    expect(encoder.decode(longStringProof)).toEqual(longString);
});
