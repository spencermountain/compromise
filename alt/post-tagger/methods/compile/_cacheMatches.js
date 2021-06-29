const addReg = function (reg, match, cache) {
  // negatives can't be cached
  if (reg.optional === true || reg.negative === true) {
    return
  }
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
      multi.forEach(m => addReg(m, match, cache)) //recursion
    })
  }
}

const cacheMatches = function (matches, methods) {
  const parseMatch = methods.parseMatch
  const cacheMatch = methods.cacheMatch
  // parse match strings
  let pos = {}
  matches.forEach(obj => {
    obj.regs = parseMatch(obj.match)
    obj.needs = Array.from(cacheMatch(obj.regs))
    // obj.regs.forEach(reg => {
    //   addReg(reg, obj, pos)
    // })
  })
  // console.log(pos)
  return matches
}
module.exports = cacheMatches
