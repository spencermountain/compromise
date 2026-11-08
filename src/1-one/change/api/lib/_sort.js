/** alphabetical order */
const alpha = (a, b) => {
  if (a.normal < b.normal) {
    return -1
  }
  if (a.normal > b.normal) {
    return 1
  }
  return 0
}

/** count the # of characters of each match - longest first */
const length = (a, b) => b.normal.trim().length - a.normal.trim().length

/** count the # of terms in each match - most first */
const wordCount = (a, b) => b.words - a.words

/** count the # of terms in each match */
const sequential = (a, b) => b[0] - a[0] || (a[1] > b[1] ? 1 : -1)

/** sort by # of duplicates in the document*/
const byFreq = function (arr) {
  const counts = Object.create(null)
  arr.forEach(o => {
    counts[o.normal] ??= 0
    counts[o.normal] += 1
  })
  // sort by freq - most first
  arr.sort((a, b) => counts[b.normal] - counts[a.normal])
  return arr
}

export default { alpha, length, wordCount, sequential, byFreq }
