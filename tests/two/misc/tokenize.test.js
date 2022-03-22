import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/tokenize] '

test('em-dash, en-dash', function (t) {
  // '-':  //dash
  // '–':  //en-dash
  // '—':  //em-dash
  let doc = nlp('fun-time')
  t.equal(doc.terms().length, 2, here + 'dash')
  doc = nlp('fun–time')
  t.equal(doc.terms().length, 2, here + 'en-dash')
  doc = nlp('fun—time')
  t.equal(doc.terms().length, 2, here + 'em-dash')

  //not a full word, either
  doc = nlp('fun - time')
  t.equal(doc.terms().length, 2, here + 'dash-word')
  doc = nlp('fun – time')
  t.equal(doc.terms().length, 2, here + 'en-dash-word')
  doc = nlp('fun — time')
  t.equal(doc.terms().length, 2, here + 'em-dash-word')

  //numeric forms are split, but contractions too
  doc = nlp('20-20')
  t.equal(doc.terms().length, 3, here + 'dash-num')
  doc = nlp('20–20')
  t.equal(doc.terms().length, 3, here + 'en-dash-num')
  doc = nlp('20—20')
  t.equal(doc.terms().length, 3, here + 'em-dash-num')

  doc = nlp('79-years-old')
  t.equal(doc.terms().length, 3, here + 'x-years-old')

  t.end()
})

test('emoji-only sentence', function (t) {
  let doc = nlp('good night! 💋')
  t.equal(doc.length, 2, here + 'boemojith sentence')
  t.end()
})
