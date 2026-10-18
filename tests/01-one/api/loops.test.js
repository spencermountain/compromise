import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/api/loops] '

test(here + 'map returns matches from each sentence', function (t) {
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

test(here + 'forEach transforms every sentence', function (t) {
  const doc = nlp('one two three. three four five.').forEach(p => {
    p.toUpperCase()
  })
  t.equal(doc.out('text'), 'ONE TWO THREE. THREE FOUR FIVE.', here + 'foreach-uppercase')
  t.end()
})

test(here + 'filter selects matching sentences and terms', function (t) {
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

test(here + 'find returns a matching or empty selection', function (t) {
  let doc = nlp('one two three. three four five.').find(m => m.has('four'))
  t.equal(doc.out('normal'), 'three four five.', here + 'found four')

  doc = nlp('one two three. three four five.').find(m => m.has('asdf'))
  t.equal(doc.found, false, here + 'empty find result')
  t.end()
})

test(here + 'some reports whether a sentence matches', function (t) {
  let bool = nlp('one two three. three four five.').some(m => m.has('three'))
  t.equal(bool, true, here + 'found-three')

  bool = nlp('one two three. three four five.').some(m => m.has('asdf'))
  t.equal(bool, false, here + 'not-found')
  t.end()
})

test(here + 'map returns an array of text values', function (t) {
  const doc = nlp('Larry, Curly, and Moe')
  let people = doc.match('!and') // (any one noun)
  people = people.sort('alpha')
  const arr = people.map(d => d.text('normal'))
  t.deepEqual(arr, ['curly', 'larry', 'moe'], here + 'got array in response')
  t.end()
})
