import test from 'tape'
import nlp from '../lib/_lib.js'

test('', function (t) {
  let txt = `one two three. four five six.`
  let arr = [
    // empty pointers mean full doc
    [null, txt],
    [undefined, txt],
    ['', txt],
    // no doc
    [[], ``],
    // first sentence
    [['/0'], `one two three. `],
    [['/0/0'], `one two three. `],
    [['/0/0:1'], `one `],
    [['/0/0:2'], `one two `],
    [['/0/0:3'], `one two three. `],
    [['/0/0:13'], `one two three. `], //term-overflow
    [['/0/0:-'], `one two three. `],
    // nth sentence
    [['/1'], `four five six.`],
    [['/120'], ``],
  ]
  arr.forEach(a => {
    let doc = nlp(txt).update(a[0])
    t.equal(doc.text(), a[1], JSON.stringify(a[0]))

    t.equal(doc.found, Boolean(doc.text()), '[found] ' + a[0])
  })
  t.end()
})
