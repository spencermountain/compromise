import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/canBe] '

test('canBe', function (t) {
  const doc = nlp(`spencer was going crazy. He walks quickly.`)

  const canBeNoun = doc.canBe('Noun')
  t.equal(canBeNoun.length, 2, here + 'two results')
  t.equal(canBeNoun.terms(0).text('normal'), 'spencer', here + 'first result')
  t.equal(canBeNoun.terms(1).text(), 'He', here + 'first result')

  const canBeVerb = nlp('spencer kelly').canBe('Verb')
  t.equal(canBeVerb.length, 0, here + 'no results')

  const canBeMisc = nlp('spencer kelly').canBe('asdf')
  t.equal(canBeMisc.length, 1, here + 'all results are one')


  const found = nlp("Moe Sizlak.").terms().canBe('#Verb').found
  t.equal(found, false, here + 'no verb')
  t.end()
})
