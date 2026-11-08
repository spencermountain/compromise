import test from 'tape'
import nlp from '../lib.js'
const here = '[three/replace-per-match] '

const b = '██████████'
const nameTags = '(#FirstName|#LastName|#MaleName|#FemaleName)'

test(here + 'each match keeps its punctuation', function (t) {
  const arr = [
    ['(John) ran. (Tom) sat.', 'X', '(X) ran. (X) sat.'],
    ['[John] ran. [Tom] sat.', 'X', '[X] ran. [X] sat.'],
    ['(John) ran. Tom sat.', 'X', '(X) ran. X sat.'],
    ['John ran. (Tom) sat.', 'X', 'X ran. (X) sat.'],
    ['John, ran. Tom, sat.', 'X', 'X, ran. X, sat.'],
    // in one sentence
    ['(John) and (Tom) ran.', 'X', '(X) and (X) ran.'],
    ['[John] and Tom and [Sue] ran.', 'X', '[X] and X and [X] ran.'],
    // longer and shorter replacements
    ['(John) and (Tom) ran.', 'X Y', '(X Y) and (X Y) ran.'],
    ['(John Smith) and (Sue Jones) ran.', 'X', '(X) and (X) ran.'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.people().replaceWith(a[1])
    t.equal(doc.text(), a[2], here + a[0])
  })
  t.end()
})

test(here + 'each match keeps its case', function (t) {
  const arr = [
    ['tom ran. Sue sat.', 'x ran. X sat.'],
    ['Tom ran. sue sat.', 'X ran. x sat.'],
    ['Tom ran. Sue sat.', 'X ran. X sat.'],
    ['tom ran. sue sat.', 'x ran. x sat.'],
    // in one sentence
    ['tom saw Sue', 'x saw X'],
    ['Tom saw sue', 'X saw x'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.match('(tom|sue)').replaceWith('x', { case: true })
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})

test(here + 'each match keeps its tags', function (t) {
  const arr = ['Tom ran. Paris fell.', 'Tom saw Paris.']
  arr.forEach(str => {
    const doc = nlp(str)
    doc.match('(tom|paris)').replaceWith('zzz', { tags: true })
    const m = doc.match('zzz')
    t.equal(m.eq(0).has('#FirstName'), true, here + 'first keeps its tags: ' + str)
    t.equal(m.eq(0).has('#City'), false, here + 'first has its own tags: ' + str)
    t.equal(m.eq(1).has('#City'), true, here + 'second keeps its tags: ' + str)
    t.equal(m.eq(1).has('#FirstName'), false, here + 'second has its own tags: ' + str)
  })
  t.end()
})

test(here + 'tags line up with new terms', function (t) {
  // longer replacement
  let doc = nlp('John Smith ran. Sue Jones sat.')
  doc.match('#Person+').replaceWith('aaa bbb ccc', { tags: true })
  let m = doc.match('aaa bbb ccc')
  t.equal(m.length, 2, here + 'found both')
  m.forEach(one => {
    t.equal(one.match('aaa').has('#FirstName'), true, here + 'first term')
    t.equal(one.match('bbb').has('#LastName'), true, here + 'second term')
    t.equal(one.match('ccc').has(nameTags), false, here + 'extra term')
  })
  // shorter replacement
  doc = nlp('John Smith ran. Sue Jones sat.')
  doc.match('#Person+').replaceWith('aaa', { tags: true })
  m = doc.match('aaa')
  t.equal(m.length, 2, here + 'found both shorter')
  t.equal(m.has('#FirstName'), true, here + 'first term shorter')
  t.equal(m.has('#LastName'), false, here + 'no leftover tags')
  // neighbours are untouched
  t.equal(doc.match('(ran|sat)').has(nameTags), false, here + 'neighbours')
  t.end()
})

test(here + 'each match uses its own groups', function (t) {
  const arr = [
    ['walk the plank. walk the dog', 'walk the [.]', 'eat the $0', 'eat the plank. eat the dog'],
    ['i am tom and i am sue', 'i am [<who>.]', 'hi $who', 'hi tom and hi sue'],
    ['the cat and the dog ran', 'the [.]', 'a $0', 'a cat and a dog ran'],
    ['tom and sue ran', '[<who>(tom|sue)]', 'mr $who', 'mr tom and mr sue ran'],
    ['my cat ate. my dog sat.', 'my [.] [.]', '$1 $0', 'ate cat. sat dog.'],
    // one match still works
    ['walk the plank.', 'walk the [.]', 'eat the $0', 'eat the plank.'],
    ['walk the plank quickly', 'walk the [.]', 'eat the $0', 'eat the plank quickly'],
    // a non-group is left alone
    ['walk the plank', 'walk the [.]', 'eat $9', 'eat $9'],
    ['walk the plank', 'walk the plank', 'pay $5', 'pay $5'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.replace(a[1], a[2])
    t.equal(doc.text(), a[3], here + a[0])
  })
  t.end()
})

test(here + 'groups do not repeat punctuation', function (t) {
  const arr = [
    ['foo, bar baz', '[foo]', 'x $0', 'x foo, bar baz'],
    ['foo bar.', '[foo bar]', 'x $0', 'x foo bar.'],
    ['foo bar. foo baz.', '[foo .]', 'x $0', 'x foo bar. x foo baz.'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.replace(a[1], a[2])
    t.equal(doc.text(), a[3], here + a[0])
  })
  t.end()
})

test(here + 'groups respect the keep option', function (t) {
  const doc = nlp('Tom ran. sue sat.')
  doc.replace('[<who>(tom|sue)]', 'mr $who', { case: true })
  t.equal(doc.text(), 'Mr Tom ran. mr sue sat.', here + 'case')
  t.end()
})

test(here + 'views point at the new terms', function (t) {
  // shorter
  let doc = nlp('john smith ran fast')
  let m = doc.match('john smith')
  let out = m.replaceWith('X')
  t.equal(out.text(), 'X', here + 'returned shorter')
  t.equal(m.text(), 'X', here + 'self shorter')
  // longer
  doc = nlp('tom ran fast')
  m = doc.match('tom')
  out = m.replaceWith('aaa bbb')
  t.equal(out.text(), 'aaa bbb', here + 'returned longer')
  t.equal(m.text(), 'aaa bbb', here + 'self longer')
  // many in one sentence
  doc = nlp('bob and sue and tom ran')
  m = doc.match('(bob|sue|tom)')
  out = m.replaceWith('aaa bbb')
  t.deepEqual(m.out('array'), ['aaa bbb', 'aaa bbb', 'aaa bbb'], here + 'self many')
  t.deepEqual(out.out('array'), ['aaa bbb', 'aaa bbb', 'aaa bbb'], here + 'returned many')
  m.tag('Plural')
  t.deepEqual(doc.match('#Plural+').out('array'), ['aaa bbb', 'aaa bbb', 'aaa bbb'], here + 'tags reach new terms')
  t.equal(doc.text(), 'aaa bbb and aaa bbb and aaa bbb ran', here + 'text many')
  // nothing left
  doc = nlp('tom ran fast')
  m = doc.match('tom')
  out = m.replaceWith('')
  t.equal(m.found, false, here + 'self empty')
  t.equal(out.found, false, here + 'returned empty')
  t.equal(doc.text(), 'ran fast', here + 'text empty')
  t.end()
})

test(here + 'replacing with a function', function (t) {
  let doc = nlp('foo bar baz')
  let out = doc.match('bar').replaceWith(() => 'x')
  t.equal(out.text(), 'x', here + 'returned view')
  t.equal(doc.text(), 'foo x baz', here + 'text')

  doc = nlp('tom and sue ran. bob sat.')
  const m = doc.match('(tom|sue|bob)')
  out = m.replaceWith(s => s.text().toUpperCase() + ' jr')
  t.equal(doc.text(), 'TOM jr and SUE jr ran. BOB jr sat.', here + 'each match')
  t.deepEqual(out.out('array'), ['TOM jr', 'SUE jr', 'BOB jr'], here + 'new pointers')

  // a full document stays full
  doc = nlp('foo bar')
  doc.replaceWith(() => 'x')
  t.equal(doc.isFull(), true, here + 'stays full')
  t.equal(doc.text(), 'x', here + 'full text')

  // removing, with keep-options
  doc = nlp('tom and sue ran')
  doc.match('(tom|sue)').replaceWith(() => undefined, true)
  t.equal(doc.text(), 'and ran', here + 'undefined removes')
  t.end()
})

test(here + 'redact marks only what it replaced', function (t) {
  const arr = [
    [`Bob and Tom's dog and Sue's cat ran.`, [b, `${b}'s`, `${b}'s`]],
    ['John Smith and Sue Jones ran.', [b, b]],
    ['John ran. Sue sat.', [b, b]],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0]).redact()
    const found = doc.match('#Redacted').terms().out('array')
    t.deepEqual(found.map(str => str.replace(/[.,]$/, '')), a[1], here + a[0])
  })
  const doc = nlp(`Bob and Tom's dog and Sue's cat ran.`).redact()
  t.equal(doc.match('(dog|cat|ran)').has('#Redacted'), false, here + 'neighbours')
  t.end()
})

test(here + 'redact hides specific tags', function (t) {
  const arr = ['John Smith and Sue Jones ran.', 'Bob and Sue and Tom ran.', 'John ran. Mary Jones sat.']
  arr.forEach(str => {
    const doc = nlp(str).redact()
    t.equal(doc.has(nameTags), false, here + str)
    t.equal(doc.has('#Person'), true, here + 'keeps the general tag: ' + str)
  })
  const doc = nlp('Paris and Tokyo fell.').redact()
  t.equal(doc.has('#City'), false, here + 'places')
  t.end()
})
