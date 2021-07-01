// derive clever things from our lexicon key-value pairs
const grow = function (model, methods) {
  let lex = model.lexicon
  let _multi = model._multiCache

  // go through each word in the lex:
  Object.keys(lex).forEach(word => {
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi.add(split[0])
    }
  })
}
export default grow
