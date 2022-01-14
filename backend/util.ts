import fs from 'fs';

export function deleteFiles(files: string[], callback: (err?: NodeJS.ErrnoException) => void) {
    var i = files.length;

    files.forEach((file) => {
        fs.unlink(file, (err) => {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i <= 0) {
                callback();
            }
        });
    });
}
