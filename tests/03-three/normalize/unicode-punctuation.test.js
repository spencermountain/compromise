import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/normalize/unicode-punctuation] '

test(here + 'ellipsis and comma output', t => {
  const cases = [
    ['hello…', 'hello'],
    ['hello...', 'hello'],
    ['…hello', '…hello'],
    ['...hello', '...hello'],
    ['hello… world', 'hello world'],
    [',hello, world,', 'hello world'],
    ['،hello، world،', 'hello world'],
    ['،one’ «two» ‘three’ “four”', 'one two three four'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const formats = ['normal', 'clean', 'reduced']
    formats.forEach(format => {
      t.equal(doc.text(format), expected, here + format + ': ' + input)
    })
    t.equal(doc.text(), input, here + 'original preserved')
  })
  t.end()
})

test(here + 'punctuation normalization', t => {
  const cases = [
    ['…Hello، world…', '…Hello world'],
    ['...Hello, world...', '...Hello world'],
    ['Hello، world!', 'Hello world!'],
    ['Hello… really?', 'Hello really?'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input).normalize({ punctuation: true })
    t.equal(doc.text(), expected, here + input)
    doc.normalize({ punctuation: true })
    t.equal(doc.text(), expected, here + 'idempotent')
  })
  t.end()
})

test(here + 'symbols are preserved', t => {
  const input = 'Spencęr & JOhn™ ⟨lmt⟩.'
  const doc = nlp(input)
  t.equal(doc.text('reduced'), 'spencer & john™ ⟨lmt⟩.', here + 'default output')
  t.equal(doc.text(), input, here + 'original symbols')
  t.end()
})

test(here + 'remove unicode ellipsis', t => {
  const doc = nlp(`[hello] spencęr…`)
  t.equal(doc.text('normal'), 'hello spencer', here + 'ellipsis removal')
  t.end()
})

test(here + 'preserve unicode symbols and terminal punctuation', t => {
  const doc = nlp(` Spencęr & JOhn™ ⟨lmt⟩.`)
  t.equal(doc.text('reduced'), 'spencer & john™ ⟨lmt⟩.', here + 'symbols preserved')
  t.end()
})

test(here + 'remove leading Arabic comma', t => {
  const doc = nlp(`،one’ «two» ‘three’ “four” 'five' "six."`)
  t.equal(doc.text('clean'), 'one two three four five six.', here + 'Arabic comma')
  t.end()
})
