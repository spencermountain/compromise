import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/pointer] '

test('basic pointer getters', function (t) {
  let txt = `one two three. four five six.`
  let arr = [
    // empty pointers mean full doc
    // [null, txt],
    // [undefined, txt],
    // ['', txt],
    // no doc
    [[], ``],
    // first sentence
    [[0], `one two three.`],
    [[0, 0], `one two three.`],
    [[0, 0, 1], `one`],
    [[0, 0, 2], `one two`],
    [[0, 0, 3], `one two three.`],
    [[0, 0, 13], `one two three.`], //term-overflow
    [[0, 0], `one two three.`],
    // nth sentence
    [[1], `four five six.`],
    [[120], ``],
  ]
  arr.forEach(a => {
    let doc = nlp(txt).update([a[0]])
    t.equal(doc.text(), a[1], here + JSON.stringify(a[0]))

    t.equal(doc.found, Boolean(doc.text()), here + a[0])
  })
  t.end()
})


// repair an end index using endId
test('use pointer endId', function (t) {
  // insert a term
  let doc = nlp(`john is nice`)
  let m = doc.match('.*')
  doc.match('is').insertAfter('really')
  t.equal(m.text(), 'john is really nice', here + 'end-id grow')
  t.equal(m.text(), 'john is really nice', here + 'end-id grow 2nd-time')

  doc = nlp(`john is nice`)
  m = doc.match('.*')
  doc.match('is').insertBefore('really')
  t.equal(m.text(), 'john really is nice', here + 'end-id appendgrow')
  t.equal(m.text(), 'john really is nice', here + 'end-id append grow 2nd-time')

  // remove a middle-term
  doc = nlp(`john is nice`)
  m = doc.match('.*')
  doc.match('is').remove()
  t.equal(m.text(), 'john nice', here + 'end-id shrink')
  t.equal(m.text(), 'john nice', here + 'end-id shrink 2nd time')


  // remove an ending-term
  doc = nlp(`john is nice`)
  m = doc.match('.*')
  doc.match('nice').remove()
  // first time
  t.equal(m.text(), 'john is', here + 'end-id remove first time')
  // second time
  t.equal(m.text(), 'john is', here + 'end-id remove second time')

  t.end()
})


// repair an end index using endId
test('replace w/ pointer endId', function (t) {
  // replace a middle term
  let doc = nlp(`john is nice`)
  let m = doc.match('.*')
  doc.match('is').replaceWith('was really')
  t.equal(m.text(), 'john was really nice', here + 'end-id grow')
  t.equal(m.text(), 'john was really nice', here + 'end-id grow 2nd time')
  // replace a middle term
  doc = nlp(`john is nice`)
  m = doc.match('.*')
  doc.match('nice').replaceWith('really swell')
  t.equal(m.text(), 'john is really swell', here + 'end-id grow')
  t.equal(m.text(), 'john is really swell', here + 'end-id grow 2nd time')
  t.end()
})


test('remove w/ pointer endId', function (t) {
  let doc = nlp('one two three match four five six')
  let m = doc.match('match .')
  doc.remove('four')
  t.equal(m.text(), 'match five six', here + 'full-match fallback')
  t.equal(m.text(), 'match five six', here + 'full-match fallback 2nd')
  t.end()
})
