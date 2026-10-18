import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/misc/resume-context] '

test(here + 'resume-style developed clauses', t => {
  for (const text of [
    'Developed backend for real-time AI communication',
    'Developed scalable React architecture',
    'Developed React architecture',
  ]) {
    t.deepEqual(nlp(text).verbs().out('array'), ['Developed'], text)
  }
  t.equal(nlp('The backend is ready').match('backend').has('#Noun'), true, 'backend noun')
  t.equal(
    nlp('Developed countries have strong economies').match('Developed').has('#Adjective'),
    true,
    'adjectival developed'
  )
  t.equal(nlp('A developed economy is stable').match('developed').has('#Adjective'), true, 'attributive developed')
  t.end()
})
