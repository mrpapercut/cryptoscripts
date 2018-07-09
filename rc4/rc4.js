const rc4 = (data, key) => {
  let x = 0;
  let y = 0;
  
  let box = Array(256).fill(0).map((_, i) => i);
  
  let t = null;
  
  for (let i = 0; i < 256; i++) {
    x = (x + box[i] + key.charCodeAt(i % key.length)) % 256;
    t = box[i];
    box[i] = box[x];
    box[x] = t;
  }
  
  x = 0;
  y = 0;
  
  out = [];
  
  for (let char in data) {
    x = (x + 1) % 256;
    y = (y + box[x]) % 256;
    
    t = box[x];
    box[x] = box[y];
    box[y] = t;
    
    out.push(('00' + (data.charCodeAt(char) ^ box[(box[x] + box[y]) % 256]).toString(16)).substr(-2));
  }
  
  return out.join('');
}

const key = '9yC57X809uklPobZQ7b9o5Kemr2SEk7l0vbsDcKtr5U207XZ8WWWAwkd8rx0Gzah';
const data = 'Hello world!';

const res = 'c0db5126707c1f797a830ad3';

console.log(rc4(data, key));
console.log(res);