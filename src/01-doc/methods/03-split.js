const build = require('../../tokenizer')

/** add these new terms to the front*/
exports.prepend = function(str) {
  let phrase = build.fromText(str, this.pool())[0] //assume it's one sentence, for now
  this.list.forEach(p => {
    p.prepend(phrase, this)
  })
  return this
}

/** add these new terms to the end*/
exports.append = function(str) {
  let phrase = build.fromText(str, this.pool())[0] //assume it's one sentence, for now
  this.list.forEach(p => {
    p.append(phrase, this)
  })
  return this
}
