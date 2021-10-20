import test from 'tape'
import nlp from './_lib.js'
const here = '[three/misc] '

test('full-sentence-issue', function (t) {
  let doc = nlp(`Images of death have lost shock value`)
  doc.ptrs = [[0], [0]]
  t.equal(doc.questions().found, false, here + 'no questions')
  t.equal(doc.length, 2, here + '2 matches')
  t.equal(doc.sentences().length, 2, here + '2 sentences')
  doc.unique()
  t.equal(doc.sentences().length, 2, here + 'still 2')
  doc = doc.unique()
  t.equal(doc.sentences().length, 1, here + '1 unique sentence')
  t.end()
})


test('test overloading', function (t) {
  let doc = nlp(`the 7 days since december were gross`)

  let m = doc.verbs()
  t.ok(m.json(), 'overload-verb')
  t.equal(m.eq(0).viewType, 'Verbs', 'still-is-verb')

  m = doc.nouns()
  t.ok(m.json(), 'overload-nouns')
  t.equal(m.eq(0).viewType, 'Nouns', 'still-is-nouns')

  m = doc.numbers()
  t.ok(m.json(), 'overload-numbers')
  t.equal(m.eq(0).viewType, 'Numbers', 'still-is-numbers')

  m = doc.sentences()
  t.ok(m.json(), 'overload-sentences')
  t.equal(m.eq(0).viewType, 'Sentences', 'still-is-sentences')

  m = doc.people()
  t.ok(m.json(), 'overload-people')
  t.equal(m.eq(0).viewType, 'People', 'still-is-people')

  // m = doc.places()
  // t.ok(m.json(), 'overload-places')
  // t.equal(m.eq(0).viewType, 'Places', 'still-is-places')

  t.end()
})
