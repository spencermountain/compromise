import { fixPointers, isView } from './_lib.js'

const match = function (regs, group) {
  const one = this.methods.one
  // support param as view object
  if (isView(regs)) {
    let ptrs = regs.fullPointer // support a view object as input
    return this.update(ptrs)
  }
  // support param as string
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
  }
  let todo = { regs, group }
  let res = one.match(this.docs, todo, this._cache)
  let { ptrs, byGroup } = fixPointers(res, this.fullPointer)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const matchOne = function (regs = '', group) {
  const one = this.methods.one
  // support at view as a param
  if (isView(regs)) {
    let ptrs = regs.fullPointer // support a view object as input
    return this.update(ptrs)
  }
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
  }
  let todo = { regs, group, justOne: true }
  let res = one.match(this.docs, todo, this._cache)
  let { ptrs, byGroup } = fixPointers(res, this.fullPointer)
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
  } else if (isView(regs)) {
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
  if (isView(regs)) {
    let ptrs = regs.fullPointer // support a view object as input
    return this.update(ptrs)
  }
  return this.none()
}

const ifNo = function (regs, group) {
  const { docs, methods, _cache } = this
  const one = methods.one
  let ptrs
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs)
    let todo = { regs, group }
    ptrs = one.match(docs, todo, _cache).ptrs
  } else if (isView(regs)) {
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

export default { matchOne, match, has, if: ifFn, ifNo }
