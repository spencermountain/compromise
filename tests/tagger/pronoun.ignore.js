var test = require('tape')
var nlp = require('../_lib')

test('to her:', function(t) {
  let doc = nlp('her book belongs to her') //Det ... Pronoun
  // her book...
  let m = doc
    .match('^her')
    .match('#Determiner')
    .match('#Possessive')
  t.ok(m.found, 'her book - det/poss')

  // ...to her
  m = doc
    .match('her$')
    .match('#Pronoun')
    .match('#Possessive')
  t.ok(m.found, 'to her - det/poss')
  t.end()
})

test('to him:', function(t) {
  let doc = nlp('his book belongs to him') //Det ... Pronoun
  // his book...
  let m = doc
    .match('^hi')
    .match('#Determiner')
    .match('#Possessive')
  t.ok(m.found, 'him book - det/poss')

  // ...to him
  m = doc
    .match('him$')
    .match('#Pronoun')
    .match('#Possessive')
  t.ok(m.found, 'to him - det/poss')
  t.end()
})

test('is his forms:', function(t) {
  let doc = nlp('his book is his') //Det ... Adjective
  //...is his
  let m = doc
    .match('his$')
    .match('#Adjective')
    .match('#Possessive')
  t.ok(m.found, 'is his - adj/poss')
  t.end()
})

test('is his forms:', function(t) {
  let doc = nlp('her book is hers') //Det ... Adjective
  //...is hers
  let m = doc
    .match('hers$')
    .match('#Adjective')
    .match('#Possessive')
  t.ok(m.found, 'is hers - adj/poss')
  t.end()
})
