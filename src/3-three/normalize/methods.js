import eachTerm from '../../1-one/tokenize/compute/_lib.js'

const methods = {
  // remove titlecasing, uppercase
  'case': (doc) => {
    eachTerm(doc.docs, (term) => {
      term.text = term.text.toLowerCase()
    })
  },
  // visually romanize/anglicize 'Björk' into 'Bjork'.
  'unicode': (doc) => {
    const world = doc.world
    const killUnicode = world.methods.one.killUnicode
    eachTerm(doc.docs, (term) => term.text = killUnicode(term.text, world))
  },
  // remove hyphens, newlines, and force one space between words
  'whitespace': (doc) => {
    eachTerm(doc.docs, (term) => {
      // one space between words
      term.post = term.post.replace(/\s+/g, ' ')
      term.post = term.post.replace(/\s([.,?!:;])/g, '$1')//no whitespace before a period, etc
      // no whitepace before a word
      term.pre = term.pre.replace(/\s+/g, '')
    })
  },
  // remove commas, semicolons - but keep sentence-ending punctuation
  'punctuation': (doc) => {
    eachTerm(doc.docs, (term) => {
      term.pre = term.pre.replace(/[,،]/g, '')
      // turn dashes to spaces
      term.post = term.post.replace(/[–—-]/g, ' ')
      // remove comma, etc 
      term.post = term.post.replace(/[,،:;]/g, '')
      // remove elipses
      term.post = term.post.replace(/…|\.{2,}/g, '')
      // remove repeats
      term.post = term.post.replace(/\?{2,}/g, '?')
      term.post = term.post.replace(/!{2,}/g, '!')
      // replace ?!
      term.post = term.post.replace(/\?!+/g, '?')
    })
    // trim end
    const docs = doc.docs
    const terms = docs[docs.length - 1]
    if (terms && terms.length > 0) {
      const lastTerm = terms[terms.length - 1]
      lastTerm.post = lastTerm.post.replace(/ /g, '')
    }
  },

  // ====== subsets ===

  // turn "isn't" to "is not"
  'contractions': (doc) => {
    doc.contractions().expand()
  },
  // remove them
  'emoji': (doc) => {
    doc.emojis().remove()
  },
  //turn 'Vice Admiral John Smith' to 'John Smith'
  'honorifics': (doc) => {
    doc.match('#Hon+ #Pers').honorifics().remove()
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
    const normalized = doc.map(view => {
      // Verb replacements invalidate the selection's term IDs and can change its length.
      const ptr = view.fullPointer[0].slice(0, 3)
      const before = view.document[ptr[0]].length
      view.verbs().toInfinitive()
      ptr[2] += view.document[ptr[0]].length - before
      return view.update([ptr]).harden()
    })
    doc.ptrs = normalized.ptrs
  },
  // turn "fifty" into "50"
  'numbers': (doc) => {
    doc.numbers().toNumber()
  },

  /** remove bullets from beginning of phrase */
  'debullet': (doc) => {
    const hasBullet = /^\s*([-–—*•])\s*$/
    doc.docs.forEach(terms => {
      //remove bullet symbols
      if (hasBullet.test(terms[0].pre)) {
        terms[0].pre = terms[0].pre.replace(hasBullet, '')
      }
    })
    return doc
  }
}
// 'F.B.I.' -> 'FBI', (these) -> these, "Google's" -> 'Google', "quoted" -> quoted
'acronyms parentheses possessives quotations'.split(' ').forEach(k => {
  methods[k] = (doc) => {
    doc[k]().strip()
  }
})

export default methods
