const combine = function (left, right) {
  return [left[0], left[1], right[2]]
}

const getDoc = (reg, view, group) => {
  let m = reg
  if (typeof reg === 'string') {
    m = view.match(reg, group)
  }
  // are we splitting within a contraction?
  // if (m.has('@hasContraction')) {
  //   let more = m.grow('@hasContraction')
  //   more.contractions().expand()
  // }
  return m
}

const methods = {}
// [before], [match], [after]
methods.splitOn = function (m, group) {
  const { splitAll } = this.methods.one
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
  const { splitAll } = this.methods.one
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
  const { splitAll } = this.methods.one
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
