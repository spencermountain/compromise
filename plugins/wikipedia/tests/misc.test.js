import test from 'tape'
import trie from '../src/index.js'
import nlp from '../../../src/one.js'

test('true-positive', function (t) {
  let doc = nlp('i learned the css grid layout')
  let res = doc.lookup(trie).json()
  t.equal(res.length, 1, 'found-1 result')
  t.equal(res[0].text, 'css grid layout', 'found css result')
  t.end()
})

test('true-negative', function (t) {
  let doc = nlp('i learned the csss grid layout')
  let res = doc.lookup(trie).json()
  t.equal(res.length, 0, 'found 0 results')
  t.end()
})