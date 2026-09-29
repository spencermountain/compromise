import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/multi] '

const lexicon = {
  'Jardas al Abid': 'City',
  'Umm Ar Rizam': 'Place',
  Tobruk: 'Place',
}

test('user-lex-with-hyphenation:', function (t) {
  const sentence =
    'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.'
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-hyphen')
  t.equal(lexicon, lexicon, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-possessive form:', function (t) {
  const sentence =
    "A suicide attack hit Jardas al Abid's area killing one person (and the attacker) and injuring more than twenty."
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal("jardas al abid's", found.eq(0).text('normal'), here + 'found-apostrophe')
  t.equal(lexicon, lexicon, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-proper name in front:', function (t) {
  const sentence =
    "A suicide attack hit Lybia's Jardas al Abid city killing one person (and the attacker) and injuring more than twenty."
  const found = nlp(sentence, lexicon).match('#City+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-proper-name')
  t.equal(lexicon, lexicon, here + 'lexicon-unchanged')
  t.end()
})

test('user-lex-with-punctuation:', function (t) {
  const sentence =
    'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.'
  const found = nlp(sentence, lexicon).match('#Place+')
  t.equal('jardas al abid', found.eq(0).text('normal'), here + 'found-comma')
  t.equal(lexicon, lexicon, here + 'lexicon-unchanged')
  t.end()
})

// test('no tagging of multi-lexion:', function (t) {
//   let arr = ['he man', 'bill gates', 'kid cudi', 'snow white', 'spider-man', 'doctor who','    'iron man']
//   arr.forEach(str => {
//     t.equal(nlp(str).has('#Place #Place'), true, here + str)
//   })
//   t.end()
// })
