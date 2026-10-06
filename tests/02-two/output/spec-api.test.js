import test from 'tape'
import nlp from '../_lib.js'
import assertSpec from '../_spec.js'
const here = '[two/output/spec-api] '

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

  const res = nlp.testSpec('Here is a preamble:\nthe dog barked {Det,Noun,Vb}', false, true)
  t.equal(res.text().trim(), 'Here is a preamble:', here + 'tagless preamble is retained without failing')
  t.end()
})

test('spec comments are ignored on ingest', function (t) {
  const doc = nlp.fromSpec('The dog is nice. {Det,Noun,Vb,Adj} # a note about this line')
  t.equal(doc.text().trim(), 'The dog is nice.', here + 'comment not part of the text')
  t.equal(doc.has('#Determiner #Noun #Verb #Adjective'), true, here + 'tags still parsed')

  // commented and un-commented specs produce the same doc
  const spec = 'The dog is nice. {Det,Noun,Vb,Adj}\nThe cat slept. {Det,Noun,Vb}'
  const commented = ['The dog is nice. {Det,Noun,Vb,Adj} # first', 'The cat slept. {Det,Noun,Vb} # second'].join('\n')
  t.equal(nlp.fromSpec(commented).out('spec'), spec, here + 'comments round-trip away')

  // a comment on some lines only
  const mixed = 'one fish. {Val,Noun} # numbered\ntwo fish. {Val,Noun}'
  t.equal(nlp.fromSpec(mixed).length, 2, here + 'mixed commented/plain lines')
  t.end()
})

test('spec comment whitespace forms', function (t) {
  const forms = [
    'the dog barked {Det,Noun,Vb} # spaced comment',
    'the dog barked {Det,Noun,Vb}#no-space',
    'the dog barked {Det,Noun,Vb}\t# tabbed',
    'the dog barked {Det,Noun,Vb} #',
    'the dog barked {Det,Noun,Vb} # trailing space   ',
  ]
  forms.forEach(str => {
    t.equal(nlp.fromSpec(str).text().trim(), 'the dog barked', here + 'text clean: ' + str)
    t.equal(nlp.testSpec(str, false).found, false, here + 'tags still pass: ' + str)
  })
  t.end()
})

test('spec comments vs braces and hashtags', function (t) {
  // literal braces in the sentence, plus a comment
  const doc = nlp.fromSpec('the {cool} dog barked {Det,Adj,Noun,Vb} # nice one')
  t.equal(doc.text().trim(), 'the {cool} dog barked', here + 'braces in text survive a comment')

  // the tag-block is the last {} on the line - a '#' before it is text, not a comment
  const doc2 = nlp.fromSpec('the {cool} #hiking dog {Det,Adj,HashTag,Noun}')
  t.equal(doc2.text().trim(), 'the {cool} #hiking dog', here + 'braces then a hashtag, no comment')
  t.equal(
    nlp.testSpec('the {cool} #hiking dog {Det,Adj,HashTag,Noun}', false).found,
    false,
    here + 'tags read from the last {}'
  )

  // a leading '#' takes precedence over a tag-block
  const doc3 = nlp.fromSpec('#hiking is fun {HashTag,Vb,Adj}')
  t.equal(doc3.found, false, here + 'leading hashtag is a comment line')
  t.equal(
    nlp.testSpec('#hiking is fun {HashTag,Vb,Adj} # and so is this', false).found,
    false,
    here + 'hashtag + comment'
  )

  // a line with no {} block also supports trailing comments
  const doc4 = nlp.fromSpec('no braces here # a comment')
  t.equal(doc4.text().trim(), 'no braces here', here + 'comment without a tag-block')
  t.end()
})

test('testSpec ignores comments', function (t) {
  t.equal(
    nlp.testSpec('The dog is nice. {Det,Noun,Vb,Adj} # should pass', false).found,
    false,
    here + 'comment does not break a pass'
  )

  const res = nlp.testSpec('the cat slept {Vb,Vb,Vb} # wrong on purpose', false)
  t.equal(res.text().trim(), 'the cat slept', here + 'failing line reported without its comment')

  t.throws(() => {
    nlp.testSpec('the cat slept {Vb,Vb,Vb} # explain why', false, true)
  }, here + 'throwError still throws')
  t.doesNotThrow(() => {
    nlp.testSpec('the cat slept {Det,Noun,Vb} # explain why', false, true)
  }, here + 'throwError silent when passing')
  t.end()
})

test('spec skips whole-line comments', function (t) {
  const comments = '# block comment\n  # indented {invalid tags}\n\t# tabbed\n\u00a0# unicode whitespace\n#'
  const spec = `james jones {Person,Person} #inline-comment\n\n${comments}\nsally jones {Person,Person}`
  t.equal(
    nlp.fromSpec(spec).out('spec'),
    nlp.fromSpec('james jones {Person,Person}\nsally jones {Person,Person}').out('spec'),
    here + 'comment lines excluded from text'
  )
  t.equal(nlp.testSpec(spec, false, true).found, false, here + 'comment lines never fail or throw')
  t.equal(nlp.fromSpec(comments).found, false, here + 'comment-only input is empty')
  t.equal(nlp.testSpec(comments, false, true).found, false, here + 'comment-only input passes')
  t.end()
})

test('testSpec retains sentences without a tag-block', function (t) {
  const spec = `The dog is nice. {Det,Noun,Vb,Adj}
The flowers bloomed in spring. {Det,Plural,Past,Prep,Noun}
this sentence has no tags. #that's fine

# block-comments are supported, too
Tony Hawk rides {Person|FirstName,Person|LastName,Pres} #has both tags`
  const doc = nlp.testSpec(spec, false, true)
  t.equal(doc.match('sentence has no tags').found, true, here + 'untagged sentence available for matching')
  t.equal(doc.text().trim(), 'this sentence has no tags.', here + 'only untagged sentence retained, without comment')
  t.equal(nlp.fromSpec(spec).has('sentence has no tags'), true, here + 'fromSpec retains untagged sentence too')
  t.equal(nlp.testSpec('plain sentence.', false, true).text(), 'plain sentence.', here + 'plain sentence passes')
  t.throws(() => nlp.testSpec('plain sentence. {}', false, true), here + 'explicit empty tag-block still validated')
  const mixed = nlp.testSpec('plain sentence.\nthe cat slept {Vb,Vb,Vb}', false)
  t.equal(mixed.length, 2, here + 'untagged sentence and failing tagged sentence retained')
  t.end()
})

test('fromSpec ignores or uses supplied tags', t => {
  const normal = nlp.fromSpec('dog {Verb}')
  t.ok(normal.has('#Noun'), 'default uses normal tagging')
  t.deepEqual(normal.failures, [], 'default skips validation')
  const supplied = nlp.fromSpec('dog {Past}', { tags: 'use' })
  t.ok(supplied.has('#PastTense'), 'alias applied')
  t.ok(supplied.has('#Verb'), 'parent tag inherited')
  t.notOk(supplied.has('#Noun'), 'normal tagger did not run')
  const partial = nlp.fromSpec('dog slept {.,Vb|Past}', { tags: 'use' })
  t.equal(partial.docs[0][0].tags.size, 0, 'wildcard adds no tags')
  t.ok(partial.match('slept').has('#PastTense'), 'multiple tags applied')
  t.equal(nlp.fromSpec('dog', { tags: 'use' }).docs[0][0].tags.size, 0, 'tagless text stays untagged')
  t.throws(() => nlp.fromSpec('dog slept {Vb}', { tags: 'use' }), /expected 1 terms, got 2/, 'cannot assign a misaligned spec')
  t.throws(() => nlp.fromSpec('dog {Vb?}', { tags: 'use' }), /invalid slot/, 'cannot assign invalid syntax')
  t.end()
})

test('fromSpec failure modes and testSpec agree', t => {
  const spec = 'dog {Noun}\nslept {Adj}\nplain text'
  const retained = nlp.fromSpec(spec, { failures: 'retain' })
  t.equal(retained.failures.length, 1, 'retain reports mismatch')
  t.notOk(retained.has('dog'), 'passing line omitted')
  t.ok(retained.has('slept'), 'failing line retained')
  t.ok(retained.has('plain text'), 'tagless line retained')
  t.deepEqual(retained.failures, nlp.testSpec(spec, false).failures, 'wrapper shares diagnostics')
  t.equal(retained.text(), nlp.testSpec(spec, false).text(), 'wrapper shares returned text')
  t.throws(() => nlp.fromSpec(spec, { failures: 'throw' }), /missing #Adj/, 'throw validates')
  t.ok(nlp.fromSpec('dog {Noun}', { failures: 'throw' }).has('dog'), 'throw retains successful text')
  t.ok(nlp.fromSpec(spec).has('dog'), 'ignore keeps successful text')
  t.ok(nlp.fromSpec(spec).has('slept'), 'ignore keeps mismatching text')
  t.end()
})

test('using supplied tags validates the resulting document', t => {
  const used = nlp.fromSpec('dog {Verb}', { tags: 'use', failures: 'retain' })
  t.deepEqual(used.failures, [], 'supplied tags satisfy validation')
  t.equal(used.found, false, 'passing constructed line omitted')
  const negative = nlp.fromSpec('dog {!Noun}', { tags: 'use', failures: 'throw' })
  t.equal(negative.docs[0][0].tags.size, 0, 'negative constraint adds no tag')
  const contradictory = nlp.fromSpec('dog {Noun|!Noun}', { tags: 'use', failures: 'retain' })
  t.equal(contradictory.failures.length, 1, 'contradiction fails')
  t.ok(contradictory.has('#Noun'), 'retained View preserves assigned tags')
  const contraction = nlp.fromSpec("she didn't walk {Noun,Vb,Negative,Vb}", { tags: 'use', failures: 'throw' })
  t.equal(contraction.docs.flat().length, 4, 'contraction split once')
  t.deepEqual(contraction.failures, [], 'constructed contraction validates')
  t.end()
})

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

/* eslint-disable no-console */
test('fromSpec log mode reports failures and retains all text', t => {
  const errors = []
  const logs = []
  const originalError = console.error
  const originalLog = console.log
  const restore = () => {
    console.error = originalError
    console.log = originalLog
  }
  t.teardown(restore)
  let doc
  let used
  let invalid
  try {
    console.error = message => errors.push(message)
    console.log = message => logs.push(message)
    doc = nlp.fromSpec('# heading\n\nthe cat slept {.,!Noun,Adj}\nslept {.,.}\ndog {Noun}\nplain text', { failures: 'log' })
    used = nlp.fromSpec('dog {Verb|!Verb}', { tags: 'use', failures: 'log', verbose: true })
    invalid = nlp.fromSpec('dog slept {Vb}\ndog {Vb?}\ndog {Noun}', { tags: 'use', failures: 'log' })
    nlp.fromSpec('# comment\ndog {Noun}\nplain text', { failures: 'log' })
  } finally {
    restore()
  }
  const red = value => '\x1b[31m' + value + '\x1b[0m'
  t.equal(errors.length, 5, here + 'one spec line per failing line')
  t.equal(logs.length, 0, here + 'failures are not duplicated on console.log')
  t.equal(errors[0], `the ${red('cat')} ${red('slept')} {.,${red('!Noun')},${red('Adj')}}`, here + 'only wrong words and constraints are red')
  t.equal(errors[1], `slept {.,${red('.')}}`, here + 'extra slot is red')
  t.equal(errors[2], `${red('dog')} {Verb|${red('!Verb')}}`, here + 'correct piped constraint keeps its color')
  t.equal(errors[3], `${red('dog')} ${red('slept')} {${red('Vb')}}`, here + 'unmatched word is red')
  t.equal(errors[4], `${red('dog')} {${red('Vb?')}}`, here + 'invalid syntax is red')
  t.ok(doc.has('cat') && doc.has('dog') && doc.has('plain text'), here + 'failing, passing and tagless text retained')
  t.equal(doc.failures.length, 3, here + 'structured failures retained')
  t.ok(used.has('#Verb'), here + 'supplied tags preserved after validation failure')
  t.equal(used.failures[0].code, 'tags', here + 'supplied contradiction reported')
  t.equal(invalid.docs[0][0].tags.size, 0, here + 'misaligned line kept untagged')
  t.equal(invalid.docs[1][0].tags.size, 0, here + 'invalid syntax kept untagged')
  t.ok(invalid.eq(2).has('#Noun'), here + 'processing continues after invalid lines')
  t.end()
})
test('spec log highlights preserve sentence text and implicit terms', t => {
  const lines = []
  const originalError = console.error
  const restore = () => {
    console.error = originalError
  }
  t.teardown(restore)
  try {
    console.error = line => lines.push(line)
    nlp.fromSpec("she didn't walk {Pronoun,Aux,Noun,Inf}", { failures: 'log' })
    nlp.fromSpec('the cat slept, and the cat slept. {Det,Adj,Vb,Conj,Det,Noun,Vb}', { failures: 'log' })
    nlp.fromSpec('the  cat slept! {Det,Adj,Vb}', { failures: 'log' })
    nlp.fromSpec('slept {}', { failures: 'log' })
  } finally {
    restore()
  }
  const red = value => '\x1b[31m' + value + '\x1b[0m'
  t.equal(lines[0], `she ${red("didn't")} walk {Pronoun,Aux,${red('Noun')},Inf}`, here + 'implicit mismatch colors the contraction')
  t.equal(lines[1], `the ${red('cat')} slept, and the cat slept. {Det,${red('Adj')},Vb,Conj,Det,Noun,Vb}`, here + 'only the mismatching occurrence is red')
  t.equal(lines[2], `the  ${red('cat')} slept! {Det,${red('Adj')},Vb}`, here + 'spacing and punctuation preserved')
  t.equal(lines[3], `${red('slept')} ${red('{}')}`, here + 'empty block mismatch is visible')
  t.end()
})
/* eslint-enable no-console */
