import test from 'tape'
import nlp from './_lib.js'

test('dmy option falsy', function (t) {
  t.equal('March 26', nlp('03/26').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('03/26').dates({dmy:false}).format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('26/03').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 26', nlp('26/03').dates({dmy:false}).format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 4', nlp('03/04').dates().format('{month} {date}').text(), 'WITHOUT dmy option')
  t.equal('March 4', nlp('03/04').dates({dmy:false}).format('{month} {date}').text(), 'WITHOUT dmy option')

  t.end()
})

test('dmy option true', function (t) {
  t.equal('April 3', nlp('03/04').dates({dmy: true}).format('{month} {date}').text(), 'WITH dmy option')

  t.end()
})