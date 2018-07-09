import binascii

def rc4crypt(data, key):
    x = 0
    box = range(256)
    for i in range(256):
        x = (x + box[i] + ord(key[i % len(key)])) % 256
        box[i], box[x] = box[x], box[i]

    x = 0
    y = 0
    out = []
    for char in data:
        x = (x + 1) % 256
        y = (y + box[x]) % 256
        
        box[x], box[y] = box[y], box[x]
        print(ord(char))
        out.append(chr(ord(char) ^ box[(box[x] + box[y]) % 256]))
    
    return ''.join(out)

key = '9yC57X809uklPobZQ7b9o5Kemr2SEk7l0vbsDcKtr5U207XZ8WWWAwkd8rx0Gzah'
data = 'Hello world!'

print(binascii.hexlify(rc4crypt(data, key)))
