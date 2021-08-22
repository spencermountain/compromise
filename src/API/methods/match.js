import invert from './lib/_invert.js'

const relPointer = function (ptrs, parent) {
  if (!parent) {
    return ptrs
  }
  ptrs.forEach(ptr => {
    let n = ptr[0]
    if (parent[n]) {
      ptr[0] = parent[n][0]
      ptr[1] += parent[n][1]
      ptr[2] += parent[n][1]
    }
  })
  return ptrs
}

const match = function (regs, group) {
  const one = this.methods.one
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs, byGroup } = one.match(this.docs, todo, this._cache)
  ptrs = relPointer(ptrs, this.pointer)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const matchOne = function (regs = '', group) {
  const one = this.methods.one
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
  }
  let todo = { regs, group, justOne: true }
  let { ptrs, byGroup } = one.match(this.docs, todo, this._cache, true)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const has = function (regs = '', group) {
  const one = this.methods.one
  let ptrs
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
    let todo = { regs, group, justOne: true }
    ptrs = one.match(this.docs, todo, this._cache).ptrs
  } else if (typeof regs === 'object' && regs.isView === true) {
    ptrs = regs.fullPointer // support a view object as input
  }
  return ptrs.length > 0
}

// 'if'
const ifFn = function (regs, group) {
  const one = this.methods.one
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
    let todo = { regs, group, justOne: true }
    let ptrs = this.fullPointer
    ptrs = ptrs.filter(ptr => {
      let m = this.update([ptr])
      let res = one.match(m.docs, todo, this._cache).ptrs
      return res.length > 0
    })
    return this.update(ptrs)
  }
  if (typeof regs === 'object' && regs.isView === true) {
    let ptrs = regs.fullPointer // support a view object as input
    return this.update(ptrs)
  }
  return this.update([])
}

const ifNo = function (regs, group) {
  const { docs, methods, _cache } = this
  const one = methods.one
  let ptrs
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
    let todo = { regs, group }
    ptrs = one.match(docs, todo, _cache).ptrs
  } else if (typeof regs === 'object' && regs.isView === true) {
    ptrs = regs.fullPointer // support a view object as input
  }
  let found = new Set(ptrs.map(a => a[0]))
  let notFound = [] //invert our pointer
  for (let i = 0; i < docs.length; i += 1) {
    if (found.has(i) === false) {
      notFound.push([i])
    }
  }
  return this.update(notFound)
}

const not = function (regs) {
  const { docs, methods, _cache } = this
  const one = methods.one
  let ptrs = []
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
    ptrs = one.match(docs, { regs }, _cache).ptrs
  } else if (typeof regs === 'object' && regs.isView === true) {
    ptrs = regs.fullPointer // support a view object as input
  }
  // nothing found, end here
  if (ptrs.length === 0) {
    return this
  }
  let found = {}
  ptrs.forEach(a => {
    found[a[0]] = found[a[0]] || []
    found[a[0]].push(a)
  })
  let all = []
  for (let i = 0; i < docs.length; i += 1) {
    all.push([i, 0, docs[i].length])
  }
  let notPtrs = invert(all, ptrs)
  return this.update(notPtrs)
}

export default { matchOne, match, has, if: ifFn, ifNo, not }
