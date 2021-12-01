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
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs().toGerund().out('normal')
    t.equal(str, a[1], here + a[0] + ' -> ' + str)
  })
  t.end()
})
