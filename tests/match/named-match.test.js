const test = require('tape')
const nlp = require('../_lib')

test('named-match-group', function(t) {
  const res = nlp('the dog played')
    .match('the [<type> #Noun] played')
    .groupByNames()

  t.equal(res['type'].text(), 'dog')

  const doc2 = nlp('the big big big dog played').match('the [<size> #Adjective+] [<type> #Noun] played')
  const res2 = doc2.groupByNames()

  t.equal(res2['type'].text(), 'dog')
  t.equal(res2['size'].text(), 'big big big')

  t.end()
})

test('named-match-to-json:', function(t) {
  let arr = [
    [
      'the dog played',
      'the [<target> #Noun] played',
      'dog',
      [{ text: 'dog', terms: [{ text: 'dog', tags: ['Noun', 'Singular'] }] }],
    ],
    [
      'the dog played',
      'the [<target> dog] played',
      'dog',
      [{ text: 'dog', terms: [{ text: 'dog', tags: ['Noun', 'Singular'] }] }],
    ],
    [
      'the big dog played',
      'the [<target> big dog] played',
      'big dog',
      [
        {
          text: 'big dog',
          terms: [
            { text: 'big', tags: ['Comparable', 'Adjective'] },
            { text: 'dog', tags: ['Noun', 'Singular'] },
          ],
        },
      ],
    ],
    [
      'the big dog played',
      'the [<target> big] dog [<target> played]',
      'big played',
      [
        { text: 'big', terms: [{ text: 'big', tags: ['Comparable', 'Adjective'] }] },
        { text: 'played', terms: [{ text: 'played', tags: ['PastTense', 'Verb'] }] },
      ],
    ],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.groupByNames()
    t.ok(res['target'], "Should contain 'target' group")

    const json = res.target.json()
    const text = res.target.text()

    t.equal(text, a[2])
    t.deepEqual(json, a[3])
  })

  t.end()
})

test('named-match-overlap', function(t) {
  const arr = [
    {
      input: 'the big dog played',
      match: 'the [<target> #Adjective] [<type> #Noun] [<target> played]',
      run: res => {
        t.equal(res['type'].text(), 'dog')
        t.equal(res['target'].text(), 'big played')
      },
    },
  ]

  arr.forEach(a =>
    a.run(
      nlp(a.input)
        .match(a.match)
        .groupByNames()
    )
  )

  t.end()
})

test('named-object-match:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', capture: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', capture: 'target' }], 'played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named()

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-object-match-target:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', capture: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', capture: 'target' }], 'played'],

    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: 'not-target' }, { word: 'played' }], ''],
    ['the dog played', [{ word: 'dog', capture: 'not-target' }], ''],
    ['the dog played', [{ tag: 'Verb', capture: 'not-target' }], ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-object-match-number:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: '0' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: 0 }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', capture: 0 }], 'dog'],
    ['the dog played', [{ tag: 'Verb', capture: 0 }], 'played'],

    ['the dog played', [{ word: 'the' }, { tag: 'Noun', capture: 1 }, { word: 'played' }], ''],
    ['the dog played', [{ word: 'dog', capture: 1 }], ''],
    ['the dog played', [{ tag: 'Verb', capture: 1 }], ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match:', function(t) {
  let arr = [
    ['the dog played', 'the [<target> #Noun] played', 'dog'],
    ['the dog played', 'the [<target> dog] played', 'dog'],
    ['the big dog played', 'the [<target> big dog] played', 'big dog'],
    ['the big dog played', 'the [<target> big dog] played', 'big dog'],
    ['the dog played', 'the dog [<target> #Verb]', 'played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named()

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-target:', function(t) {
  let arr = [
    ['the dog played', 'the [<target> #Noun] played', 'dog'],
    ['the dog played', 'the [<target> dog] played', 'dog'],
    ['the big dog played', 'the [<target> big dog] played', 'big dog'],

    ['the dog played', 'the [<not-target> #Noun] played', ''],
    ['the dog played', 'the [<not-target> dog] played', ''],
    ['the big dog played', 'the [<not-target> big dog] played', ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-number:', function(t) {
  let arr = [
    ['the dog played', 'the [<0> #Noun] played', 'dog'],
    ['the dog played', 'the [<0> dog] played', 'dog'],
    ['the big dog played', 'the [<0> big dog] played', 'big dog'],

    ['the dog played', 'the [<1> #Noun] played', ''],
    ['the dog played', 'the [<1> dog] played', ''],
    ['the big dog played', 'the [<1> big dog] played', ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .named(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})
