import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/misc] '

test('non-coercive-lex', function (t) {
  let doc = nlp('the Spencer Kelly', { kelly: 'Verb' })
  t.equal(doc.has('#Verb'), false, here + 'still a person')

  doc = nlp('i kelly', { kelly: 'Verb' })
  t.equal(doc.has('#Verb'), true, here + 'now coerced')

  doc = nlp('the  Kelly', { kelly: 'Verb' })
  t.equal(doc.has('#ProperNoun'), true, here + 'titlecase')
  t.end()
})
