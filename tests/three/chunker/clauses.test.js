import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/clauses] '

test('clauses - with commas', function (t) {
  let arr = [
    // ['string', ['expected clauses', 'in an array']]
    ['fun, cool, etc...', ['fun, cool, etc...']],
    ['cool, and fun', ['cool, and fun']],
    ['one, two, and three', ['one, two, and three']],
    ['just one clause here!', ['just one clause here!']],
    ['if you must, go to the basement', ['if you must,', 'go to the basement']],
    ['an apple, washed and dried', ['an apple,', 'washed and dried']],
    ['one thing, at a time. and then another, right afterwards', ['one thing,', 'at a time.', 'and then another,', 'right afterwards']],
    ['oh and something else, too', ['oh and something else, too']],
    ['tuesday, march 2nd', ['tuesday, march 2nd']],
    ['toronto, canada', ['toronto, canada']],
    ['june 6, 1992', ['june 6, 1992']]
  ]
  arr.forEach(function (a) {
    const clauses = nlp(a[0]).clauses().out('array')
    t.equal(clauses.length, a[1].length, here + '[number of clauses] ' + a[0])
    t.deepEqual(clauses, a[1], here + '[clause content] ' + a[0])
  })
  t.end()
})