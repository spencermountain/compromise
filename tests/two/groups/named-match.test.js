import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/named-match] '

test('named-match-overlap', function (t) {
  let doc = nlp('june the 5th, july the 7th, and sept the 12th.')

  let m = doc.match('[<month>#Month]')

  t.equal(m.length, 3, here + 'Should have 3 results')

  t.equal(m.groups('month').length, 3, here + 'Should have 3 capture group results')

  t.end()
})

test('named-match-or:', function (t) {
  let arr = [
    ['the dog played again', 'the [<target>(#Noun|#Verb)] played [<0>(#Adverb)]', 'dog'],
    ['the dog played again', 'the [<target>(#Noun|#Verb)] played [<another>(#Adverb)]', 'dog'],
    ['the dog played', 'the [<target>(#Noun|#Verb)] played', 'dog'],
    ['the dog played', 'the [<target>(#Noun)] played', 'dog'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match-auto:', function (t) {
  let arr = [
    ['the dog played', 'the [#Noun] played', 'dog'],
    ['the dog played', 'the [dog] played', 'dog'],
    ['the big dog played', 'the [big dog] played', 'big dog'],

    ['the dog played', 'the #Noun [played]', 'played'],
    ['the dog played', 'the dog [played]', 'played'],
    ['the big dog played', 'the big dog [played]', 'played'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.groups(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(res.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match-auto-multi:', function (t) {
  let arr = [
    ['the dog played', 'the [#Noun] [played]', 'dog'],
    // ['the dog played lots', 'the [dog] played [<0>lots]', 'dog lots'],
    ['the big dog played', 'the [big dog] [played]', 'big dog'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.groups(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(res.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match-group', function (t) {
  const res = nlp('the dog played').match('the [<type>#Noun] played').groups()

  t.equal(res['type'] && res['type'].text(), 'dog', here + 'res1')

  const doc2 = nlp('the big big big dog played').match('the [<size>#Adjective+] [<type>#Noun] played')
  const res2 = doc2.groups()

  t.equal(res2['type'] && res2['type'].text(), 'dog', here + 'res2 dog')
  t.equal(res2['size'] && res2['size'].text(), 'big big big', here + 'big big big')

  t.end()
})

test('named-match-to-json:', function (t) {
  let arr = [
    ['the dog played', 'the [<target>#Noun] played', 'dog', ['dog']],
    ['the dog played', 'the [<target>dog] played', 'dog', ['dog']],
    ['the big dog played', 'the [<target>big dog] played', 'big dog', ['big dog']],
    // ['the big dog played', 'the [<target>big] dog [<target>played]', 'big played', ['big', 'played']],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.groups()
    t.ok(res['target'], "Should contain 'target' group")

    const json = res.target.out('array')
    const text = res.target.text()

    t.equal(text, a[2], here + a[0])
    t.deepEqual(json, a[3], here + a[0])
  })

  t.end()
})

test('named-match-overlap', function (t) {
  const arr = [
    {
      input: 'the big dog played',
      match: 'the [<target>#Adjective] [<type>#Noun] [<vb>played]',
      run: res => {
        t.equal(res.type && res.type.text(), 'dog', here + 'got type')
        t.equal(res.target && res.target.text(), 'big', here + 'got target')
        t.equal(res.vb && res.vb.text(), 'played', here + 'got verb')
      },
    },
  ]

  arr.forEach(a => a.run(nlp(a.input).match(a.match).groups()))

  t.end()
})

test('named-object-match-quick:', function (t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', group: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', group: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', group: 'target' }], 'played'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1], 'target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-object-match:', function (t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', group: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', group: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', group: 'target' }], 'played'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-object-match-target:', function (t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', group: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', group: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', group: 'target' }], 'played'],

    ['the dog played', [{ word: 'the' }, { tag: 'Noun', group: 'not-target' }, { word: 'played' }], ''],
    ['the dog played', [{ word: 'dog', group: 'not-target' }], ''],
    ['the dog played', [{ tag: 'Verb', group: 'not-target' }], ''],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match:', function (t) {
  let arr = [
    ['the dog played', 'the [<target>#Noun] played', 'dog'],
    ['the dog played', 'the [<target>dog] played', 'dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],
    ['the dog played', 'the dog [<target>#Verb]', 'played'],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match-target:', function (t) {
  let arr = [
    ['the dog played', 'the [<target>#Noun] played', 'dog'],
    ['the dog played', 'the [<target>dog] played', 'dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],

    ['the dog played', 'the [<not-target>#Noun] played', ''],
    ['the dog played', 'the [<not-target>dog] played', ''],
    ['the big dog played', 'the [<not-target>big dog] played', ''],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})

test('named-match-number:', function (t) {
  let arr = [
    ['the dog played', 'the [<0>#Noun] played', 'dog'],
    ['the dog played', 'the [<0>dog] played', 'dog'],
    ['the big dog played', 'the [<0>big dog] played', 'big dog'],

    ['the dog played', 'the [<1>#Noun] played', ''],
    ['the dog played', 'the [<1>dog] played', ''],
    ['the big dog played', 'the [<1>big dog] played', ''],
  ]

  arr.forEach(function (a) {
    const doc = nlp(a[0]).match(a[1]).groups(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], here + msg)
  })

  t.end()
})
