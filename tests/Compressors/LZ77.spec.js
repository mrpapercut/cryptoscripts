import LZ77 from '../../src/Compressors/LZ77';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString,
    loadSourcefile
} from '../TestBase';

for (let i = 200; i <= 400; i += 50) {
    const lz77 = new LZ77(i);

    test(`Should compress & decompress short string using LZ77 compression with windowSize ${i}`, () => {
        const encodedCompressed = lz77.safeEncode(shortString);

        expect(lz77.safeDecode(encodedCompressed)).toEqual(shortString);
    });

    test(`Should compress & decompress long string using LZ77 compression with windowSize ${i}`, () => {
        const encodedCompressed = lz77.safeEncode(longString);

        expect(lz77.safeDecode(encodedCompressed)).toEqual(longString);
    });

    test(`Should compress & decompress its own sourcecode using LZ77 compression with windowSize ${i}`, done => {
        loadSourcefile('../src/Compressors/LZ77.js').then((res, rej) => {
            const sourcecode = res.toString();
            const encodedCompressed = lz77.safeEncode(sourcecode);

            expect(lz77.safeDecode(encodedCompressed)).toEqual(sourcecode);

            done();
        });
    });
}
