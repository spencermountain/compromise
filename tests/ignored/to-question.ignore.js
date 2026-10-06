import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[three/toQuestion] '

test('simple chanage-punct', function (t) {
  const statement = `I can't believe it's a law firm.`
  const question = `I can't believe it's a law firm?`
  const excl = `I can't believe it's a law firm!`
  const doc = nlp(statement)

  doc.sentences().toExclamation()
  t.equal(doc.text(), excl, here + 'statement -> excl')
  doc.sentences().toStatement()
  t.equal(doc.text(), statement, here + 'excl -> statement')
  doc.sentences().toQuestion()
  t.equal(doc.text(), question, here + 'statement -> question')
  doc.sentences().toExclamation()
  t.equal(doc.text(), excl, here + 'question -> excl')
  doc.sentences().toQuestion()
  t.equal(doc.text(), question, here + 'excl -> question')

  t.end()
})

test('toquestion edge-cases ', function (t) {
  let doc = nlp('how do you do...')
  doc = doc.sentences().toExclamation()
  t.equal(doc.text(), 'how do you do!', here + 'elipses')

  // doc = nlp('how do you do (today)')
  // doc = doc.sentences().toQuestion()
  // t.equal(doc.text(), 'how do you do (today)?', 'elipses')

  // doc = nlp('how do you do    ')
  // doc = doc.sentences().toQuestion()
  // t.equal(doc.text(), 'how do you do?    ', 'after-whitespace')

  // let doc = nlp('Go out on a Tuesday? Who am I, Charlie Sheen?').sentences().toStatement()
  // t.equal(doc.text(), 'Go out on a Tuesday. Who am I, Charlie Sheen.', 'awkward tostatement')
  t.end()
})
