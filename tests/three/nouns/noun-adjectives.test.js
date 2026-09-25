import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-adjectives] '

test('.adjectives():', function (t) {
  let doc = nlp('the really cute cat')
  let m = doc.nouns().adjectives()
  t.equal(m.text(), 'cute', here + 'cute .')

  doc = nlp('the really cute orange cat')
  m = doc.nouns().adjectives()
  t.equal(m.text(), 'cute orange', here + 'two adjectives')

  // doc = nlp('the cat who was really mean')
  // m = doc.nouns().adjectives()
  // t.equal(m.text(), 'mean', here + 'who was really .')

  doc = nlp('the cat that was mean attacked the cute dog')
  // m = doc.nouns(0).adjectives()
  // t.equal(m.text(), 'mean', here + 'first-noun')
  m = doc.nouns(1).adjectives()
  t.equal(m.text(), 'cute', here + 'second-noun')

  t.end()
})
