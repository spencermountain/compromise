// filter-down list of maybe-matches
const localTrim = function (maybeList, docCache) {
  for (let n = 0; n < docCache.length; n += 1) {
    let haves = docCache[n]

    // ensure all stated-needs of the match are met
    maybeList[n] = Array.from(maybeList[n]).filter(obj => {
      return obj.needs.every(need => haves.has(need))
    })
    // ensure nothing matches in our 'ifNo' property
    maybeList[n] = maybeList[n].filter(obj => {
      if (obj.ifNo !== undefined && obj.ifNo.some(no => docCache[n].has(no)) === true) {
        return false
      }
      return true
    })
  }
  return maybeList
}
export default localTrim
