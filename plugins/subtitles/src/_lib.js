const isObject = val => Object.prototype.toString.call(val) === '[object Object]'

// combine one result per cue into a single result, decided by its type
const merge = function (res, wrap) {
  // .map() returns an empty view for a cue with no matches, so views are set aside
  const vals = res.filter(r => r !== undefined && r !== null && !r.isView)
  if (vals.length === 0) {
    if (!res.some(r => r?.isView)) {
      return undefined
    }
    // stay chainable, and keep one view per cue
    return wrap.update(res.map((r, i) => (r?.isView ? r : wrap.views[i].none())))
  }
  const first = vals[0]
  // shared by all cues, like .world
  if (typeof first === 'object' && vals.every(v => v === first)) {
    return first
  }
  if (Array.isArray(first)) {
    return vals.flat(1)
  }
  if (typeof first === 'string') {
    return vals.filter(Boolean).join(' ')
  }
  if (typeof first === 'number') {
    return vals.reduce((sum, n) => sum + n, 0)
  }
  if (typeof first === 'boolean') {
    return vals.some(Boolean)
  }
  // key-by-key, like .groups() or .sweep()
  if (isObject(first)) {
    const keys = [...new Set(vals.flatMap(o => Object.keys(o)))]
    return Object.fromEntries(keys.map(k => [k, merge(res.map(r => r?.[k]), wrap)]))
  }
  return first
}

// give a callback one running index, across every cue
const running = function (cb) {
  let i = 0
  return m => {
    i += 1
    return cb(m, i - 1)
  }
}

// call each cue, while counting any `n` param across all of them.
// wrap.verbs(2) is the 3rd verb overall, not the 3rd verb of every cue.
// each `n` funnels through getNth() or get(), so we borrow those methods during this call
const acrossCues = function (views, nums, cb) {
  let proto = views[0]
  while (!Object.hasOwn(proto, 'getNth')) {
    proto = Object.getPrototypeOf(proto)
  }
  const { getNth, get } = proto
  let seen = 0
  let isDone = false
  const counted = fn =>
    function (n) {
      // only the user's number, and only once - sentences().toPast(0) calls verbs(0) internally
      if (isDone || !nums.includes(n)) {
        return fn.call(this, n)
      }
      isDone = true
      const m = this.eq(n - seen)
      seen += this.length
      return m
    }
  proto.getNth = counted(getNth)
  proto.get = counted(get)
  try {
    return views.map((view, i) => {
      isDone = false
      return cb(view, i)
    })
  } finally {
    proto.getNth = getNth
    proto.get = get
  }
}

export { merge, running, acrossCues }
