const test = require('tape')
const nlp = require('../_lib')

test('verb.subject():', function (t) {
  let arr = [
    ['i walked', 'i'],
    ['john was cool', 'john'],
    ['john really was cool', 'john'],
    ['john was really cool', 'john'],
    ['john did not really drive', 'john'],
    ['john would not have really driven', 'john'],
    ['speak!', ''],
    ['please go to the mall', ''],
    ['shut the door', ''],
    ['i shall go there', 'i'],
    ['he walks carefully and eats a grape', 'he'],
    ['if so, john should pay for it', 'john'],
    ['you really think so?', 'you'],
    ['the moon is made of cheese', 'moon'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs(0).subject().text()
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})
