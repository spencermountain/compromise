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
  return view.docs.map(terms => {
    let res = {}
    if (opts.text) {
      res.text = textFromTerms(terms, {}, false)
    }
    if (opts.normal) {
      res.normal = textFromTerms(terms, { use: 'normal' }, false)
    }
    if (opts.terms) {
      res.terms = termJSON(terms, opts)
    }
    if (opts.offset) {
      if (!terms[0].offset) {
        // view.compute('offset')
      }
      let len = res.text.length
      res.offset = {
        index: terms[0].offset.index,
        start: terms[0].offset.start,
        length: len,
      }
    }
    return res
  })
}
export default toJson
