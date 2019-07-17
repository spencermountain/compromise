var test = require('tape')
var nlp = require('../_lib')

test('canBe', function(t) {
  let doc = nlp(`spencer was going crazy. He walks quickly.`)

  let canBeNoun = doc.canBe('Noun')
  t.equal(canBeNoun.length, 2, 'two results')
  t.equal(canBeNoun.terms(0).normal(), 'spencer', 'first result')
  t.equal(canBeNoun.terms(1).normal(), 'he', 'first result')

  let canBeVerb = nlp('spencer kelly').canBe('Verb')
  t.equal(canBeVerb.length, 0, 'no results')

  let canBeMisc = nlp('spencer kelly').canBe('asdf')
  t.equal(canBeMisc.length, 1, 'all results are one')
  t.end()
})
