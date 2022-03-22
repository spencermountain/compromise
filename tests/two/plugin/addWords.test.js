import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/addWords] '

test('persistent-lexicon-change', function (t) {
  let doc = nlp('he is marko')
  t.equal(doc.match('#Place+').length, 0, here + 'default-no-place')
  t.equal(doc.match('#Person+').length, 1, here + 'default-one-person')

  nlp.addWords({
    marko: 'Place',
  })
  doc = nlp('he is marko')
  t.equal(doc.match('#Place+').length, 1, here + 'now-one-place')
  t.equal(doc.match('#Person+').length, 0, here + 'now-no-person')

  nlp.addWords({
    foo: 'Place',
  })
  doc = nlp('he is marko')
  t.equal(doc.match('#Place+').length, 1, here + 'still-one-place')
  t.equal(doc.match('#Person+').length, 0, here + 'still-no-person')

  t.end()
})
