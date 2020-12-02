const fs = require('fs');
module.exports = writeFile;

function writeFile(filename) {
  return buffer =>
    new Promise(resolve =>
      fs.writeFile(filename, buffer, err => {
        if (null === err) {
          resolve(filename);
        } else {
          console.log('writeFile error', err);
          resolve(null);
        }
      })
    );
}
