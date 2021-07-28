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

const matchOne = function (regs, group) {
  const utils = this.methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs, group, justOne: true }
  let { ptrs, byGroup } = utils.match(this.docs, todo, this._cache, true)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const match = function (regs, group) {
  const utils = this.methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs, byGroup } = utils.match(this.docs, todo, this._cache)
  ptrs = relPointer(ptrs, this.pointer)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

const has = function (regs, group) {
  const utils = this.methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = utils.match(this.docs, todo, this._cache)
  return ptrs.length > 0
}

// 'if'
const ifFn = function (regs, group) {
  const utils = this.methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = utils.match(this.docs, todo, this._cache)
  // convert them to whole sentences
  ptrs = ptrs.map(a => [a[0]])
  return this.update(ptrs)
}

const ifNo = function (regs, group) {
  const { docs, methods, _cache } = this
  const utils = methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs, group }
  let { ptrs } = utils.match(docs, todo, _cache)
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
  const utils = methods.utils
  if (typeof regs === 'string') {
    regs = utils.parseMatch(regs)
  }
  let todo = { regs }
  let { ptrs } = utils.match(docs, todo, _cache)
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
