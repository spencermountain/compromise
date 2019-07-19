const build = require('../../01-tokenizer')

/** add these new terms to the front*/
exports.prepend = function(str) {
  let phrase = build.fromText(str, this.pool())[0] //assume it's one sentence, for now
  this.list.forEach(p => {
    p.prepend(phrase, this)
  })
  return this
}
exports.insertBefore = exports.prepend

/** add these new terms to the end*/
exports.append = function(str) {
  let phrase = build.fromText(str, this.pool())[0] //assume it's one sentence, for now
  this.list.forEach(p => {
    p.append(phrase, this)
  })
  return this
}
exports.insertAfter = exports.append

/** add these new things to the end*/
exports.concat = function() {
  let list = this.list.slice(0)
  //repeat for any number of params
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]
    //support a fresh string
    if (typeof arg === 'string') {
      let arr = build.fromText(arg)
      //TODO: phrase.tagger()?
      list = list.concat(arr)
    } else if (arg.isA === 'Doc') {
      list = list.concat(arg.list)
    } else if (arg.isA === 'Phrase') {
      list.push(arg)
    }
  }
  return this.buildFrom(list)
}
