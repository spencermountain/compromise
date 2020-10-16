const test = require('tape')
const nlp = require('../_lib')

test('verbs.json', function (t) {
  let json = nlp('She has called twice, not the tv').verbs().json()
  t.equal(json.length, 1, 'one verb')
  t.equal(json[0].isNegative, false, 'not negative')
  t.equal(json[0].parts.verb, 'called', 'got main verb')
  t.equal(json[0].parts.auxiliary, 'has', 'got aux verb')
  t.end()
})

test('verbs.adverbs', function (t) {
  let doc = nlp('spencer is really great! Spencer really really was superb.')
  doc.verbs().adverbs().delete()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')

  doc = nlp('spencer truly would really run quickly').verbs().adverbs()
  t.equal(doc.length, 3, 'found all three adverbs')
  t.equal(doc.text('reduced'), 'truly really quickly', 'found adverbs in order')

  t.end()
})

test('dont conjugate modals', function (t) {
  let doc = nlp('i may')
  doc.verbs().toPastTense()
  t.equal(doc.out(), 'i may have', 'may')

  doc = nlp('i think he really could.')
  doc.verbs().toPastTense()
  t.equal(doc.out(), 'i thought he really could have.', 'really could')

  doc = nlp('everybody ought to.')
  doc.verbs().toPastTense()
  t.equal(doc.out(), 'everybody ought to have.', 'ought to')

  t.end()
})

test('support punctuation', function (t) {
  let doc = nlp('i go!')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went!', 'excl-mark')

  doc = nlp('i go?!')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went?!', 'ques-excl-mark')

  doc = nlp('i go; he went.')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'i went; he went.', 'semi-colon')
  t.end()
})

test('was shocked looking at', function (t) {
  let doc = nlp('i was shocked looking at the race')
  let verbs = doc.verbs()
  t.equal(verbs.length, 2, 'split into two')
  t.equal(verbs.eq(0).text(), 'was shocked', 'first verb')
  t.equal(verbs.eq(1).text(), 'looking', 'first verb')
  t.end()
})
// test('detect participle in past-tense', function (t) {
//   let doc = nlp('everybody ought to swim.')
//   doc.verbs().toPastTense()
//   t.equal(doc.out(), 'everybody ought to have swam.', 'ought to swim')

//   doc = nlp('i think he really could have.')
//   doc.verbs().toPastTense()
//   t.equal(doc.out(), 'i thought he really could have.', 'really could')

//   t.end()
// })
