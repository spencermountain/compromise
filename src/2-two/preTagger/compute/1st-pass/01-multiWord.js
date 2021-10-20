import fastTag from '../_fastTag.js'

// scan-ahead to match multiple-word terms - 'jack rabbit'
const checkMulti = function (terms, i, lexicon) {
  let max = i + 4 > terms.length ? terms.length - i : 4
  let str = terms[i].machine || terms[i].normal
  for (let skip = 1; skip < max; skip += 1) {
    let t = terms[i + skip]
    let word = t.machine || t.normal
    str += ' ' + word
    if (lexicon.hasOwnProperty(str) === true) {
      let tag = lexicon[str]
      terms.slice(i, i + skip + 1).forEach(term => fastTag(term, tag, '1-multi-lexicon'))
      return true
    }
  }
  return false
}

const multiWord = function (terms, i, model) {
  const multi = model.two._multiCache
  const lexicon = model.two.lexicon
  // basic lexicon lookup
  let t = terms[i]
  let word = t.machine || t.normal
  // multi-word lookup
  if (terms[i + 1] !== undefined && multi[word] === true) {
    return checkMulti(terms, i, lexicon)
  }
  return null
}
export default multiWord
