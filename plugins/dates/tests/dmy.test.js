import test from 'tape'
import nlp from './_lib.js'

test('dmy option loop', function (t) {
  let arr = [
    ['01/02', 'January 2', false],
    ['01/12', 'January 12', false],
    ['01/24', 'January 24', false],

    ['01/02', 'February 1', true],
    ['01/12', 'December 1', true],
    ['01/24', 'January 24', true], //invalid dmy fallback
  ]
  arr.forEach((a) => {
    let [str, want, bool] = a
    let doc = nlp(str)
    t.equal(doc.has('#Date'), true, str + ' #Date')
    let out = doc.dates({ dmt: bool }).format('{month} {date}').text()
    t.equal(out, want, str)
  })
  t.end()
})

test('dmy option falsy', function (t) {
  t.equal('March 26', nlp('03/26').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('03/26').dates({ dmy: false }).format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('26/03').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('26/03').dates({ dmy: false }).format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 4', nlp('03/04').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 4', nlp('03/04').dates({ dmy: false }).format('{month} {date}').text(), 'WITHOUT dmy option')
  t.end()
})

test('dmy option true', function (t) {
  let out = nlp('03/04').dates({ dmy: true }).format('{month} {date}').text()
  t.equal('April 3', out, 'WITH dmy option')

  t.end()
})

test('dmy invalid', function (t) {
  let arr = [
    '24/24',
    '124/2',
    '2/232',
    '0/2',
    '2/0',
    '2/-2',
    '-2/2',
    '2/2.3',
    '2.3/2',
  ]
  arr.forEach((str) => {
    let doc = nlp(str)
    t.equal(doc.dates({ dmy: true }).found, false, str, '-dmy')
    t.equal(doc.dates({ dmy: false }).found, false, str + '-mdy')
  })

  t.end()
})
