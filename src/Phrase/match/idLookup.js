// match an explicit sequence of term ids
// take a phrase and find any of the idBlocks in it
const idLookup = function (terms, regs) {
  let matches = []
  let blocklist = regs[0].idBlocks
  for (let t = 0; t < terms.length; t += 1) {
    blocklist.forEach(block => {
      let foundAll = block.every((id, i) => {
        return terms[t + i].id === id
      })
      if (foundAll) {
        matches.push({ match: terms.slice(0, block.length) })
      }
    })
  }
  return matches
}
module.exports = idLookup
