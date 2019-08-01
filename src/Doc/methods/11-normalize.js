const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g
const quotes = /['‘’“”"′″‴]+/g
const whitespace = /\W/g //not whitespace
const killUnicode = require('../../Term/clean/unicode')
/*
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,

  contractions: false,

  adverbs: false,
  emoji: false,
  parentheses: false,
  quotations: false,

  verbs: false,
  nouns: false,
*/

const defaults = {}
/** common ways to clean-up the document, and reduce noise */
exports.normalize = function(options = {}) {
  options = Object.assign({}, defaults, options)
  // let termArr = this.list.map(ts => ts.terms())
  let termList = this.termList()

  //whitespace
  if (options.whitespace) {
    termList.forEach(t => {
      t.postText = t.postText.replace(whitespace, '')
      t.preText = t.preText.replace(whitespace, '')
      // t.preText += ' '
    })
  }
  //punctuation - keep sentence punctation, quotes, parenths
  if (options.punctuation) {
    termList.forEach(t => {
      t.postText = t.postText.replace(isPunct, '')
      t.preText = t.preText.replace(isPunct, '')
    })
  }
  // é -> e
  if (options.unicode) {
    termList.forEach(t => {
      t.text = killUnicode(t.text)
    })
  }
  // remove "" punctuation
  if (options.quotations || options.quotes) {
    termList.forEach(t => {
      t.postText = t.postText.replace(quotes, '')
      t.preText = t.preText.replace(quotes, '')
    })
  }
  return this
}
