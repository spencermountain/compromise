import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/integration/tagger/normalization-context] '

test(here + 'normalization and tagging', t => {
  for (const text of ['v1.2a.b', 'version.a.b']) {
    t.equal(nlp(text).json()[0].terms[0].normal, text, 'preserve non-acronym dots')
  }
  for (const [text, normal] of [
    ['F.B.I.', 'fbi'],
    ['c.e.o.', 'ceo'],
  ]) {
    t.equal(nlp(text).json()[0].terms[0].normal, normal, 'preserve acronym normalization')
  }
  t.ok(nlp('un-vite').has('#Verb'), 'hyphenated verb is recognized')
  t.ok(nlp('est').has('#Timezone'), 'timezone abbreviation is recognized')
  t.end()
})

test(here + 'suffix semantics and punctuation cleanup', t => {
  for (const word of ['pianist', 'artist']) {
    t.ok(nlp(word).has('#Actor'), `${word} is an actor noun`)
  }
  t.ok(nlp('atheist').has('#Adjective'), 'lexical tagging can override the suffix')
  t.notOk(nlp('ist').has('#Actor'), 'bare suffix is not an actor')
  t.notOk(nlp('list').has('#Actor'), 'short ending does not imply an actor')
  for (const separator of ['\n', '\r', '\u2028', '\u2029']) {
    const doc = nlp('a' + separator + 'ist')
    t.equal(doc.terms().length, 2, 'suffix does not span a line separator')
    t.notOk(doc.has('#Actor'), 'separate terms do not form an actor noun')
  }
  for (const [input, expected] of [
    ['hello!!!', 'hello'],
    ['hello…', 'hello'],
    ['("hello")', 'hello'],
    ['a!!!b', 'a!!!b'],
    ['a...b', 'a...b'],
    [':)', ':)'],
    ['!!!', '!!!'],
  ]) {
    t.equal(nlp(input).json()[0].terms[0].normal, expected, `cleanup ${input}`)
  }
  t.end()
})
