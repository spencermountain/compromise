import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/clauses] '

test('clauses - with commas', function (t) {
  let arr = [
    // [string, number of clauses expected]
    ['fun, cool, etc...', 1],
    ['cool, and fun', 1],
    ['just one clause here!', 1],
    ['if you must, go to the basement', 2],
    ['an apple, washed and dried', 2],
    ['one thing, at a time. and then another, right afterwards', 4],
    ['oh and something else, too', 1],
    ['tuesday, march 2nd', 1],
    ['toronto, canada', 1],
    //['june 6, 1992', 1] // TODO fix '(#Date && @hasComma) #Year' so it gets this one right
  ]
  arr.forEach(function (a) {
    const clauses = nlp(a[0]).clauses().out('array')
    t.equal(clauses.length, a[1], here + a[0])
  })
  t.end()
})