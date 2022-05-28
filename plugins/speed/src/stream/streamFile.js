import * as fs from 'fs';

const streamFile = function (path, fn, opts = {}) {
  const nlp = this
  let model = nlp.model()
  const splitSentences = nlp.methods().one.tokenize.splitSentences
  const s = fs.createReadStream(path, opts);

  let txt = ''
  let res = []

  const doIt = (str) => {
    let doc = nlp(str)
    let m = fn(doc)
    if (m && m.found) {
      m.docs.forEach(l => res.push(l))
    }
  }

  const quickSplit = function (str) {
    let end = txt.substring(str.length - 300)
    let arr = splitSentences(end, model)
    let last = arr[arr.length - 1]
    let main = str.substr(0, str.length - last.length)
    return [main, last]
  }


  return new Promise((resolve, reject) => {
    s.on('data', function (chunk) {
      txt += chunk;
      let [main, end] = quickSplit(txt, model)
      doIt(main)
      txt = end
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