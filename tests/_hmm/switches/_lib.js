import nlp from '../../02-two/lib.js'

const assertNoOverlap = (t, spec, here, patterns) => {
  const overlaps = []
  spec.split('\n').forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) {
      return
    }
    // strip a trailing '{...}' annotation; line is already trimmed
    const text = line.replace(/\{[^{}]*\}\s*$/, '').trimEnd()
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
