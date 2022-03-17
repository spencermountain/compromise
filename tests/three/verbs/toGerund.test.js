import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/gerund]'

test('verb-to-gerund:', function (t) {
  let arr = [
    ['walk', 'walking'],
    ['sing', 'singing'],
    ['win', 'winning'],
    ['will convert', 'converting'],
    ['see', 'seeing'],
    ['is', 'being'],
    ['was', 'being'],
    ['am', 'being'],
    ['he walked', 'he is walking'],
    ['he dedicates', 'he is dedicating'],
    // ['he did not walk', 'he was not walking'],
    ['there is no hope', 'there is no hoping'],


    // copula forms
    ['i am not cool', 'i am not being cool'],
    ['i was not cool', 'i am not being cool'],
    ['i will not be cool', 'i will not be being cool'],
    ['he is not cool', 'he is not being cool'],
    ['he was not cool', 'he was not being cool'],
    ['he will not be cool', 'he will not be being cool'],
    ['they are not cool', 'they are not being cool'],
    ['they were not cool', 'they were not being cool'],
    ['they will not be cool', 'they will not be being cool'],

  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    doc.verbs().toGerund()
    let str = doc.out('normal')
    t.equal(str, a[1], here + a[0] + ' -> ' + str)
  })
  t.end()
})
