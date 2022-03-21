import * as fs from 'fs';
// import nlp from 'compromise'
import nlp from '../../../../src/three.js'

const defaults = { highWaterMark: 64 }

const streamFile = function (path, fn, opts) {
  opts = Object.assign({}, defaults, opts)
  return new Promise((resolve, reject) => {
    let model = nlp.model()
    const splitSentences = nlp.methods().one.tokenize.splitSentences
    const s = fs.createReadStream(path, opts);

    let txt = ''
    let res = []

    const doIt = (str) => {
      let m = fn(nlp(str))
      if (m && m.found) {
        res.push(m.document[0])
      }
    }

    s.on('data', function (chunk) {
      txt += chunk;
      let arr = splitSentences(txt, model)
      txt = arr.pop() //keep last one
      arr.forEach(doIt)
    });
    s.on('end', function () {
      doIt(txt)// do dangling one
      // construct document of only results
      let doc = nlp('')
      doc.document = res
      resolve(doc)
    });
    s.on('error', function (err) {
      console.error(err.stack); // eslint-disable-line
      reject(err)
    });
  })


}

export default {
  lib: {
    streamFile
  }
}