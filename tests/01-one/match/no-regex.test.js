import test from 'tape'
import nlp from '../lib.js'
const here = '[one/match/no-regex] '

const opts = { noRegex: true }

// does any token, or nested (choice), carry a compiled regex?
const hasRegex = regs => {
  return regs.some(reg => {
    if (reg.regex !== undefined) {
      return true
    }
    return (reg.choices || []).some(hasRegex)
  })
}

test('noRegex - never compiles a regex', function (t) {
  const arr = [
    '/nny$/',
    '!/nny$/',
    '/nny$/?',
    '^/fu/+',
    '[/fu/]',
    '[<name>/fu/]',
    '(/fu/|weird)',
    '(funny && /fu/)',
    '/fu nny/',
    '(a /b c/ d)',
    '#Adjective /^w/ and',
  ]
  arr.forEach(str => {
    t.ok(hasRegex(nlp.parseMatch(str)), here + 'default: ' + str)
    t.notOk(hasRegex(nlp.parseMatch(str, opts)), here + 'noRegex: ' + str)
  })
  t.end()
})

test('noRegex - invalid or catastrophic regex is harmless', function (t) {
  t.throws(() => nlp.parseMatch('/(/'), here + 'default throws on bad regex')
  t.doesNotThrow(() => nlp.parseMatch('/(/', opts), here + 'noRegex does not throw')
  const doc = nlp('a'.repeat(40) + '!')
  const m = doc.match('/^(a+)+$/', null, opts)
  t.equal(m.found, false, here + 'redos pattern finds nothing')
  t.end()
})

test('noRegex - slashes are plain characters', function (t) {
  let regs = nlp.parseMatch('/fu nny/', opts)
  t.deepEqual(
    regs.map(r => r.word),
    ['/fu', 'nny/'],
    here + 'whitespace splits a /regex/'
  )
  regs = nlp.parseMatch('[<name>!/fu/?]', opts)
  t.equal(regs[0].word, '/fu/', here + 'plain word')
  t.equal(regs[0].group, 'name', here + 'keeps capture')
  t.equal(regs[0].negative, true, here + 'keeps negative')
  t.equal(regs[0].optional, true, here + 'keeps optional')
  t.end()
})

test('noRegex - match methods', function (t) {
  const doc = nlp('it is funny and weird')
  t.equal(doc.match('/nny$/').text(), 'funny', here + 'match default')
  t.equal(doc.match('/nny$/', null, opts).found, false, here + 'match')
  t.equal(doc.matchOne('/nny$/', null, opts).found, false, here + 'matchOne')
  t.equal(doc.has('/^w/', null, opts), false, here + 'has')
  t.equal(doc.if('/^w/', null, opts).found, false, here + 'if')
  t.equal(doc.ifNo('/^w/', null, opts).found, true, here + 'ifNo')
  t.equal(doc.match('funny').after('/^w/', null, opts).found, false, here + 'after')
  t.equal(doc.match('weird').before('/^f/', null, opts).found, false, here + 'before')
  t.end()
})

test('noRegex - other syntax still works', function (t) {
  const doc = nlp('it is funny and weird')
  const arr = [
    ['funny', 'funny'],
    ['funny and', 'funny and'],
    ['(funny|weird)', 'funny weird'],
    ['[<adj>(funny|weird)] and', 'funny and'],
    ['is . and', 'is funny and'],
    ['^it is', 'it is'],
    ['weird$', 'weird'],
  ]
  arr.forEach(a => {
    t.equal(doc.match(a[0], null, opts).text(), a[1], here + a[0])
  })
  // combines with other options
  const m = doc.match('~funy~', null, { noRegex: true, fuzzy: 0.7 })
  t.equal(m.text(), 'funny', here + 'with fuzzy')
  t.end()
})
