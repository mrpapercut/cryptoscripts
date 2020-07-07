import Valhalla from '../../src/Encoders/Valhalla';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const encoder = new Valhalla();

test('Should encode and decode short string using Valhalla encoding', () => {
    const encodedString = encoder.encode(shortString);

    expect(encoder.decode(encodedString)).toEqual(shortString);
});

test('Should encode and decode long string using Valhalla encoding', () => {
    const encodedString = encoder.encode(longString);

    expect(encoder.decode(encodedString)).toEqual(longString);
});
