// compress a list of things by frequency
const topk = function(list) {
  let counts = {}
  list.forEach(a => {
    counts[a] = counts[a] || 0
    counts[a] += 1
  })
  let arr = Object.keys(counts)
  arr = arr.sort((a, b) => {
    if (counts[a] > counts[b]) {
      return -1
    } else {
      return 1
    }
  })
  // arr = arr.filter(a => counts[a] > 1)
  return arr.map(a => [a, counts[a]])
}
module.exports = topk
