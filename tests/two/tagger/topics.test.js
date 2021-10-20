import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/topics] '

test('proper-nouns', function (t) {
  const arr = [
    ['I met John Smith in Toronto', ['John Smith', 'Toronto']],
    ['Toronto and Vancouver Canada', ['Toronto', 'Vancouver Canada']],
    // ['we ate shellfish at 23 Main st.', []],
    ['google is suing motorola inc', ['google', 'motorola inc']],
    ['the doctor and his brother see the mayor of france', ['france']],
  ]
  arr.forEach(a => {
    const out = nlp(a[0]).match('#ProperNoun+').out('array')
    t.deepEqual(out, a[1], here + a[0])
  })
  t.end()
})

//after we change pos, untag propernoun
test('remove-proper-nouns', function (t) {
  const doc = nlp('do what Theresa May')
  t.equal(doc.match('may').has('#ProperNoun'), true, here + 'propernoun-init')
  doc.match('may').tag('Verb')
  t.equal(doc.match('may').has('#ProperNoun'), false, here + 'propernoun-missing')
  t.end()
})
