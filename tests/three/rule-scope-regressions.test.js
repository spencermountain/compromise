import test from 'tape'
import nlp from './_lib.js'

test('standalone fractions preserve ordinal noun modifiers', t => {
  const fractions = [
    ['a sixteenth', 0.063],
    ['one hundredth', 0.01],
    ['a twenty fifth', 0.04],
    ['one twenty fifth', 0.04],
    ['a twenty fifth of it', 0.04],
  ]
  fractions.forEach(([text, value]) => {
    t.equal(nlp(text).numbers().get()[0], value, text)
  })
  const ordinals = ['a sixteenth birthday', 'a twenty fifth anniversary', 'a first', 'a second']
  ordinals.forEach(text => {
    t.equal(nlp(text).has('#Fraction'), false, text)
  })
  t.end()
})

test('scoped tag corrections preserve nearby verb meanings', t => {
  const cases = [
    ['John & Mary went home', '&', 'ProperNoun'],
    ['John E Smith', 'e', 'Acronym'],
    ['some eat apples', 'some', 'Pronoun'],
    ['some apples fell', 'some', 'Determiner'],
    ['she had put it there', 'there', 'Adverb'],
    ['we have running water', 'running', 'Adjective'],
    ['they are running water through pipes', 'running', 'Gerund'],
    ['she was tired and overworked', 'overworked', 'Adjective'],
    ['she was happy and smiled', 'smiled', 'PastTense'],
    ['she was tired and overslept', 'overslept', 'PastTense'],
    ['they are considering buying houses', 'buying', 'Gerund'],
    ['ruins are enduring symbols of history', 'enduring', 'Adjective'],
    ['they are enduring hardships', 'enduring', 'Gerund'],
    ['i found it isolating', 'isolating', 'Adjective'],
    ['we found it isolating cells', 'isolating', 'Gerund'],
    ['images on a screen like humans do', 'like', 'Preposition'],
    ['cities like New York, Boston, and Toronto', 'like', 'Preposition'],
    ['cities like Boston, Toronto', 'like', 'Preposition'],
    ['dogs like New York', 'like', 'Verb'],
    ['dogs like bones', 'like', 'Verb'],
  ]
  cases.forEach(([text, word, tag]) => {
    t.ok(nlp(text).match(word).has('#' + tag), text)
  })
  t.equal(nlp('we have running water').match('have').has('#Auxiliary'), false, 'lexical have')
  t.equal(nlp('ruins are enduring symbols').match('are').has('#Auxiliary'), false, 'copular are')
  t.end()
})
