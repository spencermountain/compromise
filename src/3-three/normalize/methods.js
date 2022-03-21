const termLoop = function (view, cb) {
  view.docs.forEach(terms => {
    terms.forEach(cb)
  })
}

export default {
  // keep only first-word, and 'entity' titlecasing
  'case': (doc, strength) => {
    termLoop(doc, (term, i) => {
      if (strength === 'heavy') {
        term.text = term.text.toLowerCase()
      }
    })
  },
  // visually romanize/anglicize 'Björk' into 'Bjork'.
  'unicode': (doc) => {
    // termLoop(doc, (term) => term.text = term.normal)
  },
  // remove hyphens, newlines, and force one space between words
  'whitespace': (doc, strength) => {
    termLoop(doc, (term) => {

    })
  },
  // remove commas, semicolons - but keep sentence-ending punctuation
  'punctuation': (doc, strength) => {
    termLoop(doc, (term) => {

    })
  },

  // ====== subsets ===

  // turn "isn't" to "is not"
  'contractions': (doc) => {
    doc.contractions().expand()
  },
  //remove periods from acronyms, like 'F.B.I.'
  'acronyms': (doc) => {
    doc.acronyms().strip()
  },
  //remove words inside brackets (like these)
  'parentheses': (doc) => {
    doc.parentheses().strip()
  },
  // turn "Google's tax return" to "Google tax return"
  'possessives': (doc) => {
    doc.possessives().strip()
  },
  // turn "tax return" to tax return
  'quotations': (doc) => {
    doc.quotations().strip()
  },

  // remove them
  'emoji': (doc) => {
    doc.emojis().remove()
  },
  //turn 'Vice Admiral John Smith' to 'John Smith'
  'honorifics': (doc) => {
    doc.honorifics().remove()
  },
  // remove needless adverbs
  'adverbs': (doc) => {
    doc.adverbs().remove()
  },

  // turn "batmobiles" into "batmobile"
  'nouns': (doc) => {
    doc.nouns().toSingular()
  },
  // turn all verbs into Infinitive form - "I walked" → "I walk"
  'verbs': (doc) => {
    doc.verbs().toInfinitive()
  },


}
