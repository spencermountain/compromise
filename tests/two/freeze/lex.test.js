import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/freeze-lex] '

test('nonfrozen behaviour', function (t) {
  nlp.addWords({ 'shoe in': 'Noun', 'mr who': 'Person' })
  let doc = nlp('the mr who threw a shoe in the car.')
  t.ok(doc.has('mr #Preposition threw a #Noun'), here + 'default')
  t.end()
})

test('frozen behaviour', function (t) {
  nlp.addWords({ 'shoe in': 'Noun', 'mr who': 'Person' }, true)
  let doc = nlp('the mr who threw a shoe in the car.')
  t.ok(doc.has('#Person #Person threw a #Noun #Noun the car'), here + 'frozen')
  t.end()
})

test('addWords() frozen', function (t) {
  nlp.addWords({ 'dr which': 'Place', moose: 'Adverb' }, true)
  let doc = nlp('i saw dr. which on ice in Moose, Canada')
  t.equal(doc.has('saw #Place #Place on'), true, here)
  t.equal(doc.has('in #Adverb #Place$'), true, here)
  t.end()
})

test('freeze + tags', function (t) {
  nlp.addTags({ Diagnostic: { isA: 'Noun' } })
  nlp.addWords({ echo: 'Diagnostic', scan: 'Diagnostic' }, true)
  let doc = nlp(`she should have a further scan in a year.`)
  t.ok(doc.has('(scan && #Diagnostic)'), here + 'scan #1')
  doc = nlp('She went for a scan.')
  t.ok(doc.has('(scan && #Diagnostic)'), here + 'scan #2')

  doc = nlp('The plan is for a further echo in October.')
  t.ok(doc.has('(echo && #Diagnostic)'), here + 'echo #1')
  doc = nlp('He had an echo today.')
  t.ok(doc.has('(echo && #Diagnostic)'), here + 'echo #2')
  t.end()
})

test('more-lex', function (t) {
  nlp.addWords({ 'fast times at freddy': 'Cardinal' }, true)
  let doc = nlp('i saw fast times at freddy, on the weekend')

  t.equal(doc.has('i saw #Cardinal+ on'), true, here + 'is cardinal')
  t.equal(doc.has('(#Adjective|#Person)'), false, here + 'no person')

  let m = doc.match('fast times').freeze()
  doc.tag('Noun')
  doc.tag('ImdbTag')

  t.equal(m.has('#Noun'), false, here + 'no noun')
  t.equal(m.has('#ImdbTag'), true, here + 'has random tag')
  t.end()
})
