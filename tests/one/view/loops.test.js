import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/loops] '

test('map-stuff', function (t) {
  // let doc = nlp('and').map(d => {
  //   return d.replaceWith('or')
  // })
  // t.equal(doc.text(), 'or', 'replace-with')

  const doc = nlp('one two three. three four five.').map(d => {
    return d.match('three')
  })
  t.equal(doc.eq(0).text(), 'three', here + 'match-one')
  t.equal(doc.eq(1).text(), 'three', here + 'match-two')

  t.end()
})

test('foreach-stuff', function (t) {
  const doc = nlp('one two three. three four five.').forEach(p => {
    p.toUpperCase()
  })
  t.equal(doc.out('text'), 'ONE TWO THREE. THREE FOUR FIVE.', here + 'foreach-uppercase')
  t.end()
})

test('filter-stuff', function (t) {
  let doc = nlp('one two three. three four five.').filter(p => {
    return p.has('four')
  })
  t.equal(doc.out('normal'), 'three four five.', here + 'filter-has')

  doc = nlp('one two three. three four five.')
    .terms()
    .filter(p => {
      return p.has('four')
    })
  t.equal(doc.out('normal'), 'four', here + 'filter-four')

  doc = nlp('one two three. three four five.')
    .terms()
    .filter(p => {
      return p.has('asdf')
    })
  t.equal(doc.out('normal'), '', here + 'empty-filter')
  t.end()
})

test('find-stuff', function (t) {
  let doc = nlp('one two three. three four five.').find(m => m.has('four'))
  t.equal(doc && doc.out('normal') === 'three four five.', true, here + 'found four')

  doc = nlp('one two three. three four five.').find(m => m.has('asdf'))
  t.equal(doc.found, false, here + 'undefined find result') //change?!
  t.end()
})

test('some-stuff', function (t) {
  let bool = nlp('one two three. three four five.').some(m => m.has('three'))
  t.equal(bool, true, here + 'found-three')

  bool = nlp('one two three. three four five.').some(m => m.has('asdf'))
  t.equal(bool, false, here + 'not-found')
  t.end()
})

test('map array return', function (t) {
  const doc = nlp('Larry, Curly, and Moe')
  let people = doc.match('!and') // (any one noun)
  people = people.sort('alpha')
  const arr = people.map(d => d.text('normal'))
  t.deepEqual(arr, ['curly', 'larry', 'moe'], here + 'got array in response')
  t.end()
})
