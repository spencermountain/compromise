import test from 'tape'
import nlp from '../_lib.js'

test('phrasal verbs do not consume half of off-white', t => {
  for (const input of ['is off-white', 'the wall is off-white']) {
    const doc = nlp(input)
    t.ok(doc.has('(is && #Copula)'), input + ': copula')
    t.ok(doc.has('(off && #Adjective) (white && #Adjective)'), input + ': adjective')
    t.notOk(doc.has('#PhrasalVerb'), input + ': no phrasal verb')
  }
  for (const input of ['is off', 'turned off', 'rolling around', 'the light is off', 'turn-off']) {
    t.ok(nlp(input).has('#PhrasalVerb'), input + ': phrasal verb preserved')
  }
  t.end()
})

test('off-white works in noun phrases and retains punctuation', t => {
  for (const input of ['off-white', 'an off-white wall', 'The walls are off-white.']) {
    const doc = nlp(input)
    t.equal(doc.text(), input, 'unchanged text: ' + input)
    t.ok(doc.has('(off && #Adjective) (white && #Adjective)'), 'compound adjective: ' + input)
    t.notOk(doc.has('#PhrasalVerb'), 'no partial phrasal match: ' + input)
    t.equal(doc.match('#Hyphenated').wordCount(), 2, 'both halves retain hyphen tags: ' + input)
  }
  t.end()
})
