import Base from '../Base';

class RC4 extends Base {
    constructor() {
        super();
    }

    createBox(key) {
        let x = 0;
        let t;
        const box = Array(256).fill(0).map((_, i) => i);

        for (let i = 0; i < 256; i++) {
            x = (x + box[i] + key.charCodeAt(i % key.length)) % 256;
            t = box[i];
            box[i] = box[x];
            box[x] = t;
        }

        return box;
    }

    cipher(data, key) {
        let x = 0;
        let y = 0;
        let t;
        const res = [];
        const box = this.createBox(key);

        for (const c in data) {
            x = (x + 1) % 256;
            y = (y + box[x]) % 256;

            t = box[x];
            box[x] = box[y];
            box[y] = t;

            res.push(String.fromCharCode(data.charCodeAt(c) ^ box[(box[x] + box[y]) % 0xff]));
        }

        return res.join('');
    }
}

export default RC4;
