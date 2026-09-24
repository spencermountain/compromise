import test from 'tape'
import nlp from './_lib.js'
import split from '../../src/1-one/tokenize/methods/01-sentences/01-simple-split.js'
import rules from '../../src/2-two/preTagger/model/regex/regex-normal.js'
import plurals from '../../src/2-two/preTagger/methods/transform/nouns/toPlural/_rules.js'
import endings from '../../src/2-two/preTagger/model/patterns/endsWith.js'
import clean from '../../src/1-one/tokenize/compute/normal/01-cleanup.js'

test('regex audit: email and URL recognition', t => {
  for (const text of ['alice@example.technology', 'alice@my-domain.com', 'first-last@example.com', 'first.last+news@my-site.co.uk']) {
    const doc = nlp(`Contact ${text}, please.`)
    t.equal(doc.match('#Email').text('normal'), text, text)
    t.equal(doc.match('#Email').terms().length, 1, 'address stays one term')
  }
  for (const text of ['x.io', 'https://my-site.xyz', 'https://a-b.example:8080/path?q=yes#part', 'my-site.com/path', 'www.a-b.technology']) {
    t.ok(nlp(text).has('#Url'), text)
  }
  for (const text of ['file.completely', 'notes.internal', 'http://http://example.com', 'example.com:abc', 'name@example']) {
    t.notOk(nlp(text).has('#Url'), text)
  }
  t.end()
})

test('regex audit: addresses retain boundaries and punctuation', t => {
  for (const text of ['alice@example.info', 'First-Last+news@My-Site.COM']) {
    const input = `Email "${text}", please.`
    const doc = nlp(input)
    t.equal(doc.text(), input, 'original text is preserved')
    t.equal(doc.match('#Email').text('normal'), text.toLowerCase(), text)
    t.notOk(doc.match('#Email').has('#Url'), 'email is not classified as a URL')
  }
  for (const text of ['x.io/path', 'x.io?q=yes', 'x.io#section', 'x.io:8080', 'https://my-site.xyz/a-b']) {
    const doc = nlp(`Visit ${text}, please.`)
    t.equal(doc.match('#Url').text('normal'), text, 'complete URL is selected')
    t.equal(doc.match('#Url').terms().length, 1, 'URL stays intact')
  }
  for (const text of ['name@example', 'name@@example.com', 'name@example..com']) {
    t.notOk(nlp(text).has('#Email'), `reject malformed email: ${text}`)
  }
  t.ok(nlp('http:example.com').has('#Url'), 'retain permissive scheme spelling')
  t.ok(nlp('_@_.com').has('#Email'), 'retain permissive underscore domains')
  t.deepEqual(nlp('well-known').terms().out('array'), ['well-', 'known'], 'ordinary hyphens still split')
  t.end()
})

test('regex audit: captures and reusable compiled expressions', t => {
  t.equal(nlp('foo>bar').match('[<name>/foo>bar/]').groups('name').text(), 'foo>bar')
  t.throws(() => nlp.parseMatch('[<oops #Noun]'), /Invalid named capture/)
  for (const regex of [/foo/g, /foo/y]) {
    regex.lastIndex = 2
    const pattern = [{ regex }]
    for (let i = 0; i < 2; i++) {
      t.equal(nlp('foo foo foo foo').match(pattern).length, 4, 'each term starts at zero')
      t.equal(regex.lastIndex, 2, 'caller state is preserved')
    }
  }
  t.end()
})

test('regex audit: capture errors and regex state on nonmatches', t => {
  t.equal(nlp('foo>bar').match('[<name>/foo>bar/]').groups('name').length, 1, 'capture has the intended name')
  for (const pattern of ['[<>foo]', '[<name foo]']) {
    t.throws(() => nlp.parseMatch(pattern), /Invalid named capture/, pattern)
  }
  const doc = nlp('bar foo baz foo')
  for (const regex of [/foo/g, /foo/y]) {
    for (const lastIndex of [0, 2, 100]) {
      regex.lastIndex = lastIndex
      t.deepEqual(doc.match([{ regex }]).out('array'), ['foo', 'foo'], 'nonmatches do not affect later terms')
      t.equal(regex.lastIndex, lastIndex, 'successes and failures preserve caller state')
    }
  }
  t.equal(nlp('seafood').match([{ regex: /foo/g }]).length, 1, 'global regex can search within a term')
  t.equal(nlp('seafood').match([{ regex: /foo/y }]).length, 0, 'sticky regex still requires the start of a term')
  t.end()
})

test('regex audit: normalization and model corrections', t => {
  for (const text of ['v1.2a.b', 'version.a.b']) {
    t.equal(nlp(text).json()[0].terms[0].normal, text, 'preserve non-acronym dots')
  }
  for (const [text, normal] of [['F.B.I.', 'fbi'], ['c.e.o.', 'ceo']]) {
    t.equal(nlp(text).json()[0].terms[0].normal, normal, 'preserve acronym normalization')
  }
  t.ok(rules.find(([, tag]) => tag === 'Verb')[0].test('un-vite'))
  t.ok(rules.find(([, tag]) => tag === 'Timezone')[0].test('est'))
  t.notOk(plurals.e[2][0].test('|ouse'))
  t.notOk(plurals.e[3][0].test('|ice'))
  t.end()
})

test('regex audit: suffix semantics and punctuation cleanup', t => {
  // Select the ist rule by its literal ending, so tests exercise the real model.
  const ist = endings.t.find(([regex]) => regex.source.endsWith('ist$'))[0]
  for (const word of ['pianist', 'artist', 'atheist']) t.ok(ist.test(word), word)
  for (const word of ['ist', 'list', 'aunt', 'a\nist', 'a\rist', 'a\u2028ist', 'a\u2029ist']) {
    t.notOk(ist.test(word), JSON.stringify(word))
  }
  for (const [input, expected] of [
    ['hello!!!', 'hello'], ['hello…', 'hello'], ['("hello")', 'hello'],
    ['a!!!b', 'a!!!b'], ['a...b', 'a...b'], [':)', ':)'], ['!!!', '!!!'],
  ]) {
    t.equal(clean(input), expected, `cleanup ${input}`)
  }
  t.end()
})

test('regex audit: sentence boundary preservation', t => {
  const cases = [
    ['Hello!!! Next?', ['Hello!!! ', 'Next?']],
    ['「行きません。」と言った', ['「行きません。」と言った']],
    ['「はい。」「いいえ。」', ['「はい。」', '「いいえ。」']],
    ['a\r\nb\rc\n', ['a', '\r\n', 'b', '\r', 'c', '\n']],
    ['。 。）。 ', ['。 ', '。）', '。 ']],
    ['a。!?b', ['a。', '!?b']],
  ]
  for (const [text, expected] of cases) t.deepEqual(split(text), expected, text)
  t.end()
})

test('regex audit: long rejecting inputs finish', t => {
  t.doesNotThrow(() => nlp('!'.repeat(100000)), 'ASCII punctuation')
  t.doesNotThrow(() => nlp('a'.repeat(100000) + 't'), 'suffix rejection')
  t.doesNotThrow(() => nlp('!'.repeat(100000) + '。'), 'CJK branch')
  t.end()
})
