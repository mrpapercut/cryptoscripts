import fs from 'fs';
import path from 'path';

export const SHORTSTRING = 'Hello, world!';

export const LONGSTRING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.';

export const loadSourcefile = relpath => {
    return new Promise((resolve, reject) => {

        fs.readFile(path.resolve(__dirname, relpath), (err, contents) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(`File ${relpath} does not exist`);
                }

                throw err;
            }

            resolve(contents);
        })
    });
}
