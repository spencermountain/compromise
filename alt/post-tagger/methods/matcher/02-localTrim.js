// filter-down list of maybes
const localTrim = function (maybeList, docCache) {
  docCache.forEach((haves, n) => {
    maybeList[n] = Array.from(maybeList[n]).filter(obj => {
      return obj.needs.every(need => haves.has(need))
    })
  })
  return maybeList
}
module.exports = localTrim
