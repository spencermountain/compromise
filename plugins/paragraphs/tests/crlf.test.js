import test from 'tape'
import nlp from './_lib.js'
const here = '[paragraph/crlf] '

test('paragraphs split on windows line endings', function (t) {
  const lf = 'First one here.\n\nSecond one here.\n\nThird one.'
  const crlf = lf.replace(/\n/g, '\r\n')
  const doc = nlp(crlf).paragraphs()
  t.equal(doc.length, nlp(lf).paragraphs().length, here + 'same count as lf')
  t.equal(doc.length, 3, here + 'three paragraphs')
  t.equal(doc.eq(1).text(), 'Second one here.', here + 'middle paragraph text')
  t.equal(nlp('One here.\r\nTwo here.').paragraphs().length, 1, here + 'single crlf is not a break')
  t.end()
})
