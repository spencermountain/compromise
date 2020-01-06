const test = require('tape')
const nlp = require('../_lib')

test('named-object-match:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', name: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', name: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', name: 'target' }], 'played'],
  ]

  arr.forEach(function(a) {
    const { target } = nlp(a[0])
      .match(a[1])
      .named()

    t.ok(target)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(target.text, a[2], msg)
  })

  t.end()
})
