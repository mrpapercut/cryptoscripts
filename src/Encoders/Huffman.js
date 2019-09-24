import Base from '../Base';
import BinaryHeap from '../Util/BinaryHeap';

/**
 * Code from https://rosettacode.org/wiki/Huffman_coding#JavaScript
 */

class Huffman extends Base {
    constructor() {
        super();
    }

    encode(str = '') {
        this.str = str;

        const count_chars = {};
        for (let i = 0; i < str.length; i++) {
            if (str[i] in count_chars) {
                count_chars[str[i]] ++;
            } else {
                count_chars[str[i]] = 1;
            }
        }

        const pq = new BinaryHeap(x => x[0]);
        for (let ch in count_chars) {
            pq.push([count_chars[ch], ch]);
        }

        while (pq.size() > 1) {
            let [pair1, pair2] = [pq.pop(), pq.pop()];

            pq.push([
                pair1[0] + pair2[0],
                [pair1[1], pair2[1]]
            ]);
        }

        let tree = pq.pop();
        this.encoding = {};
        this._generate_encoding(tree[1], '');

        this.encoded_string = '';

        for (let i = 0; i < this.str.length; i++) {
            this.encoded_string += this.encoding[str[i]];
        }

        return this.encoded_string;
    }

    _generate_encoding(ary, prefix) {
        if (ary instanceof Array) {
            this._generate_encoding(ary[0], prefix + "0");
            this._generate_encoding(ary[1], prefix + "1");
        } else {
            this.encoding[ary] = prefix;
        }
    }

    inspect_encoding() {
        let response = '';
        for (var ch in this.encoding) {
            response += "'" + ch + "': " + this.encoding[ch];
        }

        return response;
    }

    decode(encoded, encodingTable) {
        encodingTable = encodingTable || this.encoding;

        var rev_enc = {};
        for (var ch in encodingTable) {
            rev_enc[encodingTable[ch]] = ch;
        }

        var decoded = "";
        var pos = 0;

        while (pos < encoded.length) {
            var key = ""

            while (!(key in rev_enc)) {
                key += encoded[pos];
                pos++;
            }

            decoded += rev_enc[key];
        }

        return decoded;
    }
}

export default Huffman;