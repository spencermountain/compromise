import fancyThings from './byTag.js'

// derive clever things from our lexicon key-value pairs
// this method runs as the pre-tagger plugin gets loaded
const expand = function (words, world) {
  const { methods, model } = world
  let lex = {}
  // console.log('start:', Object.keys(lex).length)
  let _multi = {}
  // go through each word in this key-value obj:
  Object.keys(words).forEach(word => {
    let tag = words[word]
    // normalize lexicon a little bit
    word = word.toLowerCase().trim()
    word = word.replace(/'s\b/, '')
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi[split[0]] = true
    }
    // do any clever-business, by it's tag
    if (fancyThings.hasOwnProperty(tag) === true) {
      fancyThings[tag](word, lex, methods, model)
    }
    lex[word] = lex[word] || tag
  })
  // cleanup
  delete lex['']
  delete lex[null]
  delete lex[' ']
  return { lex, _multi }
}
export default expand
