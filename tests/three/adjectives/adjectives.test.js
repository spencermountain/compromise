import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/adjectives] '

test('adjectives misc', function (t) {

  const doc = nlp('he is so clear')
  const json = doc.adjectives().json()
  t.equal(json.length, 1, here + 'adj')
  t.equal(json[0].adjective.adverb, 'clearly', here + 'adv')
  t.equal(json[0].adjective.noun, 'clarity', here + 'noun')
  t.equal(json[0].adjective.superlative, 'clearest', here + 'super')
  t.equal(json[0].adjective.comparative, 'clearer', here + 'comp')

  t.end()
})


test('pessimistic conjugation', function (t) {

  const res = nlp('hairy').adjectives().conjugate()[0] || {}
  t.equal(res.Comparative, 'hairier', here + 'comp')
  t.equal(res.Superlative, 'hairiest', here + 'sup')
  // t.ok(!res.Adverb, here + 'no advb')

  t.end()
})
