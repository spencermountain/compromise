import test from 'tape'
import nlp from './_lib.js'

test('true-positive', function (t) {
  let doc = nlp('i learned css')
  let res = doc.wikipedia().json()
  t.equal(res.length, 1, 'found-1 result')
  t.equal(res[0].text, 'css', 'found css result')

  doc = nlp('Melania Trump was trending')
  res = doc.wikipedia().json({ normal: true })
  t.equal(res[0].normal, 'melania trump', 'found trump result')

  t.end()
})

test('true-negative', function (t) {
  const doc = nlp('i learned the csss grid layout')
  const res = doc.wikipedia().json()
  t.equal(res.length, 0, 'found 0 results')
  t.end()
})