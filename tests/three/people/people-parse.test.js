import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/people-parse] '

test('people-parse:', function (t) {
  let arr = [
    [`john turner`, 'john', 'turner', ''],
    [`dr James Smith`, 'james', 'smith', 'dr'],
    [`Corey`, 'corey', '', ''],
    [`sgt Williams`, '', 'williams', 'sgt'],

    [`Mr Springer`, '', 'springer', 'mr'],
    [`Mr. Goobly`, '', 'goobly', 'mr.'],
    [`dr dirk sinkel`, 'dirk', 'sinkel', 'dr'],
    [`john D Springer sr`, 'john', 'springer', 'sr'],
    [`captain john D Springer`, 'john', 'springer', 'captain'],
    // [``,'',''],
  ]
  arr.forEach(a => {
    let [str, first, last, hon] = a
    let res = nlp(str).people().parse()[0]
    t.equal(res.firstName.text('normal'), first, here + 'first - ' + str)
    t.equal(res.lastName.text('normal'), last, here + 'last - ' + str)
    t.equal(res.honorific.text('normal'), hon, here + 'honorific - ' + str)
  })
  t.end()
})
