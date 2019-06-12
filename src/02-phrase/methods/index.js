const append = require('./join/append')
const prepend = require('./join/prepend')

const methods = {
  /** put this text at the end */
  append: function(phrase, doc) {
    append(this, phrase, doc)
    return this
  },

  /** add this text to the beginning */
  prepend: function(phrase, doc) {
    prepend(this, phrase, doc)
    return this
  },

  /** remove start and end whitespace */
  trim: function() {
    let terms = this.terms()
    if (terms.length > 0) {
      //trim starting
      terms[0].preText = terms[0].preText.replace(/^\s+/, '')
      //trim ending
      let lastTerm = terms[terms.length - 1]
      lastTerm.postText = lastTerm.postText.replace(/\s+$/, '')
    }
    return this
  },
}

module.exports = methods
