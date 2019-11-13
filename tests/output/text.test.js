const test = require('tape')
const nlp = require('../_lib')

test('text(normal):', function(t) {
  let arr = [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    ['4', '4'],
    ['four', 'four'],
    ['john smith', 'john smith'],
    ['Dr. John Smith-McDonald', 'dr john smith mcdonald'],
    ['Contains no fruit juice. \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
  ]
  arr.forEach(function(a) {
    const str = nlp(a[0]).text('normal')
    t.equal(str, a[0], a[1])
  })
  t.end()
})
