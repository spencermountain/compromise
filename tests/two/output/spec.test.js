import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/spec] '

// behavioural tests for out('spec') / fromSpec / testSpec.
// the closed-world of tags that may appear in the {} slots is
// pinned in tests/three/spec-tags.test.js

test('spec-out basic format', function (t) {
  t.equal(nlp('The dog is nice.').out('spec'), 'The dog is nice. {Det,Noun,Vb,Adj}', here + 'simple sentence')
  t.equal(nlp('').out('spec'), '', here + 'empty doc')

  // one line per sentence
  const lines = nlp('The dog is nice. The cat slept.').out('spec').split('\n')
  t.equal(lines.length, 2, here + 'two sentences, two lines')
  t.equal(lines[0], 'The dog is nice. {Det,Noun,Vb,Adj}', here + 'first line')
  t.equal(lines[1], 'The cat slept. {Det,Noun,Vb}', here + 'second line')
  t.end()
})

test('spec-out one slot per term', function (t) {
  // contractions split into two terms - implicit term still gets a slot
  const doc = nlp(`The dog don't bark.`)
  t.equal(doc.docs[0].length, 5, here + 'contraction makes 5 terms')
  t.equal(doc.out('spec'), `The dog don't bark. {Det,Noun,Vb,Negative,Vb}`, here + 'five slots')

  // slot-count always equals term-count
  const texts = [
    `i can't even believe it`,
    `the dog's tail wagged`,
    `a well-known man walked by`,
    `it is a 3.5 inch disk`,
    `wow, they're here!`,
  ]
  texts.forEach(str => {
    const d = nlp(str)
    const tags = d.out('spec').split('{')[1].replace(/\}$/, '').split(',')
    t.equal(tags.length, d.docs[0].length, here + 'aligned: ' + str)
  })
  t.end()
})

test('spec-out untagged terms', function (t) {
  // .tokenize() skips the tagger - every term is untagged
  const out = nlp.tokenize('the dog barked').out('spec')
  t.equal(out, 'the dog barked {-,-,-}', here + 'dash for untagged terms')
  t.end()
})

test('spec-out braces in text', function (t) {
  const out = nlp('the {cool} dog barked').out('spec')
  t.equal(out, 'the {cool} dog barked {Det,Adj,Noun,Vb}', here + 'literal braces preserved')
  // fromSpec splits on the last brace only
  const doc = nlp.fromSpec(out)
  t.equal(doc.text().trim(), 'the {cool} dog barked', here + 'braces round-trip')
  t.end()
})

test('spec-out newlines in text', function (t) {
  // newlines force a sentence-split, so no line ever contains one
  const shape = /^[^\n{]+ \{[A-Z|,-]+\}$/i
  const out = nlp('spencer is\nreally cool').out('spec')
  const lines = out.split('\n')
  t.equal(lines.length, 2, here + 'newline becomes a sentence break')
  lines.forEach(line => {
    t.match(line, shape, here + 'well-formed line: ' + line)
  })

  // windows line-endings don't leak into the text
  const crlf = nlp('one fish.\r\ntwo fish.').out('spec')
  t.equal(/\r/.test(crlf), false, here + 'no carriage-returns in output')
  crlf.split('\n').forEach(line => {
    t.match(line, shape, here + 'well-formed crlf line')
  })
  t.end()
})

test('fromSpec basic', function (t) {
  const doc = nlp.fromSpec('The dog is nice. {Det,Noun,Vb,Adj}')
  t.equal(doc.text().trim(), 'The dog is nice.', here + 'text recovered')
  t.equal(doc.has('#Determiner #Noun #Verb #Adjective'), true, here + 'tagger ran on ingest')
  t.end()
})

test('fromSpec round-trip', function (t) {
  const spec = nlp('The dog is nice. The cat slept.').out('spec')
  const doc = nlp.fromSpec(spec)
  t.equal(doc.out('spec'), spec, here + 'spec → doc → same spec')
  t.end()
})

test('fromSpec messy input', function (t) {
  // trailing newline, blank lines
  const doc = nlp.fromSpec('The dog is nice. {Det,Noun,Vb,Adj}\n')
  t.equal(doc.text().trim(), 'The dog is nice.', here + 'trailing newline ok')

  const doc2 = nlp.fromSpec('one fish. {Val,Noun}\n\ntwo fish. {Val,Noun}')
  t.equal(doc2.length, 2, here + 'blank line between sentences skipped')

  // empty tag-list
  const doc3 = nlp.fromSpec('hello there {}')
  t.equal(doc3.text().trim(), 'hello there', here + 'empty {} ok')

  // a line with no braces at all keeps its text
  const doc4 = nlp.fromSpec('no braces here')
  t.equal(doc4.text().trim(), 'no braces here', here + 'no-brace line ok')
  t.end()
})

test('testSpec returns only failing lines', function (t) {
  // a passing spec returns an empty doc
  const res = nlp.testSpec('The dog is nice. {Det,Noun,Vb,Adj}', false)
  t.equal(res.found, false, here + 'all-pass returns empty doc')

  // full tag-names work too, not just aliases
  const res2 = nlp.testSpec('The dog is nice. {Determiner,Noun,Verb,Adjective}', false)
  t.equal(res2.found, false, here + 'un-aliased tags pass')

  const spec = [
    'The dog is nice. {Det,Noun,Vb,Adj}',
    'spencer laughed {Noun,Vb}',
    'the cat slept {Vb,Vb,Vb}', // wrong on purpose
  ].join('\n')
  const res3 = nlp.testSpec(spec, false)
  t.equal(res3.length, 1, here + 'one failing line returned')
  t.equal(res3.text().trim(), 'the cat slept', here + 'the failing line')
  t.end()
})

test('testSpec multi-tags with pipes', function (t) {
  // a pipe requires the term to match all of the given tags
  const res = nlp.testSpec('Hikers and cyclists hunted. {Noun|Plural,Conj,Noun,Past}', false)
  t.equal(res.found, false, here + 'pipe + non-root alias tags pass')

  const res2 = nlp.testSpec('Hikers and cyclists hunted. {Noun|Verb,Conj,Noun,Past}', false)
  t.equal(res2.found, true, here + 'impossible pipe combo fails')
  t.end()
})

test('testSpec throwError option', function (t) {
  t.throws(() => {
    nlp.testSpec('the cat slept {Vb,Vb,Vb}', false, true)
  }, here + 'throwError=true throws on a failing line')

  t.doesNotThrow(() => {
    nlp.testSpec('the cat slept {Det,Noun,Vb}', false, true)
  }, here + 'throwError=true silent when passing')
  t.end()
})

test('testSpec messy input', function (t) {
  t.doesNotThrow(() => {
    // dash slots never match a tagged doc, but should not crash
    nlp.testSpec('flurbo glorped {-,Vb}', false)
    // preamble lines, blank lines + trailing newline
    nlp.testSpec('Here are the sentences:\n\nthe dog barked {Det,Noun,Vb}\n', false)
  }, here + 'messy specs do not throw')

  const res = nlp.testSpec('Here is a preamble:\nthe dog barked {Det,Noun,Vb}', false)
  t.equal(res.text().trim(), 'Here is a preamble:', here + 'tagless preamble line counts as failing')
  t.end()
})
