const build = require('../../tokenizer')

module.exports = {
  /** add these new terms to the front*/
  prepend: function(str) {
    let phrase = build(str, this.pool())[0] //assume it's one sentence, for now
    this.list.forEach(p => {
      p.prepend(phrase, this)
    })
    return this
  },

  /** add these new terms to the end*/
  append: function(str) {
    let phrase = build(str, this.pool())[0] //assume it's one sentence, for now
    this.list.forEach(p => {
      p.append(phrase, this)
    })
    return this
  },
}
