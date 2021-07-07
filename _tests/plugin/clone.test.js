const test = require('tape')
const nlp = require('../_lib')

test('clone:', function (t) {
  const arr = [
    'he eats the alligator',
    'Jumanji is the best move. He eats cheese.',
    'Uperman is wayyyy better than batman!',
  ]
  arr.forEach(function (str) {
    let m = nlp(str)
    t.equal(m.out(), str, 'equals input - ' + m.out())

    let up = m.clone().toUpperCase()
    t.notEqual(str, up.out(), 'neg not equal - ' + str)

    let adv = m.clone().match('#Verb').append('really')
    t.notEqual(str, adv.out(), 'adv not equal - ' + str)

    let rm = m.clone().match('#Verb').delete('#Verb')
    t.notEqual(str, rm.out(), 'rm not equal - ' + str)

    let tag = m.clone().tag('#Verb')
    t.notEqual(m.match('#Verb').text(), tag.match('#Verb').text(), 'rm not equal - ' + str)
  })
  t.end()
})
