// for each cached-sentence, find a list of possible matches
const matchUp = function (docNeeds, matchGroups) {
  return docNeeds.map(needs => {
    let maybes = []
    needs.forEach(need => {
      if (matchGroups.hasOwnProperty(need)) {
        maybes = maybes.concat(matchGroups[need])
      }
    })
    return new Set(maybes)
  })
}

export default matchUp
