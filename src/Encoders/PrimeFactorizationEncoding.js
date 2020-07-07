import Base from '../Base';
import NumberFormatter from '../Util/NumberFormatter';

class PrimeFactorizationEncoding extends Base {
    constructor() {
        super();
    }

    encode(input) {
        const numberFormatter = new NumberFormatter();

        return input
            .match(/.{1,4}/g) // Split in groups of 1-4 characters
            .map(s => {
                // Get byte of each separate character and concat as 1 8-byte number:
                const mappedChars = s.split('')
                    .map(c => c.charCodeAt(0).toString(16).padStart(2, 0))
                    .join('')
                    .padEnd(8, 0);

                return `0x${mappedChars}`;
            })
            .map(num => numberFormatter.format(eval(num)));
    }

    decode(input) {
        return input.map(f =>
            eval(f)
                .toString(16)
                .match(/.{2}/g)
                .map(c => String.fromCharCode(eval(`0x${c}`)))
                .join('')
        ).join('').replace(/\0*$/, '');
    }
}

export default PrimeFactorizationEncoding;
