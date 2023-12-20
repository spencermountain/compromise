import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/freeze-lex] '

test('addWords() frozen', function (t) {
  nlp.addWords({ 'dr who': 'Place', moose: 'Adverb' }, true)
  let doc = nlp('i saw dr. who on ice in Moose, Canada')
  t.equal(doc.has('saw #Place #Place on'), true, here)
  t.equal(doc.has('in #Adverb #Place$'), true, here)
  t.end()
})

test('more-lex', function (t) {
  nlp.addWords({ 'fast times at freddy': 'Cardinal' }, true)
  let doc = nlp('i saw fast times at freddy, on the weekend')
  t.equal(doc.has('i saw #Cardinal+ on'), true, here + 'is cardinal')
  t.equal(doc.has('(#Adjective|#Person)'), false, here + 'no person')
  doc.tag('Noun')
  doc.tag('ImdbTag')
  let m = doc.match('fast times')
  t.equal(m.has('#Noun'), false, here + 'no noun')
  t.equal(m.has('#ImdbTag'), true, here + 'has random tag')
  t.end()
})
