const test = require('tape')
const nlp = require('../_lib')

test('.toPossessive():', function (t) {
  let arr = [
    ['duck', `duck's`],
    ['eavesdropper', `eavesdropper's`],
    ['John', `John's`],
    ['hour', `hour's`],
    ['F.B.I', `F.B.I's`],
    ['John Smith', `John Smith's`],
    ['skateboards', `skateboards'`],
    ['Flanders', `Flanders'`],
    // ['she', 'hers'],
    ['peaches', `peaches'`],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0]).nouns().toPossessive()
    t.equal(doc.out(), a[1], a[0])
  })
  t.end()
})
