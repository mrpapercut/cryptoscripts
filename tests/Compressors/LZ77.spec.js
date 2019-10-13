import LZ77 from '../../src/Compressors/LZ77';
import {
    LONGSTRING as longString
} from '../TestBase';

for (let i = 200; i <= 400; i += 50) {
    const lz77 = new LZ77(i);

    test(`Should compress & decompress using LZ77 algorithm with windowSize ${i}`, () => {
        const compressed = lz77.compress(longString);

        expect(lz77.decompress(compressed)).toEqual(longString);
    });
}
