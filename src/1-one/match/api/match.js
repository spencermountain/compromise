import { fixPointers, isView } from './_lib.js'

const match = function (regs, group, opts) {
  const one = this.methods.one
  // support param as view object
  if (isView(regs)) {
    return this.intersection(regs)
  }
  // support param as string
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs, opts)
  }
  let todo = { regs, group }
  let res = one.match(this.docs, todo, this._cache)
  let { ptrs, byGroup } = fixPointers(res, this.fullPointer)
  let view = this.toView(ptrs)
  view._groups = byGroup
  return view
}

const matchOne = function (regs, group, opts) {
  const one = this.methods.one
  // support at view as a param
  if (isView(regs)) {
    return this.intersection(regs).eq(0)
  }
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs, opts)
  }
  let todo = { regs, group, justOne: true }
  let res = one.match(this.docs, todo, this._cache)
  let { ptrs, byGroup } = fixPointers(res, this.fullPointer)
  let view = this.toView(ptrs)
  view._groups = byGroup
  return view
}

const has = function (regs, group, opts) {
  const one = this.methods.one
  let ptrs
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs, opts)
    let todo = { regs, group, justOne: true }
    ptrs = one.match(this.docs, todo, this._cache).ptrs
  } else if (isView(regs)) {
    ptrs = regs.fullPointer // support a view object as input
  }
  return ptrs.length > 0
}

// 'if'
const ifFn = function (regs, group, opts) {
  const one = this.methods.one
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs, opts)
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
    return this.filter(m => m.intersection(regs).found)
  }
  return this.none()
}

const ifNo = function (regs, group, opts) {
  const { methods } = this
  const one = methods.one
  // support a view object as input
  if (isView(regs)) {
    return this.difference(regs)
  }
  // otherwise parse the match string
  if (typeof regs === 'string') {
    regs = one.parseMatch(regs, opts)
  }
  return this.filter(m => {
    let todo = { regs, group, justOne: true }
    let ptrs = one.match(m.docs, todo, m._cache).ptrs
    return ptrs.length === 0
  })

}

export default { matchOne, match, has, if: ifFn, ifNo }
