import Base from '../Base';

/**
 * Code adapted from https://create.stephan-brumme.com/xxhash/#sourcecode
 * Original https://github.com/Cyan4973/xxHash
 */

class XxHash extends Base {
    constructor(seed = 0) {
        super();

        this.seed = parseInt(seed, 10);
        this.prime1 = 0x9e3779b1;
        this.prime2 = 0x85ebca77;
        this.prime3 = 0xc2b2ae3d;
        this.prime4 = 0x27d4eb2f;
        this.prime5 = 0x165667b1;

        this.maxBufferSize = 15;

        this.state = [
            seed + this.prime1 + this.prime2,
            seed + this.prime2,
            seed,
            seed - this.prime1,
            0 // ?
        ];

        this.buffer = new Uint32Array(16);
        this.bufferSize = 0;
        this.totalLength = 0;
    }

    rotateLeft(x, bits) {
        return (x << bits) | (x >> (32 - bits));
    }

    process(data, state0, state1, state2, state3) {
        const block = data;

        state0 = this.rotateLeft(state0 + block[0] * this.prime2, 13) * this.prime1;
        state1 = this.rotateLeft(state1 + block[1] * this.prime2, 13) * this.prime1;
        state2 = this.rotateLeft(state2 + block[2] * this.prime2, 13) * this.prime1;
        state3 = this.rotateLeft(state3 + block[3] * this.prime2, 13) * this.prime1;

        return [state0, state1, state2, state3];
    }

    add(input, length) {
        if (!input || length === 0) {
            return false;
        }

        this.totalLength += length;

        const data = input;
        let dataIndex = 0;

        if (this.bufferSize + length < this.maxBufferSize) {
            while (length-- > 0) {
                this.buffer[this.bufferSize++] = data.charCodeAt(dataIndex++);
            }

            return true;
        }

        const stop = dataIndex + length; // ?!
        const stopBlock = stop - this.maxBufferSize; // ?!

        if (this.bufferSize > 0) {
            while (this.bufferSize < this.maxBufferSize) {
                this.buffer[this.bufferSize++] = data.charCodeAt(dataIndex++);
            }

            this.state = this.process(this.buffer, this.state[0], this.state[1], this.state[2], this.state[3]);
        }

        while (dataIndex <= stopBlock) {
            this.state = this.process(this.buffer, this.state[0], this.state[1], this.state[2], this.state[3]);
            dataIndex += 32;
        }
    }
}

export default XxHash;
