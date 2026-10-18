import test from 'tape'
import nlp from '../lib/three.js'
const here = '[ignored/redact-tag] '

// Deferred: The custom redaction marker is not returned consistently for every tagged selection.
test(here + 'redact-tag:', function (t) {
  const doc = nlp('john smith and Doug Johnson live in new york and cook at the restaurant').redact({}, '███')
  const m = doc.match('#Redacted')
  t.equal(m.length, 3, here + 'redacted tags')
  m.forEach((match, i) => {
    t.equal(match.text(), '███', here + `redacted ${i + 1} text`)
  })
  t.end()
})
