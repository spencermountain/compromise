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
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    doc.verbs().toGerund()
    let str = doc.out('normal')
    t.equal(str, a[1], here + a[0] + ' -> ' + str)
  })
  t.end()
})
