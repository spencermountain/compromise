const addReg = function (reg, match, pos, neg, isNeg) {
  if (reg.optional === true) {
    return
  }
  let cache = reg.negative || isNeg ? neg : pos
  if (reg.tag) {
    let key = '#' + reg.tag
    cache[key] = cache[key] || []
    cache[key].push(match)
  }
  if (reg.word) {
    cache[reg.word] = cache[reg.word] || []
    cache[reg.word].push(match)
  }
  if (reg.fastOr) {
    Array.from(reg.fastOr).forEach(str => {
      cache[str] = cache[str] || []
      cache[str].push(match)
    })
  }
  // add 'slow-or' recursively
  if (reg.choices) {
    reg.choices.forEach(multi => {
      multi.forEach(m => addReg(m, match, pos, neg, reg.negative)) //recursion
    })
  }
}

const cacheMatches = function (matches, methods) {
  const parseMatch = methods.parseMatch
  // parse match strings
  let pos = {}
  let neg = {}
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match)
    obj.regs.forEach(reg => {
      addReg(reg, obj, pos, neg)
    })
  })
  console.log(pos)
  console.log(neg)
  return { pos, neg }
}
module.exports = cacheMatches
