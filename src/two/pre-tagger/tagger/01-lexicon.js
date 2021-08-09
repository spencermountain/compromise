import setTag from './_setTag.js'
const underOver = /^(under|over)-?.{3}/

// scan-ahead to match multiple-word terms - 'jack rabbit'
const checkMulti = function (terms, i, lexicon) {
  let max = i + 4 > terms.length ? terms.length - i : 4
  let str = terms[i].normal
  for (let skip = 1; skip < max; skip += 1) {
    str += ' ' + terms[i + skip].normal
    if (lexicon.hasOwnProperty(str) === true) {
      let tag = lexicon[str]
      terms.slice(i, i + skip + 1).forEach(term => setTag(term, tag, 'multi-lexicon'))
      return skip
    }
  }
  return 0
}

// tag any words in our lexicon
const checkLexicon = function (terms, model) {
  const multi = model._multiCache
  const lexicon = model.two.lexicon
  // basic lexicon lookup
  for (let i = 0; i < terms.length; i += 1) {
    let t = terms[i]
    let word = t.machine || t.normal
    // multi-word lookup
    if (terms[i + 1] !== undefined && multi.has(word) === true) {
      let skip = checkMulti(terms, i, lexicon)
      i += skip
      if (skip > 0) {
        continue
      }
    }
    // look at implied words in contractions
    // if (t.implicit !== undefined) {
    //   if (lexicon[t.implicit] !== undefined && lexicon.hasOwnProperty(t.implicit)) {
    //     let tag = lexicon[t.implicit]
    //     setTag(t, tag, 'implicit-lexicon')
    //     continue
    //   }
    // }
    // normal lexicon lookup
    if (lexicon[word] !== undefined && lexicon.hasOwnProperty(word)) {
      let tag = lexicon[word]
      setTag(t, tag, 'lexicon')
      continue
    }
    // lookup aliases in the lexicon
    if (t.alias) {
      let found = t.alias.find(str => lexicon.hasOwnProperty(str))
      if (found) {
        let tag = lexicon[found]
        setTag(t, tag, 'lexicon')
        continue
      }
    }
    // try removing a word-stem
    if (underOver.test(word) === true) {
      let stem = word.replace(/^(under|over)-?/, '')
      if (lexicon.hasOwnProperty(stem)) {
        let tag = lexicon[stem]
        setTag(t, tag, 'lexicon')
        continue
      }
    }
  }
}
export default checkLexicon
