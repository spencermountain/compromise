import test from 'tape'
import nlp from '../../_lib.js'
import isolateModel from '../../../_lib/isolate-model.js'
const here = '[two/integration/tag/multi] '

const lexicon = {
  'Jardas al Abid': 'City',
  'Umm Ar Rizam': 'Place',
  Tobruk: 'Place',
}

test('user-lex-with-hyphenation:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const sentence =
    'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.'
  const original = { ...lexicon }
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-hyphen')
  t.deepEqual(lexicon, original, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-possessive form:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const sentence =
    "A suicide attack hit Jardas al Abid's area killing one person (and the attacker) and injuring more than twenty."
  const original = { ...lexicon }
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal("jardas al abid's", found.eq(0).text('normal'), here + 'found-apostrophe')
  t.deepEqual(lexicon, original, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-proper name in front:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const sentence =
    "A suicide attack hit Lybia's Jardas al Abid city killing one person (and the attacker) and injuring more than twenty."
  const original = { ...lexicon }
  const found = nlp(sentence, lexicon).match('#City+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-proper-name')
  t.deepEqual(lexicon, original, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-punctuation:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const sentence =
    'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.'
  const original = { ...lexicon }
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-comma')
  t.deepEqual(lexicon, original, here + 'lexicon-unchanged')
  t.end()
})

// test('no tagging of multi-lexion:', function (t) {
//   let arr = ['he man', 'bill gates', 'kid cudi', 'snow white', 'spider-man', 'doctor who','    'iron man']
//   arr.forEach(str => {
//     t.equal(nlp(str).has('#Place #Place'), true, here + str)
//   })
//   t.end()
// })
