const test = require('tape')
const nlp = require('../_lib')

test('named-match-or:', function(t) {
  let arr = [
    ['the dog played again', 'the [<target>(#Noun|#Verb)] played [<0>(#Adverb)]', 'dog'],
    ['the dog played again', 'the [<target>(#Noun|#Verb)] played [<another>(#Adverb)]', 'dog'],
    ['the dog played', 'the [<target>(#Noun|#Verb)] played', 'dog'],
    ['the dog played', 'the [<target>(#Noun)] played', 'dog'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-auto:', function(t) {
  let arr = [
    ['the dog played', 'the [#Noun] played', 'dog'],
    ['the dog played', 'the [dog] played', 'dog'],
    ['the big dog played', 'the [big dog] played', 'big dog'],

    ['the dog played', 'the #Noun [played]', 'played'],
    ['the dog played', 'the dog [played]', 'played'],
    ['the big dog played', 'the big dog [played]', 'played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.byName(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(res.text(), a[2], msg)
  })

  t.end()
})

test('named-match-auto-multi:', function(t) {
  let arr = [
    ['the dog played', 'the [#Noun] [played]', 'dog played'],
    ['the dog played lots', 'the [dog] played [<0>lots]', 'dog lots'],
    ['the big dog played', 'the [big dog] [played]', 'big dog played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.byName(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(res.text(), a[2], msg)
  })

  t.end()
})

test('named-match-group', function(t) {
  const res = nlp('the dog played')
    .match('the [<type>#Noun] played')
    .byName()

  t.equal(res['type'].text(), 'dog')

  const doc2 = nlp('the big big big dog played').match('the [<size>#Adjective+] [<type>#Noun] played')
  const res2 = doc2.byName()

  t.equal(res2['type'].text(), 'dog')
  t.equal(res2['size'].text(), 'big big big')

  t.end()
})

test('named-match-to-json:', function(t) {
  let arr = [
    [
      'the dog played',
      'the [<target>#Noun] played',
      'dog',
      [{ text: 'dog', terms: [{ text: 'dog', tags: ['Noun', 'Singular'], pre: '', post: ' ' }] }],
    ],
    [
      'the dog played',
      'the [<target>dog] played',
      'dog',
      [{ text: 'dog', terms: [{ text: 'dog', tags: ['Noun', 'Singular'], pre: '', post: ' ' }] }],
    ],
    [
      'the big dog played',
      'the [<target>big dog] played',
      'big dog',
      [
        {
          text: 'big dog',
          terms: [
            { text: 'big', tags: ['Comparable', 'Adjective'], pre: '', post: ' ' },
            { text: 'dog', tags: ['Noun', 'Singular'], pre: '', post: ' ' },
          ],
        },
      ],
    ],
    [
      'the big dog played',
      'the [<target>big] dog [<target>played]',
      'big played',
      [
        { text: 'big', terms: [{ text: 'big', tags: ['Comparable', 'Adjective'], pre: '', post: ' ' }] },
        { text: 'played', terms: [{ text: 'played', tags: ['PastTense', 'Verb'], pre: '', post: '' }] },
      ],
    ],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0]).match(a[1])

    const res = doc.byName()
    t.ok(res['target'], "Should contain 'target' group")

    const json = res.target.json()
    const text = res.target.text()

    t.equal(text, a[2])
    t.deepEqual(json, a[3], a[0])
  })

  t.end()
})

test('named-match-overlap', function(t) {
  const arr = [
    {
      input: 'the big dog played',
      match: 'the [<target>#Adjective] [<type>#Noun] [<target>played]',
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
        .byName()
    )
  )

  t.end()
})

test('named-object-match:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', named: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', named: 'target' }], 'played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-object-match-target:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: 'target' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', named: 'target' }], 'dog'],
    ['the dog played', [{ tag: 'Verb', named: 'target' }], 'played'],

    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: 'not-target' }, { word: 'played' }], ''],
    ['the dog played', [{ word: 'dog', named: 'not-target' }], ''],
    ['the dog played', [{ tag: 'Verb', named: 'not-target' }], ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-object-match-number:', function(t) {
  let arr = [
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: '0' }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: 0 }, { word: 'played' }], 'dog'],
    ['the dog played', [{ word: 'dog', named: 0 }], 'dog'],
    ['the dog played', [{ tag: 'Verb', named: 0 }], 'played'],

    ['the dog played', [{ word: 'the' }, { tag: 'Noun', named: 1 }, { word: 'played' }], ''],
    ['the dog played', [{ word: 'dog', named: 1 }], ''],
    ['the dog played', [{ tag: 'Verb', named: 1 }], ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match:', function(t) {
  let arr = [
    ['the dog played', 'the [<target>#Noun] played', 'dog'],
    ['the dog played', 'the [<target>dog] played', 'dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],
    ['the dog played', 'the dog [<target>#Verb]', 'played'],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-target:', function(t) {
  let arr = [
    ['the dog played', 'the [<target>#Noun] played', 'dog'],
    ['the dog played', 'the [<target>dog] played', 'dog'],
    ['the big dog played', 'the [<target>big dog] played', 'big dog'],

    ['the dog played', 'the [<not-target>#Noun] played', ''],
    ['the dog played', 'the [<not-target>dog] played', ''],
    ['the big dog played', 'the [<not-target>big dog] played', ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName('target')

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-number:', function(t) {
  let arr = [
    ['the dog played', 'the [<0>#Noun] played', 'dog'],
    ['the dog played', 'the [<0>dog] played', 'dog'],
    ['the big dog played', 'the [<0>big dog] played', 'big dog'],

    ['the dog played', 'the [<1>#Noun] played', ''],
    ['the dog played', 'the [<1>dog] played', ''],
    ['the big dog played', 'the [<1>big dog] played', ''],
  ]

  arr.forEach(function(a) {
    const doc = nlp(a[0])
      .match(a[1])
      .byName(0)

    const msg = a[0] + ' matches ' + JSON.stringify(a[1]) + ' ' + a[2]
    t.equal(doc.text(), a[2], msg)
  })

  t.end()
})

test('named-match-code-gen', function(t) {
  // Use group as arguments to function
  const group = nlp('the big dog played')
    .match('the [<size>#Adjective] [<type>#Noun] played')
    .byName()

  const codeFromGroup = ({ size, type }) => `size = '${size.text()}'; type = '${type.text()}'`
  t.equal(codeFromGroup(group), "size = 'big'; type = 'dog'", 'Should create code')

  // Convert group to sorted list and use as args
  const args = Object.keys(group)
    .sort((a, b) => a.localeCompare(b))
    .map(k => group[k])

  const codeFromList = (size, type) => `size = '${size.text()}'; type = '${type.text()}'`
  t.equal(codeFromList(...args), "size = 'big'; type = 'dog'", 'Should create code')

  /** Test fancy use of group by names */
  const templates = [
    {
      name: 'SetSize',
      match: '[<type>#Noun] size equals [<size>#Adjective]',
      fn: ({ size, type }) => `${type.text()}.size = ${size.text()}`,
    },
    {
      name: 'If',
      match: 'If [<a>#Verb] equals [<b>#Value] then [<contents>.+]',
      fn: ({ a, b, contents }) => `if(${a.text()} === ${b.text()}){${contents.text()}}`,
    },
  ]

  // Plugin for post processing matches and thunking the output
  const code = Doc => {
    Doc.prototype.toCode = function() {
      let output = ''

      for (let i = 0; i < templates.length; i++) {
        const template = templates[i]

        const res = this.if(template.match)
        if (res.found) {
          output += template.fn(res.byName())
        }
      }

      return output
    }
  }

  let output = nlp
    .clone()
    .extend(code)('if size equals 0 then do this, and this, and this')
    .toCode()
  t.equal(output, 'if(size === 0){do this, and this, and this}')

  // Use code generators
  output = nlp
    .clone()
    .extend(code)('Dog size equals big')
    .toCode()
  t.equal(output, 'Dog.size = big')

  t.end()
})
