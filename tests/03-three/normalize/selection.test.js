import test from 'tape'
import nlp from '../../lib/three.js'

const here = '[three/normalize/selection] '

test('normalize keeps replaced terms inside the selected view', t => {
  const doc = nlp('books are not')
  const result = doc.terms().map(word => word.normalize({ verbs: true }).text())
  t.deepEqual(result, ['books', 'be', 'not'], here + 'term iteration')
  t.equal(doc.text(), 'books be not', here + 'mutates the source document')
  t.end()
})

test('normalize tracks a selection when its word count changes', t => {
  const cases = [
    ['she was walking home', 'was walking', 'walk', 'she walk home'],
    ['she is not walking home', 'is not walking', 'does not walk', 'she does not walk home'],
    ['I have been walking home', 'have been walking', 'walk', 'I walk home'],
  ]
  cases.forEach(([text, match, expected, full]) => {
    const doc = nlp(text)
    const selected = doc.match(match)
    t.equal(selected.normalize({ verbs: true }), selected, here + 'same view returned')
    t.equal(selected.text(), expected, here + match)
    t.equal(doc.text(), full, here + 'surrounding terms preserved')
  })
  t.end()
})

test('normalize verbs preserves multiple selections and non-verbs', t => {
  const doc = nlp('she was walking home. He was running outside.')
  const selected = doc.match('was #Gerund')
  selected.normalize({ verbs: true })
  t.deepEqual(selected.out('array'), ['walk', 'run'], here + 'separate selections')
  t.equal(doc.text(), 'she walk home. He run outside.', here + 'both sentences preserved')

  const noun = nlp('the book is here').match('book')
  noun.normalize({ verbs: true })
  t.equal(noun.text(), 'book', here + 'no verbs')
  t.equal(nlp('').normalize({ verbs: true }).text(), '', here + 'empty document')
  t.end()
})
