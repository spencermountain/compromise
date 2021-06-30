const test = require('tape')
const nlp = require('../_lib')

test('pronoun:', function (t) {
  ;[
    ['John', 'he'],
    ['John Smith', 'he'],
    ['Jane', 'she'],
    // ['turtle', 'it'],
    // ['turtles', 'they'],
    // ['Toronto', 'it'],
    // ['studying', 'it'],
    // ['horses', 'they'],
    // ['road bikes', 'they'],
    // ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she'],
    // ['John G. Fishermore Institute', 'it'],
    // ['John Fisher & sons', 'it'],
  ].forEach(function (a) {
    const str = nlp(a[0]).people().pronoun()[0]
    const msg = a[0] + ' -> ' + str
    t.equal(str, a[1], msg)
  })
  t.end()
})

// #Determiner, #Possessive - "his book", "her book", "their book",
// #Adjective, #Possessive - "the book is his", "the book is hers", "the book is theirs",
// #Pronoun, #Object - "the book belongs to him", "the book belongs to her", "the book belongs to them", and for completeness,
// #Pronoun, #Subject - "he owns the book", "she owns the book", "they own the book".

test('to her:', function (t) {
  let doc = nlp('her book belongs to her') //Det ... Pronoun
  // her book...
  let m = doc.match('^her').match('#Determiner').match('#Possessive')
  t.ok(m.found, 'her book - det/poss')

  // ...to her
  m = doc.match('her$').match('#Pronoun').match('#Possessive')
  t.ok(m.found, 'to her - det/poss')
  t.end()
})

test('to him:', function (t) {
  let doc = nlp('his book belongs to him') //Det ... Pronoun
  // his book...
  let m = doc.match('^hi').match('#Determiner').match('#Possessive')
  t.ok(m.found, 'him book - det/poss')

  // ...to him
  m = doc.match('him$').match('#Pronoun').match('#Possessive')
  t.ok(m.found, 'to him - det/poss')
  t.end()
})

test('is his forms:', function (t) {
  let doc = nlp('his book is his') //Det ... Adjective
  //...is his
  let m = doc.match('his$').match('#Adjective').match('#Possessive')
  t.ok(m.found, 'is his - adj/poss')
  t.end()
})

test('is his forms:', function (t) {
  let doc = nlp('her book is hers') //Det ... Adjective
  //...is hers
  let m = doc.match('hers$').match('#Adjective').match('#Possessive')
  t.ok(m.found, 'is hers - adj/poss')
  t.end()
})
