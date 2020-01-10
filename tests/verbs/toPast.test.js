const test = require('tape')
const nlp = require('../_lib')

test('ake-suffix toPast:', function(t) {
  let arr = [
    //oke
    ['awakes', 'awoke'],
    //ade
    ['makes', 'made'],
    ['remakes', 'remade'],
    //ook
    ['shakes', 'shook'],
    ['forsakes', 'forsook'],

    ['takes', 'took'],
    ['overtakes', 'overtook'],
    ['undertakes', 'undertook'],
    ['mistakes', 'mistook'],
    ['retakes', 'retook'],
    //aked
    ['bakes', 'baked'],
    ['fakes', 'faked'],
    ['snakes', 'snaked'],
  ]
  arr.forEach(function(a) {
    const str = nlp(a[0])
      .verbs()
      .toPastTense()
      .out('normal')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})
