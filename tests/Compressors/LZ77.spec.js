import LZ77 from '../../src/Compressors/LZ77';

const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.`;

for (let i = 20; i < 400; i += 20) {
    const lz77 = new LZ77(i);

    test(`Should compress using LZ77 algorithm with windowSize ${i}`, () => {
        const compressed = lz77.compress(data);

        expect(lz77.decompress(compressed)).toEqual(data);
    });
}
