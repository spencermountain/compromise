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
  t.end()
})

test('change adj inflection', function (t) {
  nlp.plugin({
    irregulars: {
      sly: {
        comparative: 'slyer',
        superlative: 'slyest',
        // noun: 'slyness',
        // adverb: 'slyly'
      }
    }
  })
  let doc = nlp('very sly')
  let res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Comparative, 'slyer', here + 'past')
  t.equal(res.Superlative, 'slyest', here + 'present')
  // t.equal(res.Noun, 'slyness', here + 'present')
  // t.equal(res.Adverb, 'slyly', here + 'present')
  t.end()
})
