import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/replace-remove] '

// Issues left open in replaceWith(), remove() and implicit text. These lines fail today.

// {possessives:true} adds an 's, without checking the new text
test(here + 'a replacement that is already possessive', t => {
  let doc = nlp(`Tom's dog sat.`)
  doc.people().replaceWith(`Bob's`, { possessives: true })
  t.equal(doc.text(), `Bob's dog sat.`, here + 'plain input')

  doc = nlp(`Tom's dog sat.`)
  doc.replace('[<who>#Person]', 'mr $who', { possessives: true })
  t.equal(doc.text(), `mr Tom's dog sat.`, here + 'group input')
  t.end()
})

// overlapping pointers remove the same terms twice, and this deletes the words after them
test(here + 'overlapping views', t => {
  let doc = nlp('one two three four five')
  let m = doc.match('two three').concat(doc.match('three four'))
  m.remove('three')
  t.equal(doc.text(), 'one two four five', here + 'removing a shared term')

  doc = nlp('one two three four five')
  m = doc.match('two three').concat(doc.match('three four'))
  m.remove()
  t.equal(doc.text(), 'one five', here + 'removing both views')

  doc = nlp('one two three four five')
  m = doc.match('two three').concat(doc.match('three four'))
  m.replaceWith('x')
  t.equal(doc.has('five'), true, here + 'replacing both keeps the next word')
  t.end()
})

// insertions use only the first sentence of their input, and drop the rest
test(here + 'two sentences as input', t => {
  let doc = nlp('foo bar')
  doc.match('foo').replaceWith('one two. three four')
  t.equal(doc.text(), 'one two. three four bar', here + 'replaceWith')

  doc = nlp('foo bar')
  doc.match('foo').append('one two. three four')
  t.equal(doc.text(), 'foo one two. three four bar', here + 'append')
  t.end()
})

// a group that took no part in a match should be empty, as in String.replace
test(here + 'an unused group', t => {
  const doc = nlp('tom came. sue left.')
  doc.replace('[<a>(tom|sue)] [<b>came]?', '$a $b')
  t.equal(doc.text(), 'tom came. sue left.', here + 'optional group')
  t.end()
})

test(here + 'implicit text', t => {
  t.equal(nlp(`She wasn't.`).text('implicit'), 'She was not.', here + 'no trailing space')
  t.equal(nlp(`Isn't he happy?`).text('implicit'), 'Is not he happy?', here + 'keeps title case')
  t.end()
})
