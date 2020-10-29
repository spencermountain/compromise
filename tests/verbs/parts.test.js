const test = require('tape')
const nlp = require('../_lib')

test('verb-parts:', function (t) {
  const tests = [
    ['john is walking', '', 'is', ''],
    ['john was walking', '', 'was', ''],
    ['john will be walking', '', 'will be', ''],
    ['john has been walking', '', 'has been', ''],
    ['john had been walking', '', 'had been', ''],
    ['john would have had been walking', '', 'would have had been', ''],
    //negatives
    ['john is not walking', 'not', 'is', ''],
    ['john was not walking', 'not', 'was', ''],
    ['john will not be walking', 'not', 'will be', ''],
    ['john will be not walking', 'not', 'will be', ''],
    ['john has not been walking', 'not', 'has been', ''],
    ['john has been not walking', 'not', 'has been', ''],
    ['john had not been walking', 'not', 'had been', ''],
    ['john had been not walking', 'not', 'had been', ''],
    ['john would be walking', '', 'would be', ''],
    ['john would not be walking', 'not', 'would be', ''],
    ['john would be not walking', 'not', 'would be', ''],
    ['john would not have had been walking', 'not', 'would have had been', ''],
    ['john would have not had been walking', 'not', 'would have had been', ''],
    ['john would have had not been walking', 'not', 'would have had been', ''],
    ['john would have had been not walking', 'not', 'would have had been', ''],
    //adverbs + negatives combinations
    // ['john is really walking', '', 'is', 'really'],
    ['john really is walking', '', 'is', ''],
    ['john is walking really', '', 'is', ''],
    ['john is not really walking', 'not', 'is', 'really'],
    ['john is really not walking', 'not', 'is', 'really'],
    ['john really is not walking', 'not', 'is', ''],
    ['john is not walking really', 'not', 'is', ''],
    ['john has really been not walking', 'not', 'has been', 'really'],
    ['john has been really not walking', 'not', 'has been', 'really'],
    ['john has been not really walking', 'not', 'has been', 'really'],
    ['john has been not walking really', 'not', 'has been', ''],
    ['john really would not have had been walking', 'not', 'would have had been', ''],
    ['john would really not have had been walking', 'not', 'would have had been', 'really'],
    ['john would not really have had been walking', 'not', 'would have had been', 'really'],
    ['john would not have really had been walking', 'not', 'would have had been', 'really'],
    ['john would not have had really been walking', 'not', 'would have had been', 'really'],
    ['john would not have had been really walking', 'not', 'would have had been', 'really'],
    ['john would not have had been walking really', 'not', 'would have had been', ''],
  ]
  tests.forEach(function (a) {
    const arr = nlp(a[0]).verbs().json()
    t.equal(arr.length, 1, '#verbs - ' + arr.length + '  ' + a[0])
    t.equal(arr[0].parts.negative || '', a[1], "neg-test - '" + a[0] + "'")
    t.equal(arr[0].parts.auxiliary || '', a[2], "aux-test  - '" + a[0] + "'")
    t.equal(arr[0].parts.verb || '', 'walking', "verb-test  - '" + a[0] + "'")
    t.equal(arr[0].parts.adverb || '', a[3], "adverb-test  - '" + a[0] + "'")
  })
  t.end()
})

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
  t.equal(str, 'must', 'verb-adverb')

  str = nlp('we must really not').verbs().out('normal')
  t.equal(str, 'must really not', 'verb-adverb-not')

  t.end()
})
