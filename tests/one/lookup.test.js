import test from 'tape'
import nlp from './_lib.js'
const here = '[one/lookup] '

test('array-scan', function (t) {
  let doc = nlp('one two three four five. no here results.')
  let trie = nlp.compile(['one', 'onety'])
  let res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'one', 'one result')

  trie = nlp.compile(['two three', 'onety foo'])
  res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'two three', 'two three result')

  trie = nlp.compile(['two three', 'four five', 'five six'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two results')

  trie = nlp.compile(['two three four', 'four five six', 'five five', 'five'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two three-results')

  trie = nlp.compile(['two three', 'two', 'seven', 'one', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 3, 'three results')

  trie = nlp.compile(['twoe three', 'twsasdf so', 'sefven', 'onde', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 0, 'no results')

  t.end()
})

// test('obj-scan', function(t) {
//   let doc = nlp('one one two three four five.  here one result.')
//   let trie = nlp.compile({ two: 'Fun', here: 'Fun' })
//   let res = doc.scan(trie)
//   t.equal(res['Fun'].length, 2, 'two single results')

//   doc = nlp('one one two three four five.  here one result.')
//   trie = nlp.compile({ one: 'One', 'not here': 'Missing' })
//   res = doc.scan(trie)
//   t.equal(res['One'].length, 3, 'three one results')
//   t.equal(res['Missing'], undefined, 'no missing results')

//   trie = nlp.compile({})
//   res = doc.scan(trie)
//   t.equal(Object.keys(res).length, 0, 'no results')

//   t.end()
// })
