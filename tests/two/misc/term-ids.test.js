import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/term-ids] '

let txt = `The hours have passed like stones being pushed up a mountain. For all of the luxury that surrounds us, I can't shake this feeling of unease that's slowly creeping in through the back of my mind. I can tell that Johna and Temmy have noticed it as well—it's just something about the air here that makes me uneasy. Joanna feigns disinterest but behind her shades she's studying the surroundings like the seasoned detective she is.`

test('term-id validation', function (t) {
  txt = txt.repeat(4)
  const doc = nlp(txt)
  const badTerm = []
  const already = {}
  let words = 0
  // ensure they all have ids
  doc.docs.forEach(terms => {
    terms.forEach(term => {
      words += 1
      if (!term.id) {
        badTerm.push(term)
      }
      // collisions should be very unlikely
      if (already[term.id]) {
        badTerm.push(term)
      }
      already[term.id] = true
    })
  })
  // if (badTerm.length) {
  //   console.log('dupe terms:', badTerm)
  // }
  t.equal(badTerm.length, 0, here + 'terms have unique-ids')
  const terms = doc.terms()
  t.equal(terms.length, words, here + 'right term count')

  t.equal(terms.ptrs.length, words, here + 'right pointer count')
  t.end()
})

test('term-id validation', function (t) {
  const text = (txt + '\n').repeat(50)
  const doc = nlp(text)
  let m = doc.terms()
  const max = m.length
  m = m.not('#Pronoun')
  m = m.not('#Preposition')
  m = m.not('#Conjunction')
  m = m.not('#Determiner')
  t.equal(m.length < max, true, here + ' no .not() memleak')
  t.end()
})