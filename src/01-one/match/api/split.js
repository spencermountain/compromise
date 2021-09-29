import splitAll from '../../../API/pointers/split.js'

const combine = function (left, right) {
  return [left[0], left[1], right[2]]
}

const getDoc = (m, view, group) => {
  return typeof m === 'string' ? view.match(m, group) : m
}

const methods = {}
// [before], [match], [after]
methods.splitOn = function (m, group) {
  let splits = getDoc(m, this, group).fullPointer
  let all = splitAll(this.fullPointer, splits)
  let res = []
  all.forEach(o => {
    res.push(o.passthrough)
    res.push(o.before)
    res.push(o.match)
    res.push(o.after)
  })
  res = res.filter(p => p)
  return this.update(res)
}

// [before], [match after]
methods.splitBefore = function (m, group) {
  let splits = getDoc(m, this, group).fullPointer
  let all = splitAll(this.fullPointer, splits)
  let res = []
  all.forEach(o => {
    res.push(o.passthrough)
    res.push(o.before)
    if (o.match && o.after) {
      res.push(combine(o.match, o.after))
    } else {
      res.push(o.match)
      res.push(o.after)
    }
  })
  res = res.filter(p => p)
  return this.update(res)
}

// [before match], [after]
methods.splitAfter = function (m, group) {
  let splits = getDoc(m, this, group).fullPointer
  let all = splitAll(this.fullPointer, splits)
  let res = []
  all.forEach(o => {
    res.push(o.passthrough)
    if (o.before && o.match) {
      res.push(combine(o.before, o.match))
    } else {
      res.push(o.before)
      res.push(o.match)
    }
    res.push(o.after)
  })
  res = res.filter(p => p)
  return this.update(res)
}
methods.split = methods.splitAfter

export default methods
