const conjugate = require('../transforms/verbs')
//supported verb forms:
const forms = [null, 'PastTense', 'PresentTense', 'Gerund', 'Participle']

//simply put these words in our lexicon
const addWords = function(obj, lex) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i += 1) {
    let k = keys[i]
    //add infinitive
    lex[k] = lex[k] || 'Infinitive'
    //add other forms
    for (let f = 1; f < forms.length; f += 1) {
      if (obj[k][forms[f]] !== undefined && lex[obj[k][forms[f]]] === undefined) {
        lex[obj[k][forms[f]]] = forms[f]
      }
    }
  }
}

//unpack this ad-hoc compression format for our verbs
const unpackVerbs = function(str) {
  let verbs = str.split('|')
  return verbs.reduce((h, s) => {
    let parts = s.split(':')
    let prefix = parts[0]
    let ends = parts[1].split(',')
    //grab the infinitive
    let inf = prefix + ends[0]
    if (ends[0] === '_') {
      inf = prefix
    }
    h[inf] = {}
    //we did the infinitive, now do the rest:
    for (let i = 1; i < forms.length; i++) {
      let word = parts[0] + ends[i]
      if (ends[i] === '_') {
        word = parts[0]
      }
      if (ends[i]) {
        h[inf][forms[i]] = word
      }
    }
    return h
  }, {})
}

// automatically conjugate the non-irregular verbs
const bulkUp = function(conjugations) {
  const keys = Object.keys(conjugations)
  for (let i = 0; i < keys.length; i += 1) {
    let inf = keys[i]
    let conj = conjugations[inf]
    //do we need to add the rest ourselves?
    if (conj.PastTense === undefined || conj.PresentTense === undefined || conj.Gerund === undefined) {
      //this is a little redundant, when we have some forms already
      let auto = conjugate(inf)
      conjugations[inf] = Object.assign(auto, conj)
    }
  }
  return conjugations
}

//bulk-up our irregular verb list
const addVerbs = function(str, lexicon) {
  let conjugations = unpackVerbs(str)
  //ensure all the conjugations are there..
  conjugations = bulkUp(conjugations)
  //add them all to the lexicon
  addWords(conjugations, lexicon)
  return conjugations
}
module.exports = addVerbs
