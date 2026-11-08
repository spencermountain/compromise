const twoApostrophes = /^(.+)'(t|d|ll)'ve$/

// wouldn't've -> would not have,  i'd've -> i would have
const doubled = function (terms, i) {
  const m = terms[i].normal.match(twoApostrophes)
  if (m === null) {
    return null
  }
  const head = m[1]
  if (m[2] === 'd') {
    return [head, 'would', 'have']
  }
  if (m[2] === 'll') {
    return [head, 'will', 'have']
  }
  // n't've - but can't've, won't've
  if (head === 'can') {
    return ['can', 'not', 'have']
  }
  if (head === 'won') {
    return ['will', 'not', 'have']
  }
  return [head.replace(/n$/, ''), 'not', 'have']
}
export default doubled
