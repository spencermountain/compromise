const test = require('tape')
const nlp = require('../_lib')

test('participle/auxiliary toPast', function (t) {
  let doc = nlp('i am being driven')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i was driven', 'to-past1')

  doc = nlp('he has been stalking his prey')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he had been stalking his prey', 'to-past2')

  doc = nlp('she bit her tongue instead of criticizing her prom date')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'she bit her tongue instead of criticizing her prom date', 'to-past3')

  doc = nlp('he should have been eating')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he should have been eating', 'to-past4')

  t.end()
})
