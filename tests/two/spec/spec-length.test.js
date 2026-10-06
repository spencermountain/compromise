import test from 'tape'
import nlp from '../_lib.js'

test('spec tag blocks require exactly one slot per term', t => {
  const failures = [
    'the cat slept {Det}',
    'the cat slept {Noun}',
    'the cat slept {Vb}',
    'the cat slept {Det,Noun}',
    'the cat slept {.,.,.,.}',
    'the cat slept {}',
    'the cat slept {Det,,Noun,Vb}',
    'the cat slept {Det,Noun,}',
    "she didn't walk {.,.,.}",
    'well-known {Adj}',
  ]
  failures.forEach(spec => {
    t.equal(nlp.testSpec(spec, false).found, true, spec)
  })
  const passes = [
    'the cat slept {Det,Noun,Vb}',
    'the cat slept {.,.,.}',
    'the cat slept {.,Noun,!Noun}',
    'the cat slept! {.,.,.} # punctuation has no slot',
    "she didn't walk {.,.,.,.}",
    'well-known {.,.}',
  ]
  passes.forEach(spec => {
    t.equal(nlp.testSpec(spec, false).found, false, spec)
  })
  t.throws(() => nlp.testSpec('the cat slept {Noun}', false, true), /expected 1 terms, got 3/, 'short list reports count')
  t.throws(() => nlp.testSpec('slept {.,.}', false, true), /expected 2 terms, got 1/, 'long list reports count')
  t.equal(nlp.testSpec('the cat slept', false, true).text(), 'the cat slept', 'tagless text retained without validation')
  t.equal(nlp.fromSpec('the cat slept {Noun}').text().trim(), 'the cat slept', 'fromSpec does not validate lengths')
  t.end()
})
