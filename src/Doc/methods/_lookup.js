// const tokenize = require('../../01-tokenizer/02-words')
const tokenize = function (str) {
  return str.split(/[ -]/g)
}
// take a list of strings
// look them up in the document
const buildTree = function (termList, values = []) {
  let root = {}
  // parse our input
  termList.forEach((str, i) => {
    let val = true
    if (values[i] !== undefined) {
      val = values[i]
    }
    // some rough normalization
    str = (str || '').toLowerCase()
    str = str.replace(/[,;.!?]+$/, '')
    let arr = tokenize(str).map(s => s.trim())
    root[arr[0]] = root[arr[0]] || {}
    if (arr.length === 1) {
      root[arr[0]].value = val
    } else {
      root[arr[0]].more = root[arr[0]].more || []
      root[arr[0]].more.push({
        rest: arr.slice(1),
        value: val,
      })
    }
  })
  // sort by longest-first?
  // console.log(JSON.stringify(root, null, 2))
  return root
}

const fastLookup = function (termList, values, doc) {
  let root = buildTree(termList, values)
  let found = []
  // each phrase
  for (let i = 0; i < doc.list.length; i++) {
    const p = doc.list[i]
    let terms = p.terms()

    let words = terms.map(t => t.reduced)
    // each word
    for (let w = 0; w < words.length; w++) {
      if (root[words[w]] !== undefined) {
        // is it a multi-word match?
        if (root[words[w]].more !== undefined) {
          root[words[w]].more.forEach(more => {
            // is it too-long?
            if (words[w + more.rest.length] === undefined) {
              return
            }
            // compare each subsequent term
            let everyTerm = more.rest.every((word, r) => {
              return word === words[w + r + 1]
            })
            if (everyTerm === true) {
              found.push({ id: p.terms()[w].id, value: more.value, length: more.rest.length + 1 })
            }
          })
        }
        // is it a single-word match?
        if (root[words[w]].value !== undefined) {
          found.push({ id: p.terms()[w].id, value: root[words[w]].value, length: 1 })
        }
      }
    }
  }
  return found
}
module.exports = fastLookup
