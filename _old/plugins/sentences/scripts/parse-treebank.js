const fs = require('fs')
// parse training data from UD into json
let path = `./en_ewt-ud-train.conllu`
const conllu = require('conllu-stream')

let result = []
fs.createReadStream(path)
  .pipe(conllu())
  .on('data', function (sentence) {
    let terms = Object.keys(sentence.tokens).map((k) => {
      return sentence.tokens[k]
    })
    terms = terms.filter((t) => t.type === 'word' && t.upostag !== 'PUNCT')
    terms = terms.map((t) => t.xpostag)
    result.push([sentence.toString(), terms])
    // result.push({
    //   txt: sentence.toString(),
    //   terms: terms,
    // })
  })
  .on('end', function () {
    console.log(result.length)
    // console.log(JSON.stringify(result, null, 2))
  })
