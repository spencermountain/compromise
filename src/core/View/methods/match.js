const matchOne = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let todo = { regs, group, justOne: true }
  let { ptrs, byGroup } = methods.match(docs, todo, this._cache, true)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const match = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs, byGroup } = methods.match(docs, todo, this._cache)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const has = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = methods.match(docs, todo, this._cache)
  return ptrs.length > 0
}

// 'if'
const ifFn = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = methods.match(docs, todo, this._cache)
  // convert them to whole sentences
  ptrs = ptrs.map(a => [a[0]])
  return this.update(ptrs)
}

const ifNo = function (regs, group) {
  let { methods, docs } = this
  if (typeof regs === 'string') {
    regs = methods.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = methods.match(docs, todo, this._cache)
  let found = new Set(ptrs.map(a => a[0]))
  let notFound = [] //invert our pointer
  for (let i = 0; i < docs.length; i += 1) {
    if (found.has(i) === false) {
      notFound.push([i])
    }
  }
  return this.update(notFound)
}

export { matchOne, match, has, ifFn as if, ifNo }
