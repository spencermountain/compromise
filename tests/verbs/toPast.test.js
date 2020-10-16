const test = require('tape')
const nlp = require('../_lib')

test('ake-suffix toPast:', function (t) {
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
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs().toPastTense().out('normal')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})

test('sneaky past participles', function (t) {
  let arr = [
    // present
    ['i am being driven', 'i have been driven'],
    ['i should be driven', 'i should have been driven'],
    // past->past
    ['i had been driven', 'i had been driven'],
    ['i should have been driven', 'i should have been driven'],
    // gerund
    ['when it is raining', 'when it was raining'],
    ['i think it will be raining', 'i thought it will be raining'],
    ['when it was raining', 'when it was raining'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
