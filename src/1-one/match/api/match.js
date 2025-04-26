import { fixPointers, isView, isNet, parseRegs } from './_lib.js'

const match = function (regs, group, opts) {
  const one = this.methods.one
  // support param as view object
  if (isView(regs)) {
    return this.intersection(regs)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, { tagger: false }).view.settle()
  }
  regs = parseRegs(regs, opts, this.world)
  const todo = { regs, group }
  const res = one.match(this.docs, todo, this._cache)
  const { ptrs, byGroup } = fixPointers(res, this.fullPointer)
  const view = this.toView(ptrs)
  view._groups = byGroup
  return view
}

const matchOne = function (regs, group, opts) {
  const one = this.methods.one
  // support at view as a param
  if (isView(regs)) {
    return this.intersection(regs).eq(0)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, { tagger: false, matchOne: true }).view
  }
  regs = parseRegs(regs, opts, this.world)
  const todo = { regs, group, justOne: true }
  const res = one.match(this.docs, todo, this._cache)
  const { ptrs, byGroup } = fixPointers(res, this.fullPointer)
  const view = this.toView(ptrs)
  view._groups = byGroup
  return view
}

const has = function (regs, group, opts) {
  const one = this.methods.one
  // support view as input
  if (isView(regs)) {
    const ptrs = this.intersection(regs).fullPointer
    return ptrs.length > 0
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, { tagger: false }).view.found
  }
  regs = parseRegs(regs, opts, this.world)
  const todo = { regs, group, justOne: true }
  const ptrs = one.match(this.docs, todo, this._cache).ptrs
  return ptrs.length > 0
}

// 'if'
const ifFn = function (regs, group, opts) {
  const one = this.methods.one
  // support view as input
  if (isView(regs)) {
    return this.filter(m => m.intersection(regs).found)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    const m = this.sweep(regs, { tagger: false }).view.settle()
    return this.if(m) //recurse with result
  }
  regs = parseRegs(regs, opts, this.world)
  const todo = { regs, group, justOne: true }
  let ptrs = this.fullPointer
  const cache = this._cache || []
  ptrs = ptrs.filter((ptr, i) => {
    const m = this.update([ptr])
    const res = one.match(m.docs, todo, cache[i]).ptrs
    return res.length > 0
  })
  const view = this.update(ptrs)
  // try and reconstruct the cache
  if (this._cache) {
    view._cache = ptrs.map(ptr => cache[ptr[0]])
  }
  return view
}

const ifNo = function (regs, group, opts) {
  const { methods } = this
  const one = methods.one
  // support a view object as input
  if (isView(regs)) {
    return this.filter(m => !m.intersection(regs).found)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    const m = this.sweep(regs, { tagger: false }).view.settle()
    return this.ifNo(m)
  }
  // otherwise parse the match string
  regs = parseRegs(regs, opts, this.world)
  const cache = this._cache || []
  const view = this.filter((m, i) => {
    const todo = { regs, group, justOne: true }
    const ptrs = one.match(m.docs, todo, cache[i]).ptrs
    return ptrs.length === 0
  })
  // try to reconstruct the cache
  if (this._cache) {
    view._cache = view.ptrs.map(ptr => cache[ptr[0]])
  }
  return view
}

export default { matchOne, match, has, if: ifFn, ifNo }
