const test = require('tape')
const nlp = require('./_lib')

test('root', function(t) {
  let doc = nlp(`A priest walked into the bars.`)
  doc.cache({ root: true })
  t.equal(doc.match('~walk~ into').found, true, 'found infinitive')
  t.equal(doc.match('~bar~').found, true, 'found singular')
  t.equal(doc.text('root'), 'a priest walk into the bar.', 'root-output')
  t.end()
})
