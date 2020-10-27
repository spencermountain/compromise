const test = require('tape')
const nlp = require('../_lib')

test('.adjectives():', function (t) {
  let doc = nlp('the really cute cat')
  let m = doc.nouns().adjectives()
  t.equal(m.text(), 'cute', 'cute .')

  doc = nlp('the really cute orange cat')
  m = doc.nouns().adjectives()
  t.equal(m.text(), 'cute orange', 'two adjectives')

  doc = nlp('the cat who was really mean')
  m = doc.nouns().adjectives()
  t.equal(m.text(), 'mean', 'who was really .')

  doc = nlp('the cat that was mean attacked the cute dog')
  m = doc.nouns(0).nouns().adjectives()
  t.equal(m.text(), 'mean', 'first-noun')
  m = doc.nouns(1).nouns().adjectives()
  t.equal(m.text(), 'cute', 'second-noun')

  t.end()
})
