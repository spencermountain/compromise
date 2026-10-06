import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/misc/heading-context] '

test('gerunds after a heading colon', t => {
  for (const word of ['creating', 'Creating', 'Building', 'Writing']) {
    const doc = nlp(`Tutorial: ${word} a cake`)
    t.equal(doc.match('#Gerund').text(), word, word)
  }
  t.equal(nlp('Destination: Reading').has('#Gerund'), false, here + 'keep place names')
  t.end()
})
