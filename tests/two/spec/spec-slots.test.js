import test from 'tape'
import nlp from '../_lib.js'
import assertSpec from '../_spec.js'

test('spec slots support negative tags and one-term wildcards', t => {
  const passing = [
    'slept {!Noun}',
    'slept {!#Noun}',
    'slept {!Adj}',
    'slept {!#Adj}',
    'slept {Vb|!Noun}',
    'slept {#Vb|!#Noun}',
    'slept {.}',
    'slept {.|!Noun}',
    'the cat slept {.,Noun,.}',
    "she didn't walk {.,.,!Noun,.}",
  ]
  assertSpec(t, passing)
  const failing = [
    'slept {!Verb}',
    'slept {!#Verb}',
    'slept {!Vb}',
    'slept {!#Vb}',
    'slept {Vb|!Past}',
    'slept {.|!Vb}',
    'the cat slept {.,!Noun,.}',
    'slept {.,.}',
    'slept {.*}',
    'slept {Vb?}',
  ]
  failing.forEach(spec => {
    t.equal(nlp.testSpec(spec, false).found, true, spec)
  })
  t.throws(() => nlp.testSpec('slept {!Vb}', false, true), /slept/, 'negation respects throwError')
  t.equal(nlp.testSpec('slept', false, true).text(), 'slept', 'tag block remains optional')
  t.end()
})

test('spec assertions report one simple spec per failing sentence', t => {
  const results = []
  const capture = { equal: (actual, expected, message) => results.push({ actual, expected, message }) }
  assertSpec(capture, 'the cat slept {.,!Noun,Adj}')
  t.equal(results.length, 1, 'multiple mismatches produce one assertion')
  t.equal(results[0].actual, true, 'failed assertion recorded')
  t.equal(results[0].expected, false, 'assertion expects passing spec')
  t.equal(results[0].message, 'the cat slept {Det,Noun,Vb}', 'failure message shows actual tagging in spec format')
  t.end()
})
