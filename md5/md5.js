const pad = (s, len) => {
    return (new Array(64).fill(0).join('') + s).substr(0 - len);
}

const toBitstring = str => {
    return str.split('').map(c => pad(c.charCodeAt(0).toString(2), 8)).join('');
}

const leftRotate = (x, c) => {
    return ((x << c) | (x >> (32 - c))) | 0;
}

const reverseByteOrder = bitstr => {
    if (typeof bitstr === 'number') {
        bitstr = bitstr.toString(2);

        for (let i = 0; i < bitstr.length % 8; i++) {
            bitstr = '0' + bitstr;
        }
    }

    return bitstr.match(/(.{8})/g).reverse().join('');
}

const md5 = message => {
    // First convert message to bit-string
    let bitstr = toBitstring(message);

    const {
        abs,
        floor,
        pow,
        sin
    } = Math;

    const K = new Array(64);

    let i;

    const s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    for (i = 0; i < 64; i++) {
        K[i] = floor(pow(2, 32) * abs(sin(i + 1))) | 0;
    }

    let a0 = 0x67452301; // A
    let b0 = 0xefcdab89; // B
    let c0 = 0x98badcfe; // C
    let d0 = 0x10325476; // D

    // Append "1" bit to bitstring
    bitstr += '1';

    // Append "0" bit to bitstring until bitstring.length % 512 === 448
    while (bitstr.length % 512 !== 448) {
        bitstr += '0';
    }

    // Append message-length in bits % 2^64 to bitstring
    let message_length = pad(((message.length * 8) % pow(2, 64)).toString(2), 64);
    // Reverse byte order of message_length
    message_length = reverseByteOrder(message_length);

    bitstr += message_length;

    // Split bitstring into chunks of 512 bits
    const chunks = bitstr.match(/(.{512})/g);

    chunks.forEach(chunk => {
        // Split chunk into 16 words of 32 bits
        const M = chunk.match(/(.{32})/g).map(c => parseInt(reverseByteOrder(c), 2));

        // Initialize values
        let A = a0;
        let B = b0;
        let C = c0;
        let D = d0;

        for (i = 0; i < 64; i++) {
            let F;
            let g;

            if (i < 16) {
                F = ((B & C) | (~B & D)) | 0;
                g = i;
            } else if (i < 32) {
                F = ((D & B) | (~D & C)) | 0;
                g = ((5 * i) + 1) % 16;
            } else if (i < 48) {
                F = ((B ^ C) ^ D) | 0;
                g = ((3 * i) + 5) % 16;
            } else {
                F = (C ^ (B | ~D)) | 0;
                g = (7 * i) % 16;
            }

            F = (F + A + K[i] + M[g]) | 0;
            A = D | 0;
            D = C | 0;
            C = B | 0;
            B = B + leftRotate(F, s[i]);
        }


        a0 += parseInt(reverseByteOrder(A.toString(2)), 2) | 0;
        b0 += parseInt(reverseByteOrder(B.toString(2)), 2) | 0;
        c0 += parseInt(reverseByteOrder(C.toString(2)), 2) | 0;
        d0 += parseInt(reverseByteOrder(D.toString(2)), 2) | 0;
    });

    let digest = [a0, b0, c0, d0].map(c => c.toString(16)).join('');

    return digest;
}

// console.log(md5('The quick brown fox jumps over the lazy dog'));
// console.log('9e107d9d372bb6826bd81d3542a419d6');

// console.log(md5('The quick brown fox jumps over the lazy dog.'));
// console.log('e4d909c290d0fb1ca068ffaddf22cbd0');

console.log(md5('Hello world!'));
console.log('86fb269d190d2c85f6e0468ceca42a20');

// console.log(md5(''));
// console.log('d41d8cd98f00b204e9800998ecf8427e');