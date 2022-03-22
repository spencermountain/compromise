import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-parts]'

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
    ['john is really walking', '', 'is', 'really'],
    ['john really is walking', '', 'is', 'really'],
    ['john is walking really', '', 'is', 'really'],
    ['john is not really walking', 'not', 'is', 'really'],
    ['john is really not walking', 'not', 'is', 'really'],
    ['john really is not walking', 'not', 'is', 'really'],
    ['john is not walking really', 'not', 'is', 'really'],
    ['john has really been not walking', 'not', 'has been', 'really'],
    ['john has been really not walking', 'not', 'has been', 'really'],
    ['john has been not really walking', 'not', 'has been', 'really'],
    ['john has been not walking really', 'not', 'has been', 'really'],
    ['john really would not have had been walking', 'not', 'would have had been', 'really'],
    ['john would really not have had been walking', 'not', 'would have had been', 'really'],
    ['john would not really have had been walking', 'not', 'would have had been', 'really'],
    ['john would not have really had been walking', 'not', 'would have had been', 'really'],
    ['john would not have had really been walking', 'not', 'would have had been', 'really'],
    ['john would not have had been really walking', 'not', 'would have had been', 'really'],
    ['john would not have had been walking really', 'not', 'would have had been', 'really'],
  ]
  tests.forEach(function (a) {
    const arr = nlp(a[0]).verbs().json()
    let json = (arr[0] || {}).verb || {}
    let adverbs = json.preAdverbs.concat(json.postAdverbs).join(' ')
    t.equal(arr.length, 1, '#verbs - ' + arr.length + '  ' + a[0])
    // t.equal(json.negative || '', a[1], "neg-test - '" + a[0] + "'")
    t.equal(json.auxiliary, a[2], here + "aux- - '" + a[0] + "'")
    t.equal(json.root, 'walking', here + "root  - '" + a[0] + "'")
    t.equal(adverbs, a[3], "adverb-test  - '" + a[0] + "'")
  })
  t.end()
})
