const checkNegative = require('./01-negative')
const checkApostrophe = require('./02-apostrophe-s')
const checkIrregulars = require('./03-irregulars')

//stitch these words into our sentence
const addContraction = function(phrase, term, arr) {
  //apply the first word to our term
  let first = arr.shift()
  term.implicit = first
  //add the second one
  // let str = arr.slice(1).join(' ');

  // let find = phrase.fromId(term.id);
  // console.log(find);
  // find.append(str);
}

const contractions = function(doc) {
  doc.list.forEach(p => {
    let terms = p.terms()
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = checkNegative(term)
      found = found || checkApostrophe(term)
      found = found || checkIrregulars(term)
      //add them in
      if (found !== null) {
        addContraction(p, term, found)
      }
    }
  })
  return doc
}
module.exports = contractions
