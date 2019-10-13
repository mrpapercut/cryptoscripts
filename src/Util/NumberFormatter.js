class NumberFormatter {
    constructor() {

    }

    toDec(numstr) {
        return parseInt(numstr, 10).toString(10);
    }

    toHex(numstr) {
        return `0x${parseInt(numstr, 10).toString(16)}`
    }

    toOct(numstr) {
        return `0o${parseInt(numstr, 10).toString(8)}`;
    }

    toBin(numstr) {
        return `0b${parseInt(numstr, 10).toString(2)}`;
    }

    toExp(numstr) {
        return parseInt(numstr, 10).toExponential();
    }

    substrAdd(numstr) {
        let n = parseInt(numstr, 10);
        return 0 > (0.5 - Math.random())
            ? `(${this.randConvert(n - Math.floor(Math.sqrt(n)))}+${this.randConvert(Math.floor(Math.sqrt(n)))})`
            : `(${this.randConvert(n + Math.floor(Math.sqrt(n)))}-${this.randConvert(Math.floor(Math.sqrt(n)))})`;
    }

    randConvert(numstr) {
        if ((numstr === 0 || numstr === 1) && Math.random() < 0.2) {
            return numstr === 0 ? '0**1' : '0**0';
        } else {
            const converters = ['toExp', 'toOct', 'toHex', 'substrAdd'];
            if (parseInt(numstr, 10) <= 0xff) converters.push('toBin');
            return this[converters[Math.floor(Math.random() * converters.length)]](numstr);
        }
    }

    factor(n) {
        let i = 2;
        let limit = Math.sqrt(n);

        let res = [];

        while (i <= limit) {
            if (n % i === 0) {
                res.push(i);
                n = n / i;
                limit = Math.sqrt(n);
            } else {
                i += 1;
            }
        }

        if (n > 1) {
            res.push(n);
        }

        return res;
    }

    format(n) {
        if (n === 0) return '0**1';
        else if (n === 1) return '0**0';

        const d = {};
        const fac = this.factor(n);

        for (let f in fac) {
            d[fac[f]] = typeof d[fac[f]] === 'undefined' ? 1 : d[fac[f]] + 1;
        }

        const sorted = Object.keys(d).sort(() => 0.5 - Math.random());
        const res = [];

        for (let e in sorted) {
            if (d[sorted[e]] > 1) {
                res.push(`${this.randConvert(sorted[e])}**${this.randConvert(d[sorted[e]])}`);
            } else {
                res.push(this.randConvert(sorted[e]));
            }
        }

        return res.join('*');
    }
}

export default NumberFormatter;

/*
let formatter = new NumberFormatter();
let longest = 0;
let longestmatch = '';
for (let i = 0; i < 0x1ffffff; i++) {
    let r = formatter.format(i);

    if (r.length > longest) {
        longest = r.length;
        longestmatch = r;
        console.log(`${i} = ${r} (length: ${longest})`);
    }

    if (eval(r) !== i) {
        console.log(`WRONG for ${i} !== ${r}`);
    }
}
for (let i = 0; i < 100; i++) {
    let rand = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    console.log(`0x${rand.toString(16).padStart(16, 0)} = ${formatter.format(rand)}`);
}
* /

let str = 'Hello, world! Lorem ipsum bla bla bl';
// Encode
let nums = str.match(/.{1,4}/g).map(s => `0x${s.split('').map(c => c.charCodeAt(0).toString(16).padStart(2,0)).join('').padEnd(8,0)}`);
let formatted = nums.map(n => formatter.format(eval(n)));
let encoded = formatted.join(',');

// Decode
let decoded = encoded.split(',').map(f =>
    eval(f)
    .toString(16)
    .match(/.{2}/g)
    .map(c =>
        String.fromCharCode(eval(`0x${c}`))
    )
    .join('')
).join('');

console.log(encoded, decoded);
*/