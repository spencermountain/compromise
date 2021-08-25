import splitAll from './lib/split.js'

const combine = function (left, right) {
  return [left[0], left[1], right[2]]
}

const getDoc = (m, view) => {
  return typeof m === 'string' ? view.match(m) : m
}

// [before], [match], [after]
const splitOn = function (m) {
  let splits = getDoc(m, this).fullPointer
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
const splitBefore = function (m) {
  let splits = getDoc(m, this).fullPointer
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
const splitAfter = function (m) {
  let splits = getDoc(m, this).fullPointer
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

export default { splitOn, splitBefore, splitAfter }
