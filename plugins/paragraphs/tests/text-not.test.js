import test from 'tape'
import nlp from './_lib.js'
const here = '[paragraph/text-not] '

test('paragraph-text', function (t) {
  const str = 'One cat. Two dogs.\n\nThree birds.\n\nFour fish.'
  const doc = nlp(str).paragraphs()

  t.equal(doc.text(), str, here + 'blank line between paragraphs')
  t.equal(doc.eq(1).text(), 'Three birds.', here + 'one paragraph')
  t.equal(doc.ifNo('birds').text(), 'One cat. Two dogs.\n\nFour fish.', here + 'filtered paragraphs')
  t.equal(doc.text('normal'), 'one cat. two dogs.\n\nthree birds.\n\nfour fish.', here + 'format is passed along')
  t.equal(doc.if('zebra').text(), '', here + 'empty selection')

  // uneven spacing becomes one blank line - .sentences().text() keeps the original
  const spaced = 'One cat.  \n\n\nTwo dogs.\n'
  t.equal(nlp(spaced).paragraphs().text(), 'One cat.\n\nTwo dogs.', here + 'normalized spacing')
  t.equal(nlp(spaced).paragraphs().sentences().text(), spaced, here + 'original spacing')
  t.end()
})

test('paragraph-text-map', function (t) {
  const str = 'One cat.\n\nThree birds.\n\nFour fish.'
  const doc = nlp(str).paragraphs()

  // mapped views may be on their own document
  const upper = doc.map(p => p.clone().toUpperCase())
  t.equal(upper.text(), 'ONE CAT.\n\nTHREE BIRDS.\n\nFOUR FISH.', here + 'cloned paragraphs')
  t.equal(doc.text(), str, here + 'original is unchanged')

  // no extra gap for a paragraph with no text
  const some = doc.map(p => p.match('(cat|fish)'))
  t.equal(some.text(), 'cat\n\nfish', here + 'skips empty paragraphs')
  t.end()
})

test('paragraph-not', function (t) {
  const str = 'One red cat. Two blue dogs.\n\nThree green birds.'
  const doc = nlp(str).paragraphs()

  const m = doc.not('cat')
  t.equal(m.has('cat'), false, here + 'removes the match')
  t.equal(m.has('dogs'), true, here + 'keeps the same sentence')
  t.equal(m.has('birds'), true, here + 'keeps other paragraphs')
  t.equal(m.text(), nlp(str).not('cat').text(), here + 'same as view.not()')

  t.equal(doc.not('three green birds').has('birds'), false, here + 'removes a whole paragraph')
  t.equal(doc.not('zebra').text(), nlp(str).text(), here + 'no match keeps everything')
  t.equal(doc.not('.').found, false, here + 'can remove everything')
  t.equal(doc.text(), str, here + 'original is unchanged')
  t.end()
})
