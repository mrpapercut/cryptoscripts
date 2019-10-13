import PrimeFactorizationEncoding from '../../src/Encoders/PrimeFactorizationEncoding';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const encoder = new PrimeFactorizationEncoding();

test('Should encode and decode short string using PrimeFactorizationEncoding', () => {
    const encoded = encoder.encode(shortString);

    expect(encoder.decode(encoded)).toEqual(shortString);
});

test('Should encode and decode long string using PrimeFactorizationEncoding', () => {
    const encoded = encoder.encode(longString);

    expect(encoder.decode(encoded)).toEqual(longString);
});
