const test = require('tape')
const nlp = require('./_lib')

test('misc-test', function(t) {
  let doc = nlp('one two three four five. no here results.')
  let trie = doc.buildTrie(['one', 'onety'])
  let res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'one', 'one result')

  trie = doc.buildTrie(['two three', 'onety foo'])
  res = doc.scan(trie).json()
  t.equal(res.length, 1, 'one results')
  t.equal(res[0].text, 'two three', 'two three result')

  trie = doc.buildTrie(['two three', 'four five', 'five six'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two results')

  trie = doc.buildTrie(['two three four', 'four five six', 'five five', 'five'])
  res = doc.scan(trie).json()
  t.equal(res.length, 2, 'two three-results')

  trie = doc.buildTrie(['two three', 'two', 'seven', 'one', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 3, 'three results')

  trie = doc.buildTrie(['twoe three', 'twsasdf so', 'sefven', 'onde', 'onety', 'eleventy eight'])
  res = doc.scan(trie)
  t.equal(res.length, 0, 'no results')

  t.end()
})
