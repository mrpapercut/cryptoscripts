/**
 * Very simple offset-based encoder,
 * found in Valhalla RAT powershell malware
 */
import Base from '../Base';

class Valhalla extends Base {
    constructor() {
        super();
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456879';
    }

    encode(input) {
        /*
        function encodeString($offset, $string) {
            $encoded = $offset;

            $offset = [int] $offset[0];

            for ($i = 0; $i -lt $string.length; $i++) {
                $char1 = [math]::floor([int] $string[$i] / 16);
                $char2 = [int] $string[$i] % 16;

                $encoded += [char] [int] ($char1 + $offset);
                $encoded += [char] [int] ($char2 + $offset);
            }

            return $encoded;
        }
        */
        const offset = this.chars.charCodeAt(Math.floor(Math.random() * this.chars.length));
        let encoded = [String.fromCharCode(offset)];

        for (let i = 0; i < input.length; i++) {
            encoded = encoded.concat([Math.floor(input.charCodeAt(i) / 16), input.charCodeAt(i) % 16].map(c => String.fromCharCode(c + offset)));
        }

        return encoded.join('');
    }

    decode(input) {
        /*
        function decodeString {
            param($encstring);

            $offset = [int] $encstring[0];

            $decoded = '';

            for($i = 1; $i -lt $encstring.length; $i += 2) {
                $decoded += [char] ((16) * ([int]$encstring[$i] - $offset) + ([int]$encstring[$i + 1] - $offset));
            }

            return $decoded;
        }
        */
        const offset = input.charCodeAt(0);

        const decoded = [];

        for (let i = 1; i < input.length; i += 2) {
            decoded.push(String.fromCharCode((16 * (input.charCodeAt(i) - offset) + (input.charCodeAt(i + 1) - offset)) % 0xff));
        }

        return decoded.join('');
    }
}

export default Valhalla;
