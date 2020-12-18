const test = require('tape')
const nlp = require('./_lib')

test('no dates', function (t) {
  let arr = [
    'laughing out loud',
    '1 adult',
    'we are separated',
    '25',
    'this is the one',
    'this one',
    'this past one',
    'at single',
    'at a couple of',
    'at pairs',
    'at a few',
    'at dozens',
    "single o'clock",
    "dozens o'clock",
    'Rat 6',
    'rat 6',
    '3 30',
    'three twenty',
    'at 650.650.6500',
    'at 650-650-6500',
    'two sixty a m',
    'Pay ABC 2000',
    '4a',
    '4a.',
    'A4 A5',
    'palm',
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    t.equal(doc.dates().length, 0, str)
  })
  t.end()
})
