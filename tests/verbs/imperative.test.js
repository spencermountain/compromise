const test = require('tape')
const nlp = require('../_lib')

test('imperative keeps tense:', function (t) {
  let arr = [
    'do speak',
    'do not walk',
    'please do not speak',
    // 'go!',
    // "don't go",
    // 'shut the door',
    // 'eat your vegetables',
    // 'you should eat your vegetables',
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    doc.verbs().toPastTense()
    t.equal(doc.text(), str, str + ' [toPast]')
  })
  t.end()
})
