import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/smoke] '

//make sure it can handle garbage inputs
test('garbage-inputs', function (t) {
  const garbage = ['', '  ', null, '\n\n', []] //{}
  garbage.forEach(function (g, i) {
    let num = nlp(g).length
    let msg = typeof g + ' text input #' + i + '  ' + g
    t.equal(num, 0, here + msg)
  })
  let str = nlp(2).out()
  t.equal(str, '2', here + 'integer-casted')
  str = nlp(2.2).out()
  t.equal(str, '2.2', here + 'float-casted')

  //garbage in lexicon too
  str = nlp('hello', null).out()
  t.equal(str, 'hello', here + 'null-lexicon')

  str = nlp('hello', 2).out()
  t.equal(str, 'hello', here + 'int-lexicon')
  t.end()
})

test('test-regex-safety', function (t) {
  let doc = nlp(
    '-5,999,666,454,234,523,233,234,234,234,234,234,234,234,999,929,838,234,234,234,234,234,234,234.00282828282838383838383838383838383838380'
  )
  t.equal(doc.has('#NumericValue'), true, here + 'found-long-number')

  doc = nlp(
    '-5,999,666,454,234,523,233,234,234,234,234,234,234,234,999,929,838,234,234,234,234,234,234,234.00282828282838383838383838383838383838380%'
  )
  t.equal(doc.has('#Percent'), true, here + 'found-long-percent')

  doc = nlp('-$22,999,666,454,234,523,233,234,234,234,234,234,234,234,999,929,838,234,234,234,234,234,234,234.00')
  t.equal(doc.has('#Money'), true, here + 'found-long-money')
  t.end()
})

test('only-punctuation', function (t) {
  const garbage = ['.', ' - ', '...', '?', '&', '?,', '\n. \n', '🎵', '\n🇵🇷\n', '🇵🇷.', `🇷 %`]
  garbage.forEach(function (str) {
    let doc = nlp(str)
    t.equal(doc.text(), str, here + "text-'" + str + "'")
  })
  t.end()
})
