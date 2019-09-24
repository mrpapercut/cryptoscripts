import UUEncoding from '../../src/Encoders/UUEncoding';

const encoder = new UUEncoding();

const shortString = 'Hello, world!';
const shortStringProof = [
    ".2&5L;&\\L('=O<FQD(0``",
    "`",
    ""
].join('\n');

test('Should encode short string using UUEncoding', () => {
    expect(encoder.encode(shortString)).toEqual(shortStringProof);
});

const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';
const longStringProof = [
    "M3&]R96T@:7!S=6T@9&]L;W(@<VET(&%M970L(&-O;G-E8W1E='5R(&%D:7!I",
    "M<V-I;F<@96QI=\"X@06QI<75A;2!V96P@<W5S8VEP:70@=7)N82P@86,@875C",
    "M=&]R('!U<G5S+B!5=\"!A(&YI<VP@86QI<75A;2P@<'5L=FEN87(@=&]R=&]R",
    "M('%U:7,L('9E:&EC=6QA(&5L:70N(%9E<W1I8G5L=6T@86YT92!I<'-U;2!P",
    "M<FEM:7,@:6X@9F%U8VEB=7,@;W)C:2!L=6-T=7,@970@=6QT<FEC97,@<&]S",
    "M=65R92!C=6)I;&EA($-U<F%E.R!/<F-I('9A<FEU<R!N871O<75E('!E;F%T",
    "M:6)U<R!E=\"!M86=N:7,@9&ES('!A<G1U<FEE;G0@;6]N=&5S+\"!N87-C971U",
    "M<B!R:61I8W5L=7,@;75S+B!0:&%S96QL=7,@<V]L;&EC:71U9&EN('1E;7!O",
    "M<B!V97-T:6)U;'5M+B!096QL96YT97-Q=64@<G5T<G5M(&%C8W5M<V%N(&5U",
    "M:7-M;V0N(%-U<W!E;F1I<W-E(&5R;W,@;G5N8RP@=F5N96YA=&ES(&5U(&UI",
    "?('5T+\"!C;VYV86QL:7,@;6%L97-U861A(&UE='5S+@``",
    "`",
    ""
].join('\n');

test('Should encode long string using UUEncoding', () => {
    expect(encoder.encode(longString)).toEqual(longStringProof);
});
