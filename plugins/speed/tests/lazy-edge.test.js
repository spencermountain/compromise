import test from 'tape'
import { nlp, words } from './edge-lib.js'

test('lazy matching preserves optional, negative, repeated, and anchored matches', t => {
  const input = 'A red cat sleeps. A blue dog runs. The cat runs quickly. Birds fly. '
  const patterns = [
    '^a', 'sleeps$', 'cat?', 'cat*', 'cat+', 'red? cat', '!red cat',
    '(cat|dog)', '(cat|#Verb)', '/^c/', '#Noun+', '#Verb #Adverb?',
    'a . #Noun', 'missing? #Verb', 'missing #Verb', '(red|blue) #Noun',
  ]
  patterns.forEach(pattern => {
    const expected = nlp(input).match(pattern)
    const actual = nlp.lazy(input, pattern)
    t.deepEqual(words(actual), words(expected), 'matches: ' + pattern)
    t.equal(actual.text(), expected.text(), 'punctuation and spacing: ' + pattern)
  })
  t.end()
})

test('lazy filters are reusable across different documents and network rules', t => {
  const nets = [
    nlp.buildNet([{ match: 'cat' }, { match: '#Verb' }]),
    nlp.buildNet([{ match: 'missing' }, { match: '/bird/' }]),
    nlp.buildNet([{ match: 'cat?' }, { match: 'dog' }]),
    nlp.buildNet([{ match: 'red cat' }, { match: 'blue dog' }]),
    nlp.buildNet([]),
  ]
  const inputs = ['A red cat sleeps.', 'A blue dog runs.', 'A bird flies.', '', 'Nothing matches.']
  nets.forEach((net, i) => {
    inputs.forEach(input => {
      t.deepEqual(words(nlp.lazy(input, net)), words(nlp(input).match(net)), `network ${i}: ${input}`)
    })
  })
  const texts = ["He can't go. She won't stay.", 'We can go. They stay.', '', 'He goes home.']
  texts.forEach(input => {
    t.equal(nlp.lazy(input, 'go').text(), nlp(input).match('go').text(), 'reused string filter: ' + input)
  })
  t.end()
})
