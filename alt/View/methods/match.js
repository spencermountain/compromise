export const matchOne = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let m = { regs, group, justOne: true }
  let { ptrs, byGroup } = methods.match(docs, m, this._cache, true)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}
export const match = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let m = { regs, group }
  let { ptrs, byGroup } = methods.match(docs, m, this._cache)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}
export const has = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let m = { regs, group }
  let { ptrs } = methods.match(docs, m, this._cache)
  return ptrs.length > 0
}
