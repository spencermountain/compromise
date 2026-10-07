import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/match/parsed-patterns] '

test(here + 'matching respects edits to parsed patterns', t => {
  const doc = nlp('red blue')
  const pattern = nlp.parseMatch('green red blue')
  t.equal(doc.match(pattern).found, false, 'required prefix is missing')
  pattern[0].optional = true
  t.equal(doc.match(pattern).text(), 'red blue', 'prefix can become optional')
  pattern[0].optional = false
  t.equal(doc.match(pattern).found, false, 'prefix can become required again')
  t.end()
})
