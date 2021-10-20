const test = require('tape')
const nlp = require('../_lib')

test('isImperative:', function (t) {
  let arr = [
    ['do speak', true],
    ['do not walk', true],
    ['please do not speak', true],
    ['go!', true],
    ['go fast.', true],
    ["don't go", true],
    // ['shut the door', true],
    ['eat your vegetables', true],
    ['you should eat your vegetables', true],
    ['you eat?', false],
    ['do you eat?', false],
    ['i often use the stairs', false],
    ['i ate at the bar', false],
    ['walk the plank', true],
    ['turn down the music', true],
    ['is it over', false],
    ['save some for me please', true],
    // ['stay real', true],
    ['stay the course', true],
    // ['stay out of my garden', true],
    ['return my hat', true],
    ['swim carefully', true],
    ['go backwards', true],
    ['walking is allowed', false],
    // ['stay away from death mountain', true],
    // ['never lie', true],
    // ['keep it quiet', true],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    let m = doc.verbs().isImperative()
    t.equal(m.found, a[1], `[isImperative] ${a[0]}`)
  })
  t.end()
})

test('imperative keeps tense:', function (t) {
  let arr = [
    'do speak',
    'do not walk',
    'please do not speak',
    'go!',
    "don't go",
    'shut the door',
    'eat your vegetables',
    // 'you should eat your vegetables',
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    doc.verbs().toPastTense()
    t.equal(doc.text(), str, str + ' [toPast]')
  })
  t.end()
})
