import test from 'tape'
import nlp from '../lib.js'
import { checkSpec, redact } from '../../../src/shared/index.js'
nlp.plugin(checkSpec)
const here = '[two/output/check-spec] '

test('checkSpec statuses', function (t) {
  const list = nlp.checkSpec(`
# a comment line
the cat slept {Det,Noun,Vb} # fine
the cat slept {Det,Noun,Adj}
no tags here # a note
the cat slept {}
`)
  t.deepEqual(list.map(res => res.status), ['pass', 'fail', 'skip', 'fail'], here + 'statuses')
  t.deepEqual(list.map(res => res.line), [3, 4, 5, 6], here + 'original line numbers')
  t.deepEqual(list.map(res => res.comment), ['fine', '', 'a note', ''], here + 'comments')
  t.equal(list[0].text, 'the cat slept', here + 'text')
  t.deepEqual(list[0].tags, ['Det', 'Noun', 'Vb'], here + 'tags')
  t.deepEqual(list[0].failures, [], here + 'no failures on pass')
  t.equal(list[2].tags, null, here + 'null tags on skip')
  t.deepEqual(list[3].tags, [], here + 'empty block has no slots')
  t.end()
})

test('checkSpec failures', function (t) {
  let failures = nlp.checkSpec('the cat slept {Det,Noun,Adj|!Vb}')[0].failures
  t.deepEqual(failures, [{ index: 2, word: 'slept', want: 'Adj|!Vb', bestTag: 'PastTense' }], here + 'tag mismatch')

  failures = nlp.checkSpec('the cat {Det,Noun,Noun}')[0].failures
  t.deepEqual(failures, [{ index: 2, word: '', want: 'Noun', bestTag: '' }], here + 'extra slot')

  failures = nlp.checkSpec('the cat slept {Det,Noun}')[0].failures
  t.deepEqual(failures, [{ index: 2, word: 'slept', want: '', bestTag: 'PastTense' }], here + 'extra term')

  failures = nlp.checkSpec('slept {Vb?}')[0].failures
  t.deepEqual(failures, [{ index: 0, word: 'slept', want: 'Vb?', bestTag: 'PastTense' }], here + 'invalid slot')

  failures = nlp.checkSpec(`she didn't walk {.,.,Noun,.}`)[0].failures
  t.equal(failures.length, 1, here + 'one implicit-term failure')
  t.equal(failures[0].index, 2, here + 'implicit term index')
  t.equal(failures[0].word, 'not', here + 'implicit term word')

  const res = nlp.checkSpec('He ran. She slept. {Noun,Vb,Noun,Vb}')[0]
  t.equal(res.status, 'pass', here + 'two sentences on one line')
  t.end()
})

test('parseSpec method', function (t) {
  const list = nlp.methods().one.parseSpec('# skip me\nthe cat {Det,Noun|!Vb} # note\n\nno tags')
  t.deepEqual(list.map(o => o.line), [2, 4], here + 'lines')
  t.deepEqual(list[0].tags, [['Det'], ['Noun', '!Vb']], here + 'slots')
  t.equal(list[0].comment, 'note', here + 'comment')
  t.equal(list[1].tags, null, here + 'tagless')
  t.end()
})

test('shared redact on the two build', function (t) {
  nlp.plugin(redact)
  nlp.plugin({ api: View => {
    View.prototype.people = function () {
      return this.match('#Person+')
    }
  } })
  const doc = nlp('i saw john smith in toronto')
  doc.redact({}, 'XX')
  t.equal(doc.text(), 'i saw XX in toronto', here + 'uses the finders that exist')
  t.end()
})
