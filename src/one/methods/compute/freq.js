// sort words by frequency
const freq = function (docs) {
  let counts = {}
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      let term = docs[i][t]
      let word = term.implicit || term.normal
      counts[word] = counts[word] || 0
      counts[word] += 1
    }
  }
  // add counts on each term
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      let term = docs[i][t]
      let word = term.implicit || term.normal
      term.freq = counts[word]
    }
  }
}
export default freq
