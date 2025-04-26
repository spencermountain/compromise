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

test('apostrophe lexicon:', function (t) {
  const lex = {
    'queen anne\'s lace': 'Flower',
    'applebee\'s': 'Restaurant'
  }
  let doc = nlp(`i went to applebee's for dinner`, lex)
  t.equal(doc.has(`#Restaurant`), true, here + 'lexicon w/ apostrophe')

  doc = nlp(`Queen Anne's lace`, lex)
  t.equal(doc.has(`#Flower`), true, here + 'multi lexicon w/ apostrophe')
  t.end()
})