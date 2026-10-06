import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match/regex-state] '

test(here + 'two/match/regex-state: captures and reusable compiled expressions', t => {
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

test(here + 'two/match/regex-state: capture errors and regex state on nonmatches', t => {
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
