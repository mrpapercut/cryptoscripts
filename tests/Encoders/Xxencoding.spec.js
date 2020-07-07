import Xxencoding from '../../src/Encoders/Xxencoding';
import {
    SHORTSTRING as shortString,
    LONGSTRING as longString
} from '../TestBase';

const encoder = new Xxencoding();

const shortStringProof = 'BG4JgP4wg65RjQalY6E++\n';

const longStringProof = `hH4xmNKoUOL-nRKoUN4xgPr6UQqZo643hNLEg64BjPbBZMrFZR5Jm643YOL-d
hQqBdPaQUNKldR0sUEKldQLJVPG-qNKkUQrJnMqZkOLEURL7iMGkUMKAUMLJX
hR4xm65-pQbJn9W-JR0-V64tdQqkUMKldQLJVPGkUQ5JgRaZiML6UR4xmR4xm
h653pOLAg65NZO4ZXRKlV64JgOLEi63NZQrFdMbJgRKoUMKtoNG-dQ5BpPG-k
hQaZhOLAUOKsUNa3pMqZWRLAUPr7XOG-gRKBoRLAUNLEURKloQaZXNLAUQ4xn
hRKJmNG-XRK7dP4ZV62BpQa3ZCm-DQaBd65NVQaZpQm-iMLFjQLJZ65-ZPa3o
hOK7pQm-ZR0-hMKRiOLAUN4Zn65-VQbFpQaZZPbEUPKxiR4Jn90-iMLBXNLFp
hQW-mOKFdMrJgRLAUPLJn9W-EO43nNKlgRLAUQqxgP4ZXOLFpN4Zi65FZPL-j
hQW-qNLBoOK7pP5Jh9W-ENKlgNKtoNLBlRKIUQbJoQbJh643XMrJhQq3i64Jp
hOLBhPqEi63BpQr-ZPaFdQrBZ64JmPrAUPbJiMmkURaJiNKtVR4Zn64Jp64pd
T65Jo90-XPqtqMKlgOLAUPK3gNLBpMKFV64pZR5Jn9U++
`;

test('Should encode short string using xxencoding', () => {
    expect(encoder.encode(shortString)).toEqual(shortStringProof);
});

test('Should decode xxencoded short string', () => {
    const encodedString = encoder.encode(shortString);

    expect(encoder.decode(encodedString)).toEqual(shortString);
});

test('Should encode long string using xxencoding', () => {
    expect(encoder.encode(longString)).toEqual(longStringProof);
});

test('Should decode xxencoded long string', () => {
    const encodedString = encoder.encode(longString);

    expect(encoder.decode(encodedString)).toEqual(longString);
});