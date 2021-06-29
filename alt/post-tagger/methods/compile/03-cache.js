const cache = function (matches, methods) {
  const cacheMatch = methods.cacheMatch
  matches.forEach(obj => {
    obj.needs = Array.from(cacheMatch(obj.regs))
  })
  return matches
}
module.exports = cache
