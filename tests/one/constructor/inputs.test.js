import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/inputs] '

test('doc-as-input :', function (t) {
  const txt = `yeah. one two. match three.`
  let a = nlp(txt)
  let b = nlp(a)
  t.equal(b.text(), txt, here + 'doc as input')

  a = nlp(txt).match('match')
  b = nlp(a)
  t.equal(b.text(), 'match', here + 'passed pointer')
  t.equal(b.all().text(), txt, here + 'got whole document')
  t.end()
})

test('empty-inputs :', function (t) {
  t.equal(nlp(null).text(), '', here + 'null input')
  t.equal(nlp(undefined).text(), '', here + 'undefined input')
  t.equal(nlp([]).text(), '', here + 'empty array input')
  t.equal(nlp({}).text(), '', here + 'empty obj input')
  t.equal(nlp('').text(), '', here + 'empty string input')
  // nullish / problematic
  t.equal(nlp('0').text(), '0', here + '0 string input')
  t.equal(nlp(0).text(), '0', here + '0 num input')
  t.equal(nlp('null').text(), 'null', here + 'null string input')
  t.equal(nlp('undefined').text(), 'undefined', here + 'undefined string input')
  t.equal(nlp('[]').text(), '[]', here + 'empty array string input')
  t.equal(nlp('{}').text(), '{}', here + 'empty obj string input')
  t.equal(nlp('constructor').text(), 'constructor', here + 'constructor string input')
  t.equal(nlp('prototype').text(), 'prototype', here + 'prototype string input')
  t.end()
})

test('json-input :', function (t) {
  let json = nlp('').json()
  t.equal(nlp(json).text(), '', here + 'empty json input')

  json = nlp('one two three').json()
  t.equal(nlp(json).text(), 'one two three', here + 'one sentence json input')

  json = nlp('one two. three four, five').json()
  t.equal(nlp(json).text(), 'one two. three four, five', here + 'two sentence json input')

  // ensure tags passthrough
  const doc = nlp('one two match three')
  doc.match('match').tag('Foo')
  json = doc.json()
  const b = nlp(json)
  t.equal(b.has('#Foo'), true, here + 'tag-from-json')

  t.end()
})

test('pre-tokenized-input :', function (t) {
  const input = [['one', 'two', 'three'], ['four']]
  const doc = nlp(input)
  t.equal(doc.eq(0).text(), 'one two three', here + 'first-sentence')
  t.equal(doc.eq(1).text(), 'four', here + '2nd-sentence')
  t.end()
})