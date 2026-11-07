import { fixPointers, isView, isNet, parseRegs } from './_lib.js'

// sweep options when only finding, not tagging
const noTag = { tagger: false }

// parse the match-syntax, then run it over the docs
const doMatch = (view, regs, group, opts, justOne) => {
  regs = parseRegs(regs, opts, view.world)
  return view.methods.one.match(view.docs, { regs, group, justOne }, view._cache)
}

// turn match results into a view
const asView = (view, res) => {
  const { ptrs, byGroup } = fixPointers(res, view.fullPointer)
  const out = view.toView(ptrs)
  out._groups = byGroup
  return out
}

const match = function (regs, group, opts) {
  // support param as view object
  if (isView(regs)) {
    return this.intersection(regs)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, noTag).view.settle()
  }
  return asView(this, doMatch(this, regs, group, opts))
}

const matchOne = function (regs, group, opts) {
  // support at view as a param
  if (isView(regs)) {
    return this.intersection(regs).eq(0)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, { tagger: false, matchOne: true }).view
  }
  return asView(this, doMatch(this, regs, group, opts, true))
}

const has = function (regs, group, opts) {
  // support view as input
  if (isView(regs)) {
    return this.intersection(regs).fullPointer.length > 0
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    return this.sweep(regs, noTag).view.found
  }
  return doMatch(this, regs, group, opts, true).ptrs.length > 0
}

// keep only the matches that do (or don't) contain this match
const ifBy = want => function (regs, group, opts) {
  // support view as input
  if (isView(regs)) {
    return this.filter(m => m.intersection(regs).found === want)
  }
  // support a compiled set of matches
  if (isNet(regs)) {
    const m = this.sweep(regs, noTag).view.settle()
    return this.filter(v => v.intersection(m).found === want)
  }
  // otherwise parse the match string
  regs = parseRegs(regs, opts, this.world)
  const todo = { regs, group, justOne: true }
  const cache = this._cache || []
  const view = this.filter((m, i) => {
    return (this.methods.one.match(m.docs, todo, cache[i]).ptrs.length > 0) === want
  })
  // try to reconstruct the cache
  if (this._cache) {
    view._cache = view.ptrs.map(ptr => cache[ptr[0]])
  }
  return view
}

export default { matchOne, match, has, if: ifBy(true), ifNo: ifBy(false) }
