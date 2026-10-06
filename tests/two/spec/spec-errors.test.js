import test from 'tape'
import nlp from '../_lib.js'

test('testSpec returns diagnostics alongside its View', t => {
  const result = nlp.testSpec('# heading\n\nthe cat slept {.,!Noun,Adj}\nplain text\nslept {Vb}', false)
  t.equal(result.failures.length, 2, 'all mismatching terms reported')
  const [noun, verb] = result.failures
  t.equal(noun.line, 3, 'source line counts blank lines and comments')
  t.equal(noun.text, 'the cat slept', 'sentence text retained')
  t.equal(noun.code, 'tags', 'tag mismatch code')
  t.equal(noun.term, 2, 'one-based term position')
  t.equal(noun.word, 'cat', 'term text')
  t.deepEqual(noun.expected, ['!Noun'], 'original constraint')
  t.ok(noun.actual.includes('Noun'), 'actual canonical tags')
  t.ok(noun.message.includes('unexpected #Noun'), 'readable forbidden-tag message')
  t.equal(verb.term, 3, 'second mismatch position')
  t.ok(verb.message.includes('missing #Adj'), 'readable missing-tag message')
  t.ok(result.has('cat'), 'View methods still work')
  t.ok(result.has('plain text'), 'tagless text retained')
  t.equal(nlp.testSpec('plain text', false).failures.length, 0, 'tagless lines are not errors')
  t.deepEqual(nlp.testSpec('slept {Vb}', false).failures, [], 'passing spec has no errors')
  t.deepEqual(nlp.testSpec('# comment\n', false).failures, [], 'comments have no errors')
  t.end()
})

test('spec errors describe counts, syntax, and implicit terms', t => {
  const short = nlp.testSpec('the cat slept {Det}', false).failures[0]
  t.equal(short.code, 'length', 'length mismatch code')
  t.equal(short.expected, 1, 'expected count')
  t.equal(short.actual, 3, 'actual count')
  const long = nlp.testSpec('slept {.,.}', false).failures[0]
  t.equal(long.expected, 2, 'extra slot expected count')
  t.equal(long.actual, 1, 'extra slot actual count')
  const invalid = nlp.testSpec('slept {Vb?}', false).failures[0]
  t.equal(invalid.code, 'syntax', 'invalid syntax code')
  t.deepEqual(invalid.expected, ['Vb?'], 'invalid slot retained')
  const implicit = nlp.testSpec("she didn't walk {.,.,Noun,.}", false).failures[0]
  t.equal(implicit.word, 'not', 'implicit contraction text')
  t.equal(implicit.term, 3, 'implicit term position')
  const result = nlp.testSpec('slept {!Vb}', false)
  const original = JSON.stringify(result.failures)
  result.tag('Noun')
  t.equal(JSON.stringify(result.failures), original, 'diagnostics remain a snapshot')
  t.throws(() => nlp.testSpec('slept {!Vb}', false, true), /unexpected #Vb/, 'throw includes the same diagnostic')
  t.end()
})
