import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/soft-match] '

test('soft-match', function (t) {
  const doc = nlp(`a priest walked into the bars`)
  doc.compute('root')
  t.equal(doc.match('bars').found, true, here + 'found bars')
  t.equal(doc.match('bar').found, false, here + 'missed bar without ~')
  t.equal(doc.match('~bars~').found, true, here + 'found ~ bars')
  t.equal(doc.match('~bar~').found, true, here + 'found ~ bar')
  t.equal(doc.match('~walk~ into').found, true, here + 'found infinitive')
  t.equal(doc.match('~bar~').found, true, here + 'found singular')
  t.equal(doc.text('root'), 'a priest walk into the bar', here + 'root-output')
  t.end()
})
