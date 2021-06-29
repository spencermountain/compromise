// for each cached-sentence, find a list of possible matches
const matchUp = function (docCache, byGroup) {
  return docCache.map(needs => {
    let maybes = new Set()
    needs.forEach(need => {
      if (byGroup.hasOwnProperty(need)) {
        byGroup[need].forEach(o => maybes.add(o))
      }
    })
    return maybes
  })
}
module.exports = matchUp
