import test from 'tape'
import nlp from '../lib.js'
const here = '[one/tokenize/sentence-scale] '

const split = str => nlp.methods().one.tokenize.splitSentences(str, nlp.world())
// long enough that the start of the sentence is far from its end
const many = str => str.repeat(100)

test(here + 'long merges split in the same places', t => {
  const arr = [
    // abbreviations join sentences
    [many('Mr. ') + 'Smith. Next one.', [many('Mr. ') + 'Smith. ', 'Next one.']],
    [many('Foo... ') + 'Bar. Next one.', [many('Foo... ') + 'Bar. ', 'Next one.']],
    // punctuation joins the sentence after it
    [many('. ') + 'foo. bar.', [many('. ') + 'foo. ', 'bar.']],
    // numbers aren't a sentence, without a letter
    [many('1. ') + 'foo. bar.', [many('1. ') + 'foo. ', 'bar.']],
    // an early letter still counts, at the end of a long merge
    ['Foo... ' + many('1... ') + '2. bar.', ['Foo... ' + many('1... ') + '2. ', 'bar.']],
    // the last word doesn't stop at the chunk
    [many('1.\t') + 'Mr. foo', [many('1.\t') + 'Mr. ', 'foo']],
    // a lead-initial is only at the very start
    [many('1. ') + '1A. foo', [many('1. ') + '1A. ', 'foo']],
    // long trailing whitespace
    ['Mr.' + many(' ') + 'Smith. Next one.', ['Mr.' + many(' ') + 'Smith. ', 'Next one.']],
    ['foo.' + many(' ') + 'bar', ['foo.' + many(' '), 'bar']],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(split(str), want, here + JSON.stringify(str.slice(0, 20)))
  })
  t.end()
})

test(here + 'long merges stay fast', t => {
  const arr = ['Mr. ', '. ', '1. ', 'Foo... ']
  arr.forEach(str => {
    const text = str.repeat(Math.ceil(64000 / str.length))
    const begin = Date.now()
    const doc = nlp.tokenize(text)
    // ~50ms, where the quadratic version needs 1-15s, and crashes node at twice this size
    t.ok(Date.now() - begin < 500, here + JSON.stringify(str))
    t.equal(doc.text(), text, here + 'keeps the text')
  })
  t.end()
})
