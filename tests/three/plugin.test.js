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
  t.equal(doc.verbs().toGerund().fullSentence().text(), 'is gettin', here + 'toGerund')
  // backwards
  doc = nlp('getts').tag('PresentTense')
  res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'get', here + 'inf-2')
  t.equal(res.PresentTense, 'getts', here + 'pres')
  t.equal(res.PastTense, 'gotten', here + 'past')

  doc = nlp('gettin').tag('Gerund')
  res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'get', here + 'inf-3')

  // reset it
  nlp.plugin({
    irregulars: {
      get: {
        pastTense: 'got',
        presentTense: 'gets',
        gerund: 'getting'
      }
    }
  })
  t.end()
})

test('change adj inflection', function (t) {
  nlp.plugin({
    irregulars: {
      sly: {
        comparative: 'slyer',
        superlative: 'slyest',
      },
      spedorious: {
        comparative: 'speedorier',
        superlative: 'speedoriest',
      }
    }
  })
  let doc = nlp('very sly')
  let res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Comparative, 'slyer', here + 'Comparative')
  t.equal(res.Superlative, 'slyest', here + 'Superlative')

  doc = nlp('spedorious')
  res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Superlative, 'speedoriest', here + 'Superlative')
  t.equal(res.Comparative, 'speedorier', here + 'comparative')
  // backwards
  doc = nlp('speedoriest')
  res = doc.adjectives().conjugate()[0] || {}
  t.equal(res.Adjective, 'spedorious', here + 'past')
  t.end()
})
