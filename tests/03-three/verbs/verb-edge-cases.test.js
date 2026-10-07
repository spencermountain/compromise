import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/verbs/verb-edge-cases] '

test('verbs.json', function (t) {
  const json = nlp('She has called twice, not the tv').verbs().json()
  t.equal(json.length, 1, here + 'one verb')
  t.equal(json[0].verb.negative, false, here + 'not negative')
  t.equal(json[0].verb.root, 'called', here + 'got main verb')
  t.equal(json[0].verb.auxiliary, 'has', here + 'got aux verb')
  t.end()
})

test('verbs.adverbs', function (t) {
  let doc = nlp('spencer is really great! Spencer really really was superb.')
  doc.verbs().adverbs().delete()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', here + 'no-adverbs')

  doc = nlp('spencer truly would really run quickly').verbs().adverbs()
  t.equal(doc.length, 3, 'found all three adverbs')
  t.equal(doc.text('reduced'), 'truly really quickly', here + 'found adverbs in order')

  t.end()
})

test('dont conjugate modals', function (t) {
  let doc = nlp('i may')
  // doc.verbs().toPastTense()
  // t.equal(doc.out(), 'i may have', here + 'may')

  doc = nlp('i would')
  doc.verbs().toFutureTense()
  t.equal(doc.out(), 'i would', here + 'would')

  // doc = nlp('i think he really could.')
  // doc.verbs().toPastTense()
  // t.equal(doc.out(), 'i thought he really could have.', here + 'really could')

  // doc = nlp('everybody ought to.')
  // doc.verbs().toPastTense()
  // t.equal(doc.out(), 'everybody ought to have.', here + 'ought to')

  t.end()
})

test('support punctuation', function (t) {
  let doc = nlp('i go!')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went!', here + 'excl-mark')

  doc = nlp('i go?!')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went?!', here + 'ques-excl-mark')

  doc = nlp('i go; he went.')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went; he went.', here + 'semi-colon')
  t.end()
})

test('adverbs method', function (t) {
  const doc = nlp('i may really go! It is cool.')
  const advb = doc.verbs().adverbs()
  t.equal(advb.text(), 'really', 'found adverb')
  t.end()
})

test('conjugate stable', function (t) {
  const doc = nlp('we fished')
  const res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'fish', here + 'Infinitive conj')
  t.equal(res.PastTense, 'fished', here + 'PastTense conj')
  t.equal(res.PresentTense, 'fishes', here + 'PresentTense conj')
  t.equal(res.FutureTense, 'will fish', here + 'FutureTense conj')
  t.end()
})
