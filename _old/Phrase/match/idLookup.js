// match an explicit sequence of term ids
// take a phrase and find any of the idBlocks in it
const idLookup = function (terms, regs) {
  let matches = []
  let blocklist = regs[0].idBlocks
  for (let t = 0; t < terms.length; t += 1) {
    blocklist.forEach(block => {
      if (block.length === 0) {
        return
      }
      let foundAll = block.every((id, i) => {
        return terms[t + i].id === id
      })
      if (foundAll) {
        matches.push({ match: terms.slice(t, t + block.length) })
        //  skip top-loop forward
        t += block.length - 1
      }
    })
  }
  return matches
}
module.exports = idLookup
