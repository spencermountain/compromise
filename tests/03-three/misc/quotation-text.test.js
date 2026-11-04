import test from 'tape'
import nlp from '../lib.js'

test('quotation text preserves paired punctuation (#1154)', t => {
  const input = 'This is a "test". Hello "World."'
  const quotes = nlp(input).quotations()
  const expected = '"test". "World."'
  t.equal(quotes.text(), expected, 'default text')
  t.equal(quotes.out('text'), expected, 'text output')
  t.equal(quotes.text('text'), expected, 'named text format')
  t.equal(quotes.text({ keepSpace: false }), expected, 'text options')
  t.equal(quotes.text({ keepEndPunct: false }), 'test". "World', 'explicit trimming')
  t.equal(quotes.out('normal'), 'test. world', 'normal format')
  t.equal(nlp('I heard “good news!” today').quotations().text(), '“good news!”', 'curly quotes')
  t.equal(nlp('I heard "good news" today').match('good news').text(), 'good news', 'ordinary selections')
  t.equal(nlp('nothing quoted').quotations().text(), '', 'empty selection')
  t.end()
})
