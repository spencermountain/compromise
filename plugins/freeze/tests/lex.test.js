import test from 'tape'
import nlp from './_lib.js'
const here = '[two/freeze-lex]'

test('addWords() frozen', function (t) {
  nlp.addWords({ 'dr who': 'Place', moose: 'Adverb' }, true)
  let doc = nlp('i saw dr. who on ice in Moose, Canada')
  t.equal(doc.has('saw #Place #Place on'), true, here)
  t.equal(doc.has('in #Adverb #Place$'), true, here)
  t.end()
})
