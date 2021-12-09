import { textFromTerms } from './text.js'

const termJSON = function (terms) {
  return terms.map(t => {
    let term = Object.assign({}, t)
    term.tags = Array.from(t.tags)
    return term
  })
}
const defaults = {
  text: true,
  terms: true,
}

const toJson = function (view, opts) {
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
    if (opts.text) {
      res.text = textFromTerms(terms, { keepPunct: true }, false)
    }
    if (opts.normal || opts.machine || opts.reduced) {
      res.normal = textFromTerms(terms, { use: 'normal', punctuation: 'some' }, false)
    }
    if (opts.terms) {
      res.terms = termJSON(terms, opts)
    }
    if (opts.offset) {
      let len = res.text.length
      res.offset = {
        index: terms[0].offset.index,
        start: terms[0].offset.start,
        length: len,
      }
    }
    if (opts.confidence && view.confidence) {
      res.confidence = view.eq(i).confidence()
    }
    if (opts.syllables && view.syllables) {
      res.syllables = view.syllables()
    }
    return res
  })
}
export default toJson
