const cache = function (matches, methods) {
  const cacheMatch = methods.cacheMatch
  matches.forEach(obj => {
    obj.needs = Array.from(cacheMatch(obj.regs))
  })
  return matches
}

export default cache
