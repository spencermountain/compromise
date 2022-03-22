import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/gerund]'

test('verb-to-gerund:', function (t) {
  let arr = [
    ['we walk', 'we are walking'],
    ['we sing', 'we are singing'],
    ['we win', 'we are winning'],
    ['we will convert', 'we are converting'],
    ['we see', 'we are seeing'],
    ['he is', 'he is being'],
    ['he was', 'he is being'],
    ['i am', 'i am being'],
    ['he walked', 'he is walking'],
    ['he dedicates', 'he is dedicating'],
    // ['he did not walk', 'he was not walking'],
    // ['there is no hope', 'there is no hoping'],


    // copula forms
    ['i am not cool', 'i am being not cool'],
    ['i was not cool', 'i am being not cool'],
    // ['i will not be cool', 'i will not be being cool'],
    ['he is not cool', 'he is being not cool'],
    // ['he was not cool', 'he was being not cool'],
    // ['he will not be cool', 'he will not be being cool'],
    ['they are not cool', 'they are being not cool'],
    // ['they were not cool', 'they were being not cool'],
    // ['they will not be cool', 'they will not be being cool'],

  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    doc.verbs().toGerund()
    let str = doc.out('normal')
    t.equal(str, a[1], here + a[0] + ' -> ' + str)
  })
  t.end()
})
