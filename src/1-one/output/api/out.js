import debug from './debug.js'
import wrap from './wrap.js'
import hash from '../methods/hash.js'
import toSpec from './_spec.js'
import isObject from '../../../API/_is.js'

// sort by frequency
const topk = function (arr) {
  const counts = new Map()
  arr.forEach(word => {
    counts.set(word, (counts.get(word) ?? 0) + 1)
  })
  const res = Array.from(counts, ([normal, count]) => ({ normal, count }))
  return res.sort((a, b) => b.count - a.count)
}

// named output formats
const outputs = {
  // text formats
  text: view => view.text(),
  normal: view => view.text('normal'),
  root: view => view.text('root'),
  machine: view => view.text('machine'),
  hash: view => hash(view.text()),
  // tagged-sentence format for LLMs (see docs/spec-format.md)
  spec: view => toSpec(view, view.world),
  // json data formats
  json: view => view.json(),
  offset: view => {
    view.compute('offset')
    return view.json({ offset: true })
  },
  array: view => {
    const arr = view.docs.map(terms => {
      return terms
        .reduce((str, t) => {
          return str + t.pre + t.text + t.post
        }, '')
        .trim()
    })
    return arr.filter(str => str)
  },
  // return terms sorted by frequency
  freq: view => topk(view.json({ normal: true }).map(o => o.normal)),
  // some handy ad-hoc outputs
  terms: view => view.docs.flatMap(terms => terms.map(t => t.text).filter(Boolean)),
  tags: view => {
    return view.docs.map(terms => {
      return terms.reduce((h, t) => {
        h[t.implicit || t.normal] = Array.from(t.tags)
        return h
      }, {})
    })
  },
  'best-tag': view => {
    view.compute('tagRank')
    return view.docs
      .map(ts => {
        return ts.map(t => (t.tagRank?.[0] ? `#${t.tagRank[0]}` : '')).join(' ')
      })
      .join('\n')
  },
  debug: view => view.debug(), //allow
}
// aliases
outputs.reduced = outputs.machine
outputs.md5 = outputs.hash
outputs.offsets = outputs.offset
outputs.frequency = outputs.freq
outputs.topk = outputs.freq

/** some named output formats */
const out = function (method) {
  // support custom outputs
  if (isObject(method)) {
    return wrap(this, method)
  }
  if (Object.hasOwn(outputs, method)) {
    return outputs[method](this)
  }
  return this.text()
}

const methods = {
  /** */
  debug: debug,
  /** */
  out,
  /** */
  wrap: function (obj) {
    return wrap(this, obj)
  },
}

export default methods
