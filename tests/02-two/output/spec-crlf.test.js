import test from 'tape'
import nlp from '../lib.js'
const here = '[two/output/spec-crlf] '

test(here + 'comments are stripped from CRLF specs', t => {
  const doc = nlp.fromSpec('dog # a note\r\ncat {Noun} # a note\r\n')
  t.deepEqual(doc.out('array'), ['dog', 'cat'], here + 'comments are not text')

  const { failures } = nlp.fromSpec('cat {Noun} # a note\r\n', { failures: 'retain' })
  t.deepEqual(failures, [], here + 'comments are not tags')

  t.doesNotThrow(() => nlp.fromSpec('cat {Noun} # a note\r\n', { tags: 'use' }), here + 'tags can be applied')
  t.end()
})

test(here + 'comments stripped through other line-terminators', t => {
  t.deepEqual(nlp.fromSpec('dog # a note').out('array'), ['dog'], here + 'no tag block')
  const { failures } = nlp.fromSpec('cat {Noun} # a note', { failures: 'retain' })
  t.deepEqual(failures, [], here + 'after a tag block')
  t.end()
})

test(here + 'long rejecting comments stay fast', t => {
  const arr = [
    ['no tag block', 'a' + '\t#'.repeat(100000) + '\r#'],
    ['after a tag block', 'a {' + '}#'.repeat(100000) + '\r'],
  ]
  arr.forEach(([label, str]) => {
    const begin = Date.now()
    nlp.fromSpec(str)
    // the quadratic version needs ~10s, for these
    t.ok(Date.now() - begin < 5000, here + label)
  })
  t.end()
})
