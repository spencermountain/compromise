const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g
const quotes = /['‘’“”"′″‴]+/g
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
  let termArr = this.list.map(ts => ts.terms())
  //whitespace
  if (options.whitespace) {
    termArr.forEach((terms, o) => {
      terms.forEach((t, i) => {
        t.pre = t.pre.replace(/\s/g, '')
        t.post = t.post.replace(/\s/g, '')
        //last word? ensure there's a next sentence.
        if (terms.length - 1 === i && !termArr[o + 1]) {
          return
        }
        t.post += ' '
      })
    })
  }

  let termList = this.termList()
  //punctuation - keep sentence punctation, quotes, parenths
  if (options.punctuation) {
    termList.forEach(t => {
      t.post = t.post.replace(isPunct, '')
      t.pre = t.pre.replace(isPunct, '')
    })
  }
  // é -> e
  if (options.unicode) {
    termList.forEach(t => {
      t.text = killUnicode(t.text)
    })
  }
  // '(word)' -> 'word'
  if (options.parentheses) {
    this.parentheses().unwrap()
  }
  // `isn't` -> 'is not'
  if (options.contraction || options.contractions) {
    this.contractions().expand()
  }
  // remove "" punctuation
  if (options.quotations || options.quotes) {
    termList.forEach(t => {
      t.post = t.post.replace(quotes, '')
      t.pre = t.pre.replace(quotes, '')
    })
  }
  return this
}
