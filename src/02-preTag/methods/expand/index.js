import fancyThings from './byTag.js'

// derive clever things from our lexicon key-value pairs
// this method runs as the pre-tagger plugin gets loaded
const expand = function (words, model, methods) {
  let lexicon = {}
  // console.log('start:', Object.keys(lex).length)
  let _multi = {}

  // go through each word in this key-value obj:
  Object.keys(words).forEach(word => {
    let tag = lexicon[word]
    // normalize lexicon a little bit
    word = word.toLowerCase().trim()
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi.add(split[0])
    }
    // do any clever-business, by it's tag
    if (fancyThings.hasOwnProperty(tag) === true) {
      fancyThings[tag](word, lexicon, methods, model)
    }
    // finally, add it in
    lexicon[word] = tag
  })

  // cleanup
  delete lexicon['']
  delete lexicon[null]
  delete lexicon[' ']
  return { lexicon, _multi }
}
export default expand
