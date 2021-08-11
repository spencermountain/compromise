const cache = function (matches, methods) {
  const cacheMatch = methods.one.cacheMatch
  matches.forEach(obj => {
    obj.needs = Array.from(cacheMatch(obj.regs))
    // if (obj.if) {
    // }
  })
  return matches
}

export default cache
