const fs = require('fs')
// parse training data from UD into json
let path = `./en_ewt-ud-train.conllu`
const conllu = require('conllu-stream')

const haveBefore = {
  cop: true,
  aux: true,
  advmod: true,
}

/** add spaces at the end */
const padEnd = function (str, width) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

let result = []
fs.createReadStream(path)
  .pipe(conllu())
  .on('data', function (sentence) {
    let terms = Object.keys(sentence.tokens).map((k) => {
      return sentence.tokens[k]
    })
    terms = terms.filter((t) => t.type === 'word' && t.upostag !== 'PUNCT')
    let subj = null
    let root = null
    let obj = null
    terms.forEach((t, i) => {
      // let rel = t.deprel === 'root' ? '*' : ' '
      // let rel = t.deprel
      // console.log(padEnd(rel, 13) + ' -- ' + t.form)

      if (t.deprel === 'root') {
        root = t.form
        // look backward
        let o = i - 1
        if (terms[o]) {
          if (haveBefore[terms[o].deprel]) {
            root = terms[o].form + ' ' + root
            // look back twice
            o = i - 2
            if (terms[o]) {
              if (haveBefore[terms[o].deprel]) {
                root = terms[o].form + ' ' + root
              }
            }
            // look back three times
            o = i - 3
            if (terms[o]) {
              if (haveBefore[terms[o].deprel]) {
                root = terms[o].form + ' ' + root
              }
            }
          }
        }
        // look forward once
        o = i + 1
        if (terms[o]) {
          if (haveBefore[terms[o].deprel]) {
            root = root + ' ' + terms[o].form
          }
        }
      }
      if (t.deprel === 'nsubj' || t.deprel === 'nsubj:pass') {
        subj = t.form
      }
      if (t.deprel === 'obj') {
        obj = t.form
      }
    })
    // console.log('---')
    // if (!subj) {
    // terms.forEach(t => {
    //   // let rel = t.deprel === 'root' ? '*' : ' '
    //   let rel = t.deprel
    //   console.log(padEnd(rel, 13) + ' -- ' + padEnd(t.head, 13) + ' -- ' + t.form)
    // })
    // console.log('---')
    // }
    // terms = terms.map(t => t.xpostag)
    // result.push([sentence.toString(), terms])
    result.push({
      txt: sentence.toString(),
      subj: subj,
      verb: root,
      obj: obj,
      // terms: terms,
    })
  })
  .on('end', function () {
    // console.log(result.length)
    // console.log(JSON.stringify(result[30], null, 2))
    // let obj = result[135]
    // // console.log(obj)
    // console.log(result[20])
    result = result.filter((o) => o.verb && o.obj && o.verb)

    console.log(JSON.stringify(result, null, 2))
  })
