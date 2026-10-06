import test from 'tape'
import nlp from '../../_lib.js'
import isolateModel from '../../../_lib/isolate-model.js'

const here = '[three/api/plugins/merge] '
const key = 'compromiseExtendPollution'

const cleanup = t => {
  const original = Object.getOwnPropertyDescriptor(Object.prototype, key)
  t.teardown(() => {
    if (original) {
      Object.defineProperty(Object.prototype, key, original)
    } else {
      delete Object.prototype[key]
    }
  })
  delete Object.prototype[key]
}

test('model merge ignores __proto__', function (t) {
  cleanup(t)
  nlp.extend({ model: { ['__proto__']: { [key]: 'yes' } } })
  t.equal(Object.prototype[key], undefined, here + '__proto__')
  t.end()
})

test('model merge ignores constructor.prototype', function (t) {
  cleanup(t)
  nlp.extend({ model: { constructor: { prototype: { [key]: 'yes' } } } })
  t.equal(Object.prototype[key], undefined, here + 'constructor.prototype')
  t.end()
})

test('model merge ignores prototype key', function (t) {
  cleanup(t)
  nlp.extend({ model: { prototype: { [key]: 'yes' } } })
  t.equal(Object.prototype[key], undefined, here + 'prototype key')
  t.end()
})

test('methods merge ignores unsafe keys', function (t) {
  cleanup(t)
  nlp.extend({
    methods: {
      ['__proto__']: { [key]: 'yes' },
      constructor: { prototype: { [key]: 'yes' } },
      prototype: { [key]: 'yes' },
    },
  })
  t.equal(Object.prototype[key], undefined, here + 'methods merge')
  t.end()
})

test('model merge still works', function (t) {
  isolateModel(t, nlp.model().two, ['lexicon'])
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
