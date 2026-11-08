import { merge, running, acrossCues } from './_lib.js'

const freqFmts = new Set(['freq', 'frequency', 'topk'])
// these numbers are values, not positions - and they call val.get(0) internally
const compares = new Set(['isEqual', 'equals', 'greaterThan', 'lessThan', 'between', 'isBetween'])

// run a View method on every cue, and combine the results
const forward = function (wrap, prop, args) {
  const call = (view, i) => {
    // a WrapDoc param gives each cue its own view
    const params = args.map(a => (a?.views ? a.views[i] : a))
    return view[prop](...params)
  }
  const nums = args.filter(a => typeof a === 'number')
  if (nums.length === 0 || compares.has(prop)) {
    return merge(wrap.views.map(call), wrap)
  }
  return merge(acrossCues(wrap.views, nums, call), wrap)
}

const handler = {
  get(target, prop, receiver) {
    // methods on this class win - but not Object's, like .toLocaleString()
    if (typeof prop === 'symbol' || target[prop] !== Object.prototype[prop]) {
      return Reflect.get(target, prop, receiver)
    }
    // anything else is looked up on the cues, so subclasses and plugin methods all work
    if (typeof target.views[0]?.[prop] === 'function') {
      return (...args) => forward(receiver, prop, args)
    }
    // a plain property, like .found or .length
    return merge(target.views.map(v => v[prop]), receiver)
  },
}

/** treat a list of docs as if they were one doc */
class WrapDoc {
  // one view per cue - at least one, so use nlp('') for an empty file.
  // selections keep this shape, with an empty view for any cue without a match
  constructor(views) {
    this.views = views
    return new Proxy(this, handler)
  }
  // overload this, to carry along extra data like timestamps
  update(views) {
    return new this.constructor(views)
  }
  get viewType() {
    return this.views[0].viewType
  }

  // ---these count across all cues, not within each one---
  filter(cb) {
    const fn = running(cb)
    return this.update(this.views.map(v => v.filter(fn)))
  }
  forEach(cb) {
    const fn = running(cb)
    this.views.forEach(v => v.forEach(fn))
    return this
  }
  map(cb, empty) {
    const fn = running(cb)
    return merge(this.views.map(v => v.map(fn, empty)), this)
  }
  some(cb) {
    const fn = running(cb)
    return this.views.some(v => v.some(fn))
  }
  find(cb) {
    let done = false
    return this.filter((m, i) => {
      if (done) {
        return false
      }
      done = Boolean(cb(m, i))
      return done
    })
  }
  eq(n) {
    return this.filter((_m, i) => i === n)
  }
  // an alias of .eq(), unless a subclass like Numbers has its own
  get(n) {
    const view = this.views[0]
    return view.get === view.eq ? this.eq(n) : forward(this, 'get', [n])
  }
  first() {
    return this.eq(0)
  }
  last() {
    return this.eq(this.length - 1)
  }
  slice(start, end) {
    const keep = new Set([...Array(this.length).keys()].slice(start, end))
    return this.filter((_m, i) => keep.has(i))
  }
  random(n = 1) {
    const max = Math.max(this.length - n, 0)
    const start = Math.floor(Math.random() * (max + 1))
    return this.slice(start, start + n)
  }
  terms(n) {
    const m = this.match('.')
    return typeof n === 'number' ? m.eq(n) : m
  }
  matchOne(...args) {
    return this.match(...args).first()
  }
  json(n) {
    if (typeof n === 'number') {
      return forward(this, 'json', [])[n]
    }
    return forward(this, 'json', [n])
  }
  unique() {
    const seen = new Set()
    return this.filter(m => {
      const txt = m.text('machine')
      const isNew = !seen.has(txt)
      seen.add(txt)
      return isNew
    })
  }
  // on its own, a cue without a match would return itself, and get selected
  replace(match, input, keep) {
    if (match && !input) {
      return this.replaceWith(match, keep)
    }
    const m = this.match(match)
    if (!m.found) {
      return this
    }
    this.soften()
    return m.replaceWith(input, keep)
  }
  // new text goes on the end of the last cue
  concat(input) {
    if (input instanceof WrapDoc) {
      return forward(this, 'concat', [input])
    }
    const last = this.views.length - 1
    return this.update(this.views.map((v, i) => (i === last ? v.concat(input) : v.all())))
  }

  // ---these can't be combined by type alone---
  isFull() {
    return this.views.every(v => v.isFull())
  }
  isDoc(b) {
    return b instanceof WrapDoc && this.views.every((v, i) => v.isDoc(b.views[i]))
  }
  // an average over every term, not a sum of the cues
  confidence() {
    const terms = this.docs.flat()
    if (terms.length === 0) {
      return 1
    }
    const sum = terms.reduce((n, term) => n + (term.confidence || 1), 0)
    return Math.round((sum / terms.length) * 100) / 100
  }
  out(fmt) {
    if (!freqFmts.has(fmt)) {
      return forward(this, 'out', [fmt])
    }
    // counts must be added across cues
    const counts = new Map()
    this.json({ normal: true }).forEach(({ normal }) => {
      counts.set(normal, (counts.get(normal) ?? 0) + 1)
    })
    const res = Array.from(counts, ([normal, count]) => ({ normal, count }))
    return res.sort((a, b) => b.count - a.count)
  }
}

export default WrapDoc
