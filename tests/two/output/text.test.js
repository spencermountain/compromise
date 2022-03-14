import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/text] '

test('text-formats', function (t) {
  let doc = nlp(`Toronto's citizens LOVE toronto! they come here for food.`)
  t.equal(doc.text('normal'), `toronto's citizens love toronto! they come here for food.`, here + 'normal')
  t.end()
})

test('text(normal):', function (t) {
  let arr = [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    // ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    ['4', '4'],
    ['four', 'four'],
    ['john smith', 'john smith'],
    // ['Dr. John Smith-McDonald', 'dr john smith mcdonald'],
    ['Contains no fruit juice. \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).text('normal')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('text-text', function (t) {
  const str = `My dog LOVES pizza, and grapes!!`
  let doc = nlp(str)
  t.equal(doc.json({ text: true })[0].text, str, here + 'json(text)')
  t.equal(doc.text('text'), str, here + 'text(text): ')
  t.end()
})

test('text-normal', function (t) {
  let doc = nlp(`My dog LOVES pizza, and grapes!!`)
  const want = 'my dog loves pizza and grapes!'
  t.equal(doc.json({ normal: true })[0].normal, want, 'json(normal)')
  t.equal(doc.text('normal'), want, 'text(normal): ')
  // doc.normalize()
  // t.equal(doc.text('text'), str, 'normalize():  ')
  t.end()
})

test('text-reduced', function (t) {
  let doc = nlp(`My dog LOVES pizza, and grapes!!`)
  const want = 'my dog loves pizza and grapes'
  t.equal(doc.json({ reduced: true })[0].reduced, want, 'json(reduced)')
  // t.equal(doc.text('reduced'), want, 'text(reduced): ')
  // doc.normalize('reduced')
  // t.equal(doc.text('reduced'), str, 'normalize(reduced):  ')
  doc = nlp('Rälf.  ')
  t.equal(doc.text('reduced'), 'ralf.', 'reduced trim whitespace ')
  t.end()
})

test('text-implicit', function (t) {
  let doc = nlp(`My dog isn't good, he's the best!`)
  const want = 'My dog is not good, he is the best!'
  t.equal(doc.json({ implicit: true })[0].implicit, want, 'json(implicit)')
  t.equal(doc.text('implicit'), want, 'text(implicit): ')
  t.end()
})


test('text-machine', function (t) {
  let doc = nlp("he's just a tiny baby")
  t.equal(doc.text('machine'), 'he is just a tiny baby', here + 'machine contraction')
  t.end()
})

test('text-root', function (t) {
  let doc = nlp(`My dog LOVES pizza, and grapes...`)
  doc.compute('root')
  const want = 'my dog love pizza and grape'
  t.equal(doc.json({ root: true })[0].root, want, here + 'json(root)')
  t.equal(doc.text('root'), want, 'text(root): ')
  t.end()
})
