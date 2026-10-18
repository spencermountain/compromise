import { vowel, ignored, separate, joined } from './vowels.js'

// Mark pronounced vowel groups before choosing any consonant boundaries.
const vowelSpan = word => {
  const silent = new Set()
  ignored.forEach(rule => {
    if (!rule.except || !rule.except.test(word)) {
      for (const match of word.matchAll(rule.match)) {
        silent.add(match.index + rule.offset)
      }
    }
  })
  const breaks = new Set()
  separate.forEach(pattern => {
    const match = pattern.exec(word)
    if (match) {
      breaks.add(match.index + match[0].length)
    }
  })
  const groups = []
  for (let i = 0; i < word.length; i += 1) {
    if (!vowel.test(word[i]) || silent.has(i)) {
      continue
    }
    const previous = groups[groups.length - 1]
    const blended =
      previous &&
      previous.end === i &&
      !breaks.has(i) &&
      joined.some(rule => rule.match.test(word.slice(Math.max(0, i - rule.before), i + rule.after)))
    if (blended) {
      previous.end = i + 1
    } else {
      groups.push({ start: i, end: i + 1 })
    }
  }
  return groups
}

export default vowelSpan
