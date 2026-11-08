import test from 'tape'
import nlp from '../lib.js'
const here = '[one/match/regex-split] '

const tokens = str => nlp.parseMatch(str).map(o => (o.regex ? String(o.regex) : o.word))

test(here + 'regex tokens keep their spaces', t => {
  const arr = [
    ['/a b/', ['/a b/']],
    ['one /a b/ two', ['one', '/a b/', 'two']],
    ['one /a b/? two', ['one', '/a b/', 'two']],
    ['!/a b/ two', ['/a b/', 'two']],
    ['[/a b/] two', ['/a b/', 'two']],
    ['one [<cap>/a b/] two', ['one', '/a b/', 'two']],
    ['/a\\/b c/ two', ['/a\\/b c/', 'two']],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(tokens(str), want, here + str)
  })
  t.end()
})

test(here + 'adjacent regex tokens keep their spaces', t => {
  const arr = [
    ['/a b/ /c d/ foo', ['/a b/', '/c d/', 'foo']],
    ['/a b/  /c d/ foo', ['/a b/', '/c d/', 'foo']],
    ['/a b/\n/c d/ foo', ['/a b/', '/c d/', 'foo']],
    ['/a b/ /c d/ /e f/ foo', ['/a b/', '/c d/', '/e f/', 'foo']],
    ['/a b/? !/c d/ foo', ['/a b/', '/c d/', 'foo']],
    ['one /a b/ [<cap>/c d/] foo', ['one', '/a b/', '/c d/', 'foo']],
    // these parsed correctly, already
    ['/a/ /b/ foo', ['/a/', '/b/', 'foo']],
    ['/a b/ /c d/', ['/a b/', '/c d/']],
    ['/a b/ (c d) /e f/ foo', ['/a b/', undefined, '/e f/', 'foo']],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(tokens(str), want, here + JSON.stringify(str))
  })
  t.end()
})

test(here + 'things that are not regex tokens', t => {
  const arr = [
    // no opening slash
    ['foo/no/bar two', ['foo/no/bar', 'two']],
    // no closing slash
    ['one /a b', ['one', '/a', 'b']],
    // the closing slash must end the term
    ['one /a b/c', ['one', '/a', 'b/c']],
    // a regex can't cross a newline
    ['/a\nb c/ two', ['/a', 'b', 'c/', 'two']],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(tokens(str), want, here + JSON.stringify(str))
  })
  t.end()
})

test(here + 'long rejecting patterns stay fast', t => {
  const arr = [
    ['unclosed openers', ' /a'.repeat(100000)],
    ['capture header', '<' + '\t>//'.repeat(100000)],
  ]
  arr.forEach(([label, str]) => {
    const begin = Date.now()
    nlp.parseMatch(str)
    // the quadratic version needs ~20s, for these
    t.ok(Date.now() - begin < 5000, here + label)
  })
  t.end()
})
