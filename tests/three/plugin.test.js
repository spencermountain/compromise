import test from 'tape'
import nlp from './_lib.js'
const here = '[three/plugin] '

test('change verb conjugation', function (t) {
  nlp.plugin({
    irregulars: {
      get: {
        pastTense: 'gotten',
        presentTense: 'getts',
        gerund: 'gettin'
      }
    }
  })
  let doc = nlp('gotten')
  let res = doc.verbs().conjugate()[0]
  t.equal(res.PastTense, 'gotten', here + 'past')
  t.equal(res.PresentTense, 'getts', here + 'present')
  t.equal(doc.verbs().toGerund().text(), 'is gettin', here + 'toGerund')
  // backwards
  doc = nlp('getts').tag('PresentTense')
  res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'get', here + 'inf-2')
  t.equal(res.PresentTense, 'getts', here + 'pres')
  t.equal(res.PastTense, 'gotten', here + 'past')

  doc = nlp('gettin').tag('Gerund')
  res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'get', here + 'inf-3')
  t.end()
})

test('change adj inflection', function (t) {
  nlp.plugin({
    irregulars: {
      sly: {
        comparative: 'slyer',
        superlative: 'slyest',
      },
      fast: {
        comparative: 'speedier',
        superlative: 'speediest',
      }
    }
  })
  let doc = nlp('very sly')
  let res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Comparative, 'slyer', here + 'Comparative')
  t.equal(res.Superlative, 'slyest', here + 'Superlative')
  // t.equal(res.Noun, 'slyness', here + 'present')
  // t.equal(res.Adverb, 'slyly', here + 'present')

  doc = nlp('fast')
  res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Superlative, 'speediest', here + 'Superlative')
  t.equal(res.Comparative, 'speedier', here + 'comparative')
  // backwards
  doc = nlp('speediest')
  res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Adjective, 'fast', here + 'past')
  t.end()
})
