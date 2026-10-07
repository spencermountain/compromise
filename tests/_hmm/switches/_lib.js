import nlp from '../../lib/two.js'

const assertNoOverlap = (t, spec, here, patterns) => {
  const overlaps = []
  spec.split('\n').forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) {
      return
    }
    const text = line.replace(/\s*\{[^{}]*\}\s*$/, '')
    const doc = nlp(text)
    patterns.forEach(pattern => {
      const match = doc.match(pattern)
      if (match.found) {
        overlaps.push({ text, pattern, terms: match.out('array') })
      }
    })
  })
  t.deepEqual(overlaps, [], here + 'no incompatible double tags')
}

export default assertNoOverlap
