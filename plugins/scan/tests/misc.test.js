const test = require('tape')
const nlp = require('./_lib')

test('array-scan', function(t) {
  let doc = nlp('one two three four five. no here results.')
  let trie = nlp.buildTrie(['one', 'onety'])
  let res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'one', 'one result')

  trie = nlp.buildTrie(['two three', 'onety foo'])
  res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'two three', 'two three result')

  trie = nlp.buildTrie(['two three', 'four five', 'five six'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two results')

  trie = nlp.buildTrie(['two three four', 'four five six', 'five five', 'five'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two three-results')

  trie = nlp.buildTrie(['two three', 'two', 'seven', 'one', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 3, 'three results')

  trie = nlp.buildTrie(['twoe three', 'twsasdf so', 'sefven', 'onde', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 0, 'no results')

  t.end()
})

test('obj-scan', function(t) {
  let doc = nlp('one one two three four five.  here one result.')
  let trie = nlp.buildTrie({ two: 'Fun', here: 'Fun' })
  let res = doc.scan(trie)
  t.equal(res['Fun'].length, 2, 'two single results')

  doc = nlp('one one two three four five.  here one result.')
  trie = nlp.buildTrie({ one: 'One', 'not here': 'Missing' })
  res = doc.scan(trie)
  t.equal(res['One'].length, 3, 'three one results')
  t.equal(res['Missing'], undefined, 'no missing results')

  trie = nlp.buildTrie({})
  res = doc.scan(trie)
  t.equal(Object.keys(res).length, 0, 'no results')

  t.end()
})
