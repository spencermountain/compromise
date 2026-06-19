import test from 'tape'
import nlp from './_lib.js'

const here = '[three/extend] '
const key = 'compromiseExtendPollution'

const cleanup = () => {
  delete Object.prototype[key]
}

test('model merge ignores __proto__', function (t) {
  cleanup()
  nlp.extend({ model: { ['__proto__']: { [key]: 'yes' } } })
  t.equal(Object.prototype[key], undefined, here + '__proto__')
  cleanup()
  t.end()
})

test('model merge ignores constructor.prototype', function (t) {
  cleanup()
  nlp.extend({ model: { constructor: { prototype: { [key]: 'yes' } } } })
  t.equal(Object.prototype[key], undefined, here + 'constructor.prototype')
  cleanup()
  t.end()
})

test('model merge ignores prototype key', function (t) {
  cleanup()
  nlp.extend({ model: { prototype: { [key]: 'yes' } } })
  t.equal(Object.prototype[key], undefined, here + 'prototype key')
  cleanup()
  t.end()
})

test('methods merge ignores unsafe keys', function (t) {
  cleanup()
  nlp.extend({
    methods: {
      ['__proto__']: { [key]: 'yes' },
      constructor: { prototype: { [key]: 'yes' } },
      prototype: { [key]: 'yes' },
    },
  })
  t.equal(Object.prototype[key], undefined, here + 'methods merge')
  cleanup()
  t.end()
})

test('model merge still works', function (t) {
  nlp.extend({
    model: {
      two: {
        lexicon: {
          phrasalVerbs: {
            'extend-test-verb': ['up'],
          },
        },
      },
    },
  })

  t.deepEqual(
    nlp.model().two.lexicon.phrasalVerbs['extend-test-verb'],
    ['up'],
    here + 'legitimate merge'
  )
  t.end()
})
