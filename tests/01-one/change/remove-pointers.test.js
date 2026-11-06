import test from 'tape'
import nlp from '../lib.js'
const here = '[one/remove-pointers] '

test(here + 'later pointers in a sentence shift back', function (t) {
  const arr = [
    // [text, match, remove, what is left of the match]
    ['foo one bar two', '(foo|bar)', 'foo', ['bar']],
    ['foo one bar two', '(foo|bar)', 'bar', ['foo']],
    ['one foo two bar three', '(foo|bar)', 'foo', ['bar']],
    ['foo one bar two baz', '(foo|bar|baz)', '(foo|bar)', ['baz']],
    ['foo one bar two baz', '(foo|bar|baz)', 'bar', ['foo', 'baz']],
    ['foo baz one bar qux two', '(foo baz|bar qux)', 'foo baz', ['bar qux']],
  ]
  arr.forEach(a => {
    const [str, match, remove, want] = a
    const m = nlp(str).match(match)
    const res = m.remove(remove)
    t.deepEqual(m.out('array'), want, here + 'self: ' + remove)
    t.deepEqual(res.out('array'), want, here + 'returned: ' + remove)
  })
  t.end()
})

test(here + 'a pointer keeps its sentence, if that sentence remains', function (t) {
  let m = nlp('the cat sat. foo one bar two.').match('(foo|bar)')
  m.remove('foo')
  t.deepEqual(m.out('array'), ['bar'], here + 'second sentence')

  m = nlp('foo one bar two. the cat sat. foo three').match('(foo|bar|cat)')
  m.remove('foo')
  t.deepEqual(m.out('array'), ['bar', 'cat'], here + 'three sentences')

  // both matches gone, but their sentence remains
  m = nlp('foo bar one. the cat sat. the dog ate.').match('(foo|bar|cat|dog)')
  m.remove('(foo|bar)')
  t.deepEqual(m.out('array'), ['cat', 'dog'], here + 'many from one sentence')
  t.end()
})

test(here + 'pointers follow when a sentence is really gone', function (t) {
  const arr = [
    ['foo. the cat sat. the dog ate.', ['the cat sat.', 'the dog ate.']],
    ['the cat sat. foo. the dog ate.', ['the cat sat.', 'the dog ate.']],
    ['the cat sat. the dog ate. foo.', ['the cat sat.', 'the dog ate.']],
    ['foo. the cat sat. foo. the dog ate.', ['the cat sat.', 'the dog ate.']],
    ['foo. foo. the cat sat.', ['the cat sat.']],
  ]
  arr.forEach(a => {
    const m = nlp(a[0]).match('.+')
    m.remove('foo')
    t.equal(m.length, a[1].length, here + 'length: ' + a[0])
    a[1].forEach((str, i) => {
      t.equal(m.eq(i).text(), str, here + a[0])
    })
  })
  t.end()
})

test(here + 'removing everything', function (t) {
  const doc = nlp('foo. bar.')
  const m = doc.match('.+')
  m.remove('(foo|bar)')
  t.equal(m.found, false, here + 'empty view')
  t.equal(doc.text(), '', here + 'empty doc')
  t.end()
})
