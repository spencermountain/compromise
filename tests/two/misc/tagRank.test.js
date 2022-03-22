import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/bestTag] '

test('bestTag', function (t) {
  let str = 'john smith was really working'
  let m = nlp(str).compute('tagRank')
  let have = m.json()[0].terms.map(term => term.tagRank[0])
  let want = ['MaleName', 'LastName', 'Copula', 'Adverb', 'Gerund']
  let msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, here + msg)

  str = 'he sang in June'
  m = nlp(str).compute('tagRank')
  have = m.json()[0].terms.map(term => term.tagRank[0])
  want = ['Pronoun', 'PastTense', 'Preposition', 'Month']
  msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, here + msg)

  str = 'fastest shooter in Canada'
  m = nlp(str).compute('tagRank')
  have = m.json()[0].terms.map(term => term.tagRank[0])
  want = ['Superlative', 'Singular', 'Preposition', 'Country']
  msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, here + msg)

  t.end()
})

test('bestTag-unknown', function (t) {
  let str = 'john smith'
  let m = nlp(str)
  m.tag('Foo Bar')
  m.compute('tagRank')
  let have = m.json()[0].terms.map(term => term.tagRank[0])
  let want = ['Foo', 'Bar']
  let msg = str + ' - [' + have.join(', ') + ']'
  t.deepEqual(have, want, here + msg)
  t.end()
})
