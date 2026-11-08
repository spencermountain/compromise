import { textFromTerms } from './_text.js'
import fmts from './_fmts.js'
import hash from '../methods/hash.js'

const defaults = {
  text: true,
  terms: true,
}

const opts = { case: 'none', unicode: 'some', form: 'machine', punctuation: 'some' }

// text in this format, keeping punctuation
const punct = (terms, fmt) => textFromTerms(terms, { ...fmt, keepPunct: true }, false)

const fns = {
  text: terms => punct(terms),
  normal: terms => punct(terms, fmts.normal),
  implicit: terms => punct(terms, fmts.implicit),

  machine: terms => textFromTerms(terms, opts, false),
  root: terms => textFromTerms(terms, { ...opts, form: 'root' }, false),

  hash: terms => hash(punct(terms)),

  offset: terms => {
    const len = fns.text(terms).length
    // the text keeps leading punctuation but trims whitespace, so start where the text starts
    const raw = terms[0].pre + terms[0].text
    const lead = terms[0].pre.length - (raw.length - raw.trimStart().length)
    return {
      index: terms[0].offset.index,
      start: terms[0].offset.start - lead,
      length: len,
    }
  },
  terms: terms => {
    return terms.map(t => ({ ...t, tags: [...t.tags] }))
  },
  confidence: (_terms, view, i) => view.eq(i).confidence(),
  syllables: (_terms, view, i) => view.eq(i).syllables(),
  sentence: (_terms, view, i) => view.eq(i).fullSentence().text(),
  dirty: terms => terms.some(t => t.dirty === true),
}
fns.sentences = fns.sentence
fns.clean = fns.normal
fns.reduced = fns.root

const toJSON = function (view, option) {
  option ||= {}
  if (typeof option === 'string') {
    option = {}
  }
  option = { ...defaults, ...option }
  // run any necessary upfront steps
  if (option.offset) {
    view.compute('offset')
  }
  return view.docs.map((terms, i) => {
    const res = {}
    Object.keys(option).forEach(k => {
      if (option[k] && fns[k]) {
        res[k] = fns[k](terms, view, i)
      }
    })
    return res
  })
}

const methods = {
  /** return data */
  json: function (n) {
    const res = toJSON(this, n)
    if (typeof n === 'number') {
      return res[n]
    }
    return res
  },
}
methods.data = methods.json
export default methods
