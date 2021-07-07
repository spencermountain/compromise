const test = require('tape')
const nlp = require('./_lib')

test('bestTag', function (t) {
  let str = 'john smith was really working'
  let m = nlp(str)
  let have = m
    .terms()
    .json({ terms: { bestTag: true } })
    .map(p => p.terms[0].bestTag)
  let want = ['MaleName', 'LastName', 'Copula', 'Adverb', 'Gerund']
  let msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, msg)

  str = 'he sang in June'
  m = nlp(str)
  have = m
    .terms()
    .json({ terms: { bestTag: true } })
    .map(p => p.terms[0].bestTag)
  want = ['Pronoun', 'PastTense', 'Preposition', 'Month']
  msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, msg)

  str = 'fastest shooter in Canada'
  m = nlp(str)
  have = m
    .terms()
    .json({ terms: { bestTag: true } })
    .map(p => p.terms[0].bestTag)
  want = ['Superlative', 'Singular', 'Preposition', 'Country']
  msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, msg)

  t.end()
})
