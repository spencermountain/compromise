import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/canBe] '

test('canBe', function (t) {
  let doc = nlp(`spencer was going crazy. He walks quickly.`)

  let canBeNoun = doc.canBe('Noun')
  t.equal(canBeNoun.length, 2, here + 'two results')
  t.equal(canBeNoun.terms(0).text('normal'), 'spencer', here + 'first result')
  t.equal(canBeNoun.terms(1).text(), 'He', here + 'first result')

  let canBeVerb = nlp('spencer kelly').canBe('Verb')
  t.equal(canBeVerb.length, 0, here + 'no results')

  let canBeMisc = nlp('spencer kelly').canBe('asdf')
  t.equal(canBeMisc.length, 1, here + 'all results are one')
  t.end()
})
