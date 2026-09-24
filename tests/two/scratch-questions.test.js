import test from 'tape'
import nlp from './_lib.js'

test('inverted predicates and preposition complements', t => {
  const cases = [
    ['Why did the engine stop?', 'stop', 'Infinitive', 'Noun'],
    ['Does she like chocolate?', 'like', 'Infinitive', 'Preposition'],
    ['When does the store open?', 'open', 'Infinitive', 'Adjective'],
    ['When will the rain stop?', 'stop', 'Infinitive', 'Noun'],
    ['Will the shop open tomorrow?', 'open', 'Infinitive', 'Adjective'],
    ['Why did the engine suddenly stop?', 'stop', 'Infinitive', 'Noun'],
    ['When will the bus stop arrive?', 'stop', 'Noun', 'Verb'],
    ['The store is open.', 'open', 'Adjective', 'Verb'],
    ['Do the bank transfer.', 'transfer', 'Noun', 'Verb'],
    ['He treated them like sons.', 'like', 'Preposition', 'Verb'],
    ['He treated you like family.', 'like', 'Preposition', 'Verb'],
    ['People like you help.', 'like', 'Preposition', 'Verb'],
    ['Send the invoice to billing@example.org.', 'to', 'Preposition', 'Conjunction'],
    ['Send it to https://example.org.', 'to', 'Preposition', 'Conjunction'],
    ['Send it to confirm the order.', 'to', 'Conjunction', 'Preposition'],
  ]
  cases.forEach(([text, word, expected, excluded]) => {
    const term = nlp(text).match(word)
    t.ok(term.has('#' + expected), `${text}: ${expected}`)
    t.notOk(term.has('#' + excluded), `${text}: not ${excluded}`)
  })
  t.end()
})
