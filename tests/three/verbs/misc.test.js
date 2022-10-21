import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-misc] '

test('verbs.json', function (t) {
  let json = nlp('She has called twice, not the tv').verbs().json()
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
  let doc = nlp('i may really go! It is cool.')
  let advb = doc.verbs().adverbs()
  t.equal(advb.text(), 'really', 'found adverb')
  t.end()
})

test('conjugate stable', function (t) {
  let doc = nlp('we fished')
  let res = doc.verbs().conjugate()[0]
  t.equal(res.Infinitive, 'fish', here + 'Infinitive conj')
  t.equal(res.PastTense, 'fished', here + 'PastTense conj')
  t.equal(res.PresentTense, 'fish', here + 'PresentTense conj')
  t.equal(res.FutureTense, 'will fish', here + 'FutureTense conj')
  t.end()
})

// test('was shocked looking at', function (t) {
//   let doc = nlp('i was shocked looking at the race')
//   let verbs = doc.verbs()
//   t.equal(verbs.length, 2, 'split into two')
//   t.equal(verbs.eq(0).text(), 'was shocked', 'first verb')
//   t.equal(verbs.eq(1).text(), 'looking', 'first verb')
//   t.end()
// })
// test('detect participle in past-tense', function (t) {
//   let doc = nlp('everybody ought to swim.')
//   doc.verbs().toPastTense()
//   t.equal(doc.out(), 'everybody ought to have swam.', 'ought to swim')

//   doc = nlp('i think he really could have.')
//   doc.verbs().toPastTense()
//   t.equal(doc.out(), 'i thought he really could have.', 'really could')

//   t.end()
// })
