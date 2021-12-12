import { textFromTerms } from './_text.js'

const defaults = {
  text: true,
  terms: true,
}

const fns = {
  text: (terms) => {
    let o = { keepPunct: true }
    return textFromTerms(terms, o, false)
  },
  normal: (terms) => {
    let o = { use: 'normal', punctuation: 'some' }
    return textFromTerms(terms, o, false)
  },
  offset: (terms) => {
    let len = fns.text(terms).length
    return {
      index: terms[0].offset.index,
      start: terms[0].offset.start,
      length: len,
    }
  },
  terms: (terms) => {
    return terms.map(t => {
      let term = Object.assign({}, t)
      term.tags = Array.from(t.tags)
      return term
    })
  },
  confidence: (_terms, m) => m.confidence(),
  syllables: (_terms, m) => m.syllables(),
  sentence: (_terms, m) => m.fullSentence().text(),
  dirty: (terms) => terms.some(t => t.dirty === true)
}
fns.sentences = fns.sentence

const toJSON = function (view, opts) {
  opts = opts || {}
  if (typeof opts === 'string') {
    opts = {}
  }
  opts = Object.assign({}, defaults, opts)
  // run any necessary upfront steps
  if (opts.offset) {
    view.compute('offset')
  }
  return view.docs.map((terms, i) => {
    let res = {}
    Object.keys(opts).forEach(k => {
      if (opts[k] && fns[k]) {
        res[k] = fns[k](terms, view.eq(i))
      }
    })
    return res
  })
}


export default {
  /** return data */
  json: function (n) {
    let res = toJSON(this, n)
    if (typeof n === 'number') {
      return res[n]
    }
    return res
  },
}