import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-find] '

//dont take it too-far
test('verb-greedy:', function (t) {
  let arr = nlp('he would be, had he survived').verbs().json()
  t.equal(arr.length, 2, 'split-on-clause')

  arr = nlp('we walked, talked, and sang').verbs().json()
  t.equal(arr.length, 3, 'split-on-list')

  arr = nlp('we walked, talked, and quickly sang').verbs().json()
  t.equal(arr.length, 3, 'split-on-list2')

  arr = nlp('we suddenly walked, talked, and abruptly sang').verbs().json()
  t.equal(arr.length, 3, 'split-on-list3')

  arr = nlp('we really').verbs().json()
  t.equal(arr.length, 0, 'adverb-isnt-a-verb')

  arr = nlp('we really really').verbs().json()
  t.equal(arr.length, 0, 'two-adverbs-isnt-a-verb')

  arr = nlp('not good').verbs().json()
  t.equal(arr.length, 0, 'not-isnt-a-verb')

  let str = nlp('we must not').verbs().out('normal')
  t.equal(str, 'must not', 'verb-not')

  str = nlp('we must really').verbs().out('normal')
  t.equal(str, 'must really', 'verb-adverb')

  str = nlp('we must really not').verbs().out('normal')
  t.equal(str, 'must really not', 'verb-adverb-not')

  t.end()
})
