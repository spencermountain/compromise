import { onset, adjustments } from './boundaries.js'

const boundaries = (word, groups) => {
  const cuts = []
  for (let i = 1; i < groups.length; i += 1) {
    const left = groups[i - 1].end
    const right = groups[i].start
    const gap = word.slice(left, right)
    // Ending rules inspect at most four characters, keeping each lookup bounded.
    const tail = word.slice(right, right + 4)
    let cut = left
    if (gap.length > 1) {
      cut = right - 1
      for (let size = Math.min(3, gap.length); size > 1; size -= 1) {
        if (onset.test(gap.slice(-size))) {
          cut = right - size
          break
        }
      }
    }
    adjustments.forEach(rule => {
      if (
        gap.length < rule.minGap ||
        (rule.maxGap !== undefined && gap.length > rule.maxGap) ||
        (rule.gap && !rule.gap.test(gap)) ||
        (rule.tail && !rule.tail.test(tail))
      ) {
        return
      }
      if (rule.left !== undefined) {
        cut = left + rule.left
      } else if (rule.right !== undefined) {
        cut = right + rule.right
      } else {
        cut = Math.max(cut, left + rule.minLeft)
      }
    })
    cuts.push(cut)
  }
  return cuts
}

export default boundaries
