const test = require('tape')
const nlp = require('./_lib')

test('foreach replace', function (t) {
  let doc = nlp('guns and roses')
  doc.match('guns').forEach(p => {
    p.replaceWith('flowers')
  })
  t.equal(doc.text(), 'flowers and roses', 'simple loop-replace')

  doc = nlp('guns and roses. roses and guns')
  doc.match('guns').forEach(p => {
    p.replaceWith('flowers')
  })
  t.equal(doc.text(), 'flowers and roses. roses and flowers', 'two loop-replacements')

  doc = nlp('guns and roses')
  doc.match('guns').forEach(p => {
    p.replaceWith('flowers, kittens')
  })
  t.equal(doc.text(), 'flowers, kittens and roses', 'loop-replace-grow')

  doc = nlp('guns, bombs, and roses')
  doc.match('guns bombs').forEach(p => {
    p.replaceWith('flowers')
  })
  t.equal(doc.text(), 'flowers, and roses', 'loop-replace-shrink')

  doc = nlp('the end')
  doc.match('end').forEach(p => {
    p.replaceWith('more words')
  })
  t.equal(doc.text(), 'the more words', 'loop-replace-expand-end')

  t.end()
})
