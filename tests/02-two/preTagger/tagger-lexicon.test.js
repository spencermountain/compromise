import test from 'tape'
import nlp from '../../lib/two.js'
import isolateModel from '../../lib/isolate-model.js'
const here = '[two/preTagger/tagger-lexicon] '

test('adjusted lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
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
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const doc = nlp('i was farming', { farming: 'Foo' })
  const m = doc.match('farming')
  t.equal(m.has('#Foo'), true, here + 'has new tag')
  t.equal(m.has('#Gerund'), true, here + 'has normal tag')
  t.end()
})

test('look for invalid lexicon items:', function (t) {
  const lex = nlp.world().model.one.lexicon
  Object.keys(lex).forEach(k => {
    if (k.trim() !== k) {
      t.fail(here + `'${k}' has whitespace`)
    }
    if (/[.,-]/.test(k) && lex[k] !== 'Emoticon') {
      t.fail(here + `'${k}' has punctuation`)
    }
  })
  t.end()
})

test('all multi-word items get tagged:', function (t) {
  const lex = nlp.world().model.one.lexicon
  Object.keys(lex).forEach(k => {
    const tag = lex[k]
    if (!k.match(' ') || typeof tag !== 'string' || tag === 'FutureTense') {
      return
    }
    const doc = nlp(k)
    if (!doc.has('^#' + tag + '+$')) {
      t.fail(here + `lex changed : '${k}'`)
    }
    if (doc.isFrozen().found) {
      t.fail(here + ` '${k}' still frozen`)
    }
  })
  t.end()
})
