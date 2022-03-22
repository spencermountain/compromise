import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/lexicon] '

test('adjusted lexicon:', function (t) {
  //place new words
  let lexicon = {
    geneva: 'Person',
    lkjj: 'Adjective',
    'donkey kong': 'City',
  }

  const arr = [
    ['geneva is nice', '#Person #Copula #Adjective'],
    ['he is lkjj', '#Pronoun #Copula #Adjective'],
    ['donkey kong wins the award', '#City #City #Verb #Determiner #Noun'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0], lexicon)
    t.equal(doc.has(a[1]), true, here + a[0])
  })
  //
  //set gender from lexicon
  const doc = nlp('Abbi', lexicon)
  t.equal(doc.has('#FemaleName'), true, here + 'abbi-female')
  //set as male:
  lexicon = {
    kelly: 'MaleName',
  }
  const doc2 = nlp('Kelly', lexicon)
  t.equal(doc2.has('#MaleName'), true, here + 'kelly-male')

  //gender follows lumping
  const doc3 = nlp('Kelly Gruber', lexicon)
  t.equal(doc3.has('#MaleName #LastName'), true, here + 'kelly-gruber')

  t.end()
})

test('allow orthagonal tags:', function (t) {
  let doc = nlp('i was farming', { farming: 'Foo' })
  let m = doc.match('farming')
  t.equal(m.has('#Foo'), true, here + 'has new tag')
  t.equal(m.has('#Gerund'), true, here + 'has normal tag')
  t.end()
})

