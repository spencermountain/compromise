const killUnicode = require('../../../Term/normalize/unicode')
const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g
const quotes = /['‘’“”"′″‴]+/g

const methods = {
  // cleanup newlines and extra spaces
  whitespace: function (doc) {
    let termArr = doc.list.map(ts => ts.terms())
    termArr.forEach((terms, o) => {
      terms.forEach((t, i) => {
        // keep dashes between words
        if (t.hasDash() === true) {
          t.post = ' - '
          return
        }
        // remove existing spaces
        t.pre = t.pre.replace(/\s/g, '')
        t.post = t.post.replace(/\s/g, '')
        //last word? ensure there's a next sentence.
        if (terms.length - 1 === i && !termArr[o + 1]) {
          return
        }
        // no extra spaces for contractions
        if (t.implicit && Boolean(t.text) === true) {
          return
        }
        // no extra spaces for hyphenated words
        if (t.hasHyphen() === true) {
          return
        }

        t.post += ' '
      })
    })
  },

  punctuation: function (termList) {
    termList.forEach(t => {
      // space between hyphenated words
      if (t.hasHyphen() === true) {
        t.post = ' '
      }
      t.pre = t.pre.replace(isPunct, '')
      t.post = t.post.replace(isPunct, '')
      // elipses
      t.post = t.post.replace(/\.\.\./, '')
      // only allow one exclamation
      if (/!/.test(t.post) === true) {
        t.post = t.post.replace(/!/g, '')
        t.post = '!' + t.post
      }
      // only allow one question mark
      if (/\?/.test(t.post) === true) {
        t.post = t.post.replace(/[\?!]*/, '')
        t.post = '?' + t.post
      }
    })
  },

  unicode: function (termList) {
    termList.forEach(t => {
      if (t.isImplicit() === true) {
        return
      }
      t.text = killUnicode(t.text)
    })
  },

  quotations: function (termList) {
    termList.forEach(t => {
      t.post = t.post.replace(quotes, '')
      t.pre = t.pre.replace(quotes, '')
    })
  },

  adverbs: function (doc) {
    doc.match('#Adverb').not('(not|nary|seldom|never|barely|almost|basically|so)').remove()
  },

  // remove the '.' from 'Mrs.' (safely)
  abbreviations: function (doc) {
    doc.list.forEach(ts => {
      let terms = ts.terms()
      terms.forEach((t, i) => {
        if (t.tags.Abbreviation === true && terms[i + 1]) {
          t.post = t.post.replace(/^\./, '')
        }
      })
    })
  },
}
module.exports = methods
