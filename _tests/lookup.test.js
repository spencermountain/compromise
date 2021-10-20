const test = require('tape')
const nlp = require('./_lib')

test('lookup array', function (t) {
  let doc = nlp("he isn't AT Spencer's house of pain. The haunted house of not pain. Third sentence spencer.")
  let m = doc.lookup(['house of pain', 'house of'])
  t.equal(m.length, 3, 'found redundant match')

  // m = doc.lookup(["spencer's"])
  // t.equal(m.length, 1, 'found possessive lookup')

  m = doc.lookup('spencer')
  t.equal(m.length, 2, 'end of line lookup')

  doc = nlp('one two three four')
  let res = doc.lookup(['two three four', 'one', 'blah', 'three four five'])
  t.equal(res.length, 2, 'found arr single, multi')

  t.end()
})

test('lookup object', function (t) {
  let doc = nlp('spencer kelly is working here')
  let res = doc.lookup({
    'spencer kelly': 'Cool',
    working: 'Uncool',
    miss: 'None',
  })
  t.equal(Object.keys(res).length, 2, 'found two keys')
  t.equal(res.Cool.text(), 'spencer kelly', 'obj text-one')
  t.equal(res.Uncool.text(), 'working', 'obj text-two')

  doc = nlp('one two three four')
  res = doc.lookup({ 'two three four': 'yes', one: 'single', blah: 'no', 'three four five': 'nope' })
  let keys = Object.keys(res)
  t.equal(keys.length, 2, 'found obj single, multi')
  t.equal(res['single'].text(), 'one', 'found single')
  t.equal(res['yes'].text(), 'two three four', 'found multi')

  t.end()
})

test('lookup backtrack', function (t) {
  let doc = nlp('first one one one two.')
  let res = doc.lookup(['two three', 'one', 'blah'])
  t.equal(res.length, 3, 'found multi single match')

  doc = nlp('two three two three')
  res = doc.lookup(['two three', 'one', 'blah'])
  t.equal(res.length, 2, 'found multiple long match')

  doc = nlp('one one one one two')
  res = doc.lookup(['one one two', 'blah'])
  t.equal(res.length, 1, 'found 1 tricky match')

  t.end()
})
