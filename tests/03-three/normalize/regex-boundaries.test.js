import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/normalize/regex-boundaries] '

test(here + 'generated punctuation contexts are stable when normalized', t => {
  const normalizationFailures = []
  for (const infix of ['.', '...', ',', '!', '?', '-', '😀']) {
    for (const ending of ['', '.', '!!!', '…', ')']) {
      const text = `("AlPhA${infix}BeTa${ending}`
      const expected = `alpha${infix}beta`
      const doc = nlp(text)
      const normals = doc.json().flatMap(sentence => sentence.terms.map(term => term.normal))
      doc.normalize()
      const normalized = doc.text()
      doc.normalize()
      if (normals.length !== 1 || normals[0] !== expected || doc.text() !== normalized) {
        normalizationFailures.push({ text, expected, normals, normalized, repeated: doc.text() })
      }
    }
  }
  t.deepEqual(
    normalizationFailures,
    [],
    'term normals preserve internal punctuation and document normalization is idempotent'
  )
  t.end()
})
