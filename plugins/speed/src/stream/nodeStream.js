import * as fs from 'fs';
import nlp from 'compromise'

const defaults = { highWaterMark: 64 }

const nodeStream = function (path, opts) {
  opts = Object.assign({}, defaults, opts)
  const s = fs.createReadStream(path, opts);
  let data = ''
  s.on('data', function (chunk) {
    data += chunk;
    console.log(data.length)
  });
  s.on('end', function () {
    console.log(data);
  });
  s.on('error', function (err) {
    console.log(err.stack); // eslint-disable-line
  });
}

export default nodeStream