import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/nouns/noun-adjectives] '

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

test(here + 'attributive adjectives exclude adverbs and determiners', t => {
  const cases = [
    ['the cat', ''],
    ['a small cat', 'small'],
    ['the very small cat', 'small'],
    ['the large red car', 'large red'],
    ['a remarkably beautiful painting', 'beautiful'],
    ['the happy and playful dog', 'happy playful'],
    ['the three small dogs', 'small'],
    ['my old shoes', 'old'],
    ['the smallest cat', 'smallest'],
    ['a bigger house', 'bigger'],
    ['', ''],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    t.equal(doc.nouns().adjectives().text(), expected, here + input)
    t.equal(doc.text(), input, here + 'selection preserves input: ' + input)
  })
  t.end()
})

test(here + 'adjectives belong to the selected noun phrase', t => {
  const doc = nlp('The small cat chased the noisy dog.')
  t.equal(doc.nouns(0).adjectives().text(), 'small', here + 'subject adjective')
  t.equal(doc.nouns(1).adjectives().text(), 'noisy', here + 'object adjective')
  t.equal(doc.match('missing').nouns().adjectives().length, 0, here + 'empty selection')
  const plain = nlp('The cat chased the noisy dog.')
  t.equal(plain.nouns(0).adjectives().text(), '', here + 'does not borrow another noun adjective')
  t.equal(plain.nouns(1).adjectives().text(), 'noisy', here + 'later noun retains its adjective')
  t.end()
})
