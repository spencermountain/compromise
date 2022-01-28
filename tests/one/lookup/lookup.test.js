import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/lookup] '

test('lookup-basic', function (t) {
  let doc = nlp('one two three four five. no here results.')
  let trie = nlp.compile(['one', 'onety'])
  let res = doc.lookup(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'one', here + 'one result')

  trie = nlp.compile(['two three', 'onety foo'])
  res = doc.lookup(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'two three', here + 'two three result')

  trie = nlp.compile(['two three', 'four five', 'five six'])
  res = doc.lookup(trie).json()
  t.equal(res.length, 2, here + 'two results')

  trie = nlp.compile(['two three four', 'four five six', 'five five', 'five'])
  res = doc.lookup(trie).json()
  t.equal(res.length, 2, here + 'two three-results')

  trie = nlp.compile(['two three', 'two', 'seven', 'one', 'onety', 'eleventy eight'])
  res = doc.lookup(trie)
  t.equal(res.length, 2, here + 'no-dupe results')

  trie = nlp.compile(['twoe three', 'twsasdf so', 'sefven', 'onde', 'onety', 'eleventy eight'])
  res = doc.lookup(trie)
  t.equal(res.length, 0, here + 'no results')

  t.end()
})


test('lookup-tricky', function (t) {
  let doc = nlp('one two three four five. no here results.')
  let res = doc.lookup(['zero one two'])
  t.equal(res.found, false, here + 'left-miss')

  res = doc.lookup(['four five six'])
  t.equal(res.found, false, here + 'right-miss')

  res = doc.lookup(['one three'])
  t.equal(res.found, false, here + 'skip-miss')

  res = doc.lookup(['five four'])
  t.equal(res.found, false, here + 'backwards-miss')

  res = doc.lookup(['five no'])
  t.equal(res.found, false, here + 'sentence-miss')

  t.end()
})

test('lookup-dupes', function (t) {
  let trie = nlp.compile([`Toronto`, `Toronto Rangers`])
  let res = nlp('toronto rangers').lookup(trie)
  t.equal(res.length, 1, here + 'no-sub-matches')
  t.end()
})

test('lookup-repeat', function (t) {
  let trie = nlp.compile([
    `Toronto`,
    `Toronto Toronto`,
    `Toronto Rangers`,
  ])
  let res = nlp('one two tornado rangers').lookup(trie)
  t.equal(res.length, 0, here + 'repeat-miss')

  res = nlp('toronto toronto').lookup(trie)
  t.equal(res.length, 1, here + 'repeat-on')
  res = nlp('toronto rangers').lookup(trie)
  t.equal(res.length, 1, here + 'repeat-off')
  res = nlp('toronto').lookup(trie)
  t.equal(res.length, 1, here + 'repeat-single')
  t.end()
})


test('lookup-fallback', function (t) {
  let trie = nlp.compile(['a b c d e f', 'a b'])
  let doc = nlp('one two a b three')
  let res = doc.lookup(trie)
  t.equal(res.text(), 'a b', here + 'fallback-pass')

  trie = nlp.compile(['a a a', 'a a b'])
  doc = nlp('one two three. a a b')
  res = doc.lookup(trie)
  t.equal(res.text(), 'a a b', here + 'fallback-double-pass')

  trie = nlp.compile(['a a a', 'a a b'])
  doc = nlp('one two three. a a c')
  res = doc.lookup(trie)
  t.equal(res.text(), '', here + 'fallback-double-fail')

  trie = nlp.compile(['a b c d e f', 'a b c'])
  doc = nlp('one two three. a b')
  res = doc.lookup(trie)
  t.equal(res.text(), '', here + 'fallback-fail')

  t.end()
})


test('lookup-input', function (t) {
  let doc = nlp('captain of the football team.')
  let res = doc.lookup('')
  t.equal(res.text(), '', here + 'none-input')

  res = doc.lookup('football team')
  t.equal(res.text(), 'football team', here + 'string-input')

  res = doc.lookup(['team', 'team'])
  t.equal(res.text(), 'team', here + 'dupe-input')

  res = doc.lookup([' team ', '  '])
  t.equal(res.text(), 'team', here + 'whitespace-input')
  t.end()
})

test('lookup-reserved', function (t) {
  let arr = [
    "Brian Vollmer",
    "Brian Wansink",
    "Brice Marden",
    "Brideless Groom",
    "Bridge Constructor Portal",
    "Bridge Protocol Data Unit",
    "Bridget Kearney",
    "Bridget Malcolm",
    "Bridgewater State University",
    "Bridie",
  ]
  let trie = nlp.compile(arr)
  let res = nlp('before Bridge Constructor Portal after').lookup(trie)
  t.equal(res.found, true, 'found-reserved-word')
  t.end()
})


test('lookup no-contractions', function (t) {
  let arr = [
    'foobar',
    'marines',
    'afghanistan',
    'foo',
  ]
  let trie = nlp.compile(arr)
  let res = nlp(`so we're adding 3201 Marines to our forces in Afghanistan.`).lookup(trie)
  t.equal(res.has('marines'), true, 'no-contraction got first one')
  t.equal(res.has('afghanistan'), true, 'no-contraction got first one')
  t.end()
})



// test('obj-scan', function(t) {
//   let doc = nlp('one one two three four five.  here one result.')
//   let trie = nlp.compile({ two: 'Fun', here: 'Fun' })
//   let res = doc.lookup(trie)
//   t.equal(res['Fun'].length, 2, 'two single results')

//   doc = nlp('one one two three four five.  here one result.')
//   trie = nlp.compile({ one: 'One', 'not here': 'Missing' })
//   res = doc.lookup(trie)
//   t.equal(res['One'].length, 3, 'three one results')
//   t.equal(res['Missing'], undefined, 'no missing results')

//   trie = nlp.compile({})
//   res = doc.lookup(trie)
//   t.equal(Object.keys(res).length, 0, 'no results')

//   t.end()
// })
