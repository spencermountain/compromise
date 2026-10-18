// Turn vowel spans into cut positions by assigning the consonants between them.
// Consonant clusters allowed to start a chunk; the picker checks longest first.
const onset = new Set([
  'bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr',
  'ph', 'pl', 'pr', 'qu', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp',
  'st', 'sw', 'th', 'tr', 'tw', 'wh', 'scr', 'shr', 'spl', 'spr', 'str', 'thr',
])

// Applied in order after onset placement; later rules take precedence.
// left/right are offsets from the surrounding vowel groups' edges.
// minLeft only moves a boundary forward, preserving a longer consonant cluster.
// gap matches intervening letters; tail matches from the next vowel (up to five chars).
const adjustments = [
  { minGap: 1, maxGap: 1, gap: /^x$/, left: 1 }, // box-es
  { minGap: 2, gap: /^(.)\1/, minLeft: 1 }, // rab-bit
  { minGap: 2, tail: /^ed$/, right: -1 }, // res-ted
  { minGap: 2, gap: /^sh$/, tail: /^(es|ing)$/, right: 0 }, // wish-ing
  { minGap: 2, gap: /l$/, tail: /^e(?:[sd]|['’](?:s|d|ll|re|ve))?$/, right: -2 }, // bot-tle, ta-bles, bub-bled
  { minGap: 1, gap: /^[-‐‑–—]+$/, right: 0 }, // re-enter: keep the hyphen on the left
]

// Choose one cut between each pair of vowel spans, preserving their count.
const pickBoundaries = (word, vowelSpans) => {
  const cuts = []
  for (let i = 1; i < vowelSpans.length; i += 1) {
    // The gap contains the letters not assigned to either vowel span.
    const left = vowelSpans[i - 1].end
    const right = vowelSpans[i].start
    const gap = word.slice(left, right)
    // Include a fifth character so four-character endings like e've must really end.
    const tail = word.slice(right, right + 5)
    // Adjacent vowels split directly; a single consonant starts the next chunk.
    let cut = left
    if (gap.length > 1) {
      cut = right - 1
      // Prefer the longest recognized consonant cluster at the next chunk's start.
      for (let size = Math.min(3, gap.length); size > 1; size -= 1) {
        if (onset.has(gap.slice(-size))) {
          cut = right - size
          break
        }
      }
    }
    // Apply every matching adjustment in order, allowing specific rules to override.
    adjustments.forEach(rule => {
      if (
        gap.length < rule.minGap ||
        (rule.maxGap !== undefined && gap.length > rule.maxGap) ||
        (rule.gap && !rule.gap.test(gap)) ||
        (rule.tail && !rule.tail.test(tail))
      ) {
        return
      }
      // Exact offsets replace the cut; minLeft only advances an earlier cut.
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

export default pickBoundaries
