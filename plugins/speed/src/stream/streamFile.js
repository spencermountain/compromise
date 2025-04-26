import * as fs from 'fs';

const streamFile = function (path, fn, opts = {}) {
  const nlp = this
  const world = nlp.world()
  const splitSentences = nlp.methods().one.tokenize.splitSentences
  const s = fs.createReadStream(path, opts);

  let txt = ''
  const res = []

  const doIt = (str) => {
    const doc = nlp(str)
    const m = fn(doc)
    if (m && m.found) {
      m.docs.forEach(l => res.push(l))
    }
  }

  const quickSplit = function (str) {
    const end = txt.substring(str.length - 300)
    const arr = splitSentences(end, world)
    const last = arr[arr.length - 1]
    const main = str.substr(0, str.length - last.length)
    return [main, last]
  }


  return new Promise((resolve, reject) => {
    s.on('data', function (chunk) {
      txt += chunk;
      const [main, end] = quickSplit(txt, world)
      doIt(main)
      txt = end
    });
    s.on('end', function () {
      doIt(txt)// do dangling one
      // construct document of only results
      const doc = nlp('')
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