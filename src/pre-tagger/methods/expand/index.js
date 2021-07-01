import fancyThings from './fancy.js'

// derive clever things from our lexicon key-value pairs
// this method runs as the pre-tagger plugin gets loaded
const grow = function (model, methods) {
  let lex = model.lexicon
  console.log('start:', Object.keys(lex).length)
  let _multi = model._multiCache

  // go through each word in the lex:
  Object.keys(lex).forEach(word => {
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi.add(split[0])
    }
    let tag = lex[word]
    if (fancyThings.hasOwnProperty(tag) === true) {
      fancyThings[tag](word, lex, methods, model)
    }
  })

  // recycle anything interesting in the model:
  if (model.irregularVerbs) {
    Object.entries(model.irregularVerbs).forEach(a => {
      let [inf, conj] = a
      lex[inf] = lex[inf] || 'Infinitive'
      Object.keys(conj).forEach(tag => {
        let word = conj[tag]
        lex[word] = lex[word] || tag
      })
    })
  }
  if (model.irregularPlurals) {
    Object.entries(model.irregularPlurals).forEach(a => {
      lex[a[0]] = lex[a[0]] || 'Singular'
      lex[a[1]] = lex[a[1]] || 'Plural'
    })
  }
  console.log('after:', Object.keys(lex).length)
}
export default grow
