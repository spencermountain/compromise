import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/remove-more] '

test('remove-bug-1:', function (t) {
  const txt = `before SW1A 2AA Remove me after`
  const doc = nlp(txt)
  const matches = doc.match('Remove me')
  doc.remove(matches)
  t.equal(doc.text(), 'before SW1A 2AA after', here + 'clean-remove')
  t.end()
})

test('remove-bug-1-loop:', function (t) {
  const txt = `before SW1A 2AA Remove me after`
  const doc = nlp(txt)
  const matches = doc.match('Remove me')
  matches.forEach((m) => doc.remove(m))
  t.equal(doc.text(), 'before SW1A 2AA after', here + 'clean-remove')
  t.end()
})

test('remove-bug-2-loop :', function (t) {
  let after = 'after 1. after 2. after 3. after 4. after 5.'
  const text = `Remove 1. Remove 2. Remove 3. Remove 4. Remove 5. Remove 6. Remove 7. Remove 8. ` + after
  const doc = nlp(text)
  let matches = doc.match('Remove #NumericValue')
  t.equal(matches.length, 8, here + '8 matches')
  matches.forEach((m) => doc.remove(m))
  t.equal(doc.text(), after, here + 'only after text')
  t.end()
})

test('remove-bug-2-no-loop :', function (t) {
  let after = 'after 1. after 2. after 3. after 4. after 5.'
  const text = `Remove 1. Remove 2. Remove 3. Remove 4. Remove 5. Remove 6. Remove 7. Remove 8. ` + after
  const doc = nlp(text)
  let matches = doc.match('Remove #NumericValue')
  t.equal(matches.length, 8, here + '8 matches')
  doc.remove(matches)
  t.equal(doc.text(), after, here + 'only after text')
  t.end()
})

test('remove-bug-3 :', function (t) {
  let doc = nlp(`Remove me 1. A some text. B some text. C some text`)
  doc.match('* some text$').forEach((m) => m.prepend('prefix'))
  let out = `Remove me 1. Prefix A some text. Prefix B some text. Prefix C some text`
  t.equal(doc.out(), out, here + 'prepend only')

  out = `Prefix A some text. Prefix B some text. Prefix C some text`

  doc = nlp(`Remove me 1. A some text. B some text. C some text`)
  doc.match('Remove me #NumericValue').forEach((m) => doc.remove(m))
  let res = doc.match('* some text$').map((m) => m.prepend('prefix'))
  t.equal(res.out(), out, here + 'remove then prepend - output')

  // doc = nlp(`Remove me 1. A some text. B some text. C some text`)
  // doc.match('Remove me #NumericValue').forEach((m) => doc.remove(m))
  // doc.match('* some text$').forEach((m) => m.prepend('prefix'))
  // t.equal(doc.out(), out, here + 'remove then prepend - self')

  t.end()
})
