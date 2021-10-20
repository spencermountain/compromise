const test = require('tape')
const nlp = require('../_lib')

test('gerund -> infinitive:', function (t) {
  let arr = [
    ['coming', 'come'],
    ['moving', 'move'],
    ['joking', 'joke'],
    ['poking', 'poke'],
    ['naming', 'name'],
    ['aching', 'ache'],
    ['tuning', 'tune'],
    ['hazing', 'haze'],
    //phrasal
    ['hazing-over', 'haze-over'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs().toInfinitive().out('text')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})

test('pastTense -> infinitive:', function (t) {
  let arr = [
    ['came', 'come'],
    ['named', 'name'],

    ['moved', 'move'],
    ['joked', 'joke'],
    ['poked', 'poke'],
    ['hooping', 'hoop'],

    ['ached', 'ache'],
    ['tuned', 'tune'],
    //phrasal
    ['hazed-over', 'haze-over'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0]).verbs().toInfinitive()
    let str = doc.out('text')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})
