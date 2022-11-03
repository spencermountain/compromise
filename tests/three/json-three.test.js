import test from 'tape'
import nlp from './_lib.js'
const here = '[three/json] '


test('view-json', function (t) {
  let doc = nlp('i walk and swim gracefully')
  let json = doc.json({ normal: true })
  t.ok(json[0].normal, here + 'view-opts')
  // json = doc.json(0)
  // t.ok(json.length, 1, here + 'view-num')
  t.end()
})

test('verbs-json', function (t) {
  let doc = nlp('i walk and swim gracefully')
  let json = doc.verbs().json({ normal: true })
  t.ok(json[0].normal, here + 'verbs-opts')
  json = doc.verbs().json(0)
  t.ok(json.length, 1, here + 'verbs-num')
  t.end()
})

test('nouns-json', function (t) {
  let doc = nlp('i eat carrots and cabbage')
  let json = doc.nouns().json({ normal: true })
  t.ok(json[0].normal, here + 'nouns-opts')
  json = doc.nouns().json(0)
  t.ok(json.length, 1, here + 'nouns-num')
  t.end()
})

test('sentences-json', function (t) {
  let doc = nlp('i eat. i swim')
  let json = doc.sentences().json({ normal: true })
  t.ok(json[0].normal, here + 'sentences-opts')
  json = doc.sentences().json(0)
  t.ok(json.length, 1, here + 'sentences-num')
  t.end()
})

test('numbers-json', function (t) {
  let doc = nlp('4 books, 12 authors')
  let json = doc.numbers().json({ normal: true })
  t.ok(json[0].normal, here + 'numbers-opts')
  json = doc.numbers().json(0)
  t.ok(json.length, 1, here + 'numbers-num')
  t.end()
})

test('people-json', function (t) {
  let doc = nlp('john and jim eat candy')
  let json = doc.people().json({ normal: true })
  t.ok(json[0].normal, here + 'person-opts')

  json = doc.people().json(0)
  t.equal(json.length, 1, here + 'person-num')
  t.end()
})

test('places-json', function (t) {
  let doc = nlp('i saw paris and london')
  let json = doc.places().json({ normal: true })
  t.ok(json[0].normal, here + 'places-opts')

  // json = doc.places().json(0)
  // t.equal(json.length, 1, here + 'places-num')
  t.end()
})

