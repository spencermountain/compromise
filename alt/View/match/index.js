// const runMatch = require('./match-runner')
const runMatch = require('./match-runner')
const parseMatch = require('./match-syntax')

const _parseMatch = function (regs) {
  if (typeof regs === 'string') {
    return parseMatch(regs)
  }
  return regs
}

const _getPointers = function (res, group) {
  let ptrs = []
  let byGroup = {}
  if (res.length === 0) {
    return ptrs
  }
  if (typeof group === 'number') {
    group = String(group)
  }
  if (group) {
    res.forEach(r => {
      if (r.groups[group]) {
        ptrs.push(r.groups[group])
      }
    })
  } else {
    res.forEach(r => {
      ptrs.push(r.pointer)
      Object.keys(r.groups).forEach(k => {
        byGroup[k] = byGroup[k] || []
        byGroup[k].push(r.groups[k])
      })
    })
  }
  return { ptrs, byGroup }
}

/** return the first match */
exports.matchOne = function (regs, group) {
  regs = _parseMatch(regs)
  let res = runMatch(this, regs, true)
  let { ptrs, byGroup } = _getPointers(res, group)
  return this.update(ptrs)
}

/** return an array of matching phrases */
exports.match = function (regs, group) {
  regs = _parseMatch(regs)
  let res = runMatch(this, regs)
  let { ptrs, byGroup } = _getPointers(res, group)
  let view = this.update(ptrs)
  view._groups = byGroup
  return view
}

/** return boolean if one match is found */
exports.has = function (regs, group) {
  regs = _parseMatch(regs)
  let res = runMatch(this, regs)
  let { ptrs, byGroup } = _getPointers(res, group)
  return ptrs.length > 0
}
