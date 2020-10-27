const test = require('tape')
const nlp = require('./_lib')

test('map-stuff', function (t) {
  let doc = nlp('and').map(d => {
    return d.replaceWith('or')
  })
  t.equal(doc.text(), 'or', 'replace-with')

  doc = nlp('one two three. three four five.').map(d => {
    return d.match('three')
  })
  t.equal(doc.eq(0).text(), 'three', 'match-one')
  t.equal(doc.eq(1).text(), 'three', 'match-two')

  t.end()
})

test('foreach-stuff', function (t) {
  let doc = nlp('one two three. three four five.').forEach(p => {
    p.toUpperCase()
  })
  t.equal(doc.out('text'), 'ONE TWO THREE. THREE FOUR FIVE.', 'foreach-uppercase')
  t.end()
})

test('filter-stuff', function (t) {
  let doc = nlp('one two three. three four five.').filter(p => {
    return p.has('four')
  })
  t.equal(doc.out('normal'), 'three four five.', 'filter-has')

  doc = nlp('one two three. three four five.')
    .terms()
    .filter(p => {
      return p.has('four')
    })
  t.equal(doc.out('normal'), 'four', 'filter-four')

  doc = nlp('one two three. three four five.')
    .terms()
    .filter(p => {
      return p.has('asdf')
    })
  t.equal(doc.out('normal'), '', 'empty-filter')
  t.end()
})

test('find-stuff', function (t) {
  let doc = nlp('one two three. three four five.').find(m => m.has('four'))
  t.equal(doc && doc.out('normal') === 'three four five.', true, 'found four')

  doc = nlp('one two three. three four five.').find(m => m.has('asdf'))
  t.equal(doc, undefined, 'undefined find result')
  t.end()
})

test('some-stuff', function (t) {
  let bool = nlp('one two three. three four five.').some(m => m.has('three'))
  t.equal(bool, true, 'found-three')

  bool = nlp('one two three. three four five.').some(m => m.has('asdf'))
  t.equal(bool, false, 'not-found')
  t.end()
})

test('map array return', function (t) {
  let doc = nlp('Larry, Curly, and Moe')
  let people = doc.match('#Noun') // (any one noun)
  people.sort('alpha')
  let arr = people.map(d => d.text('normal'))
  t.deepEqual(arr, ['curly, ', 'larry, ', 'moe'], 'got array in response')
  t.end()
})
