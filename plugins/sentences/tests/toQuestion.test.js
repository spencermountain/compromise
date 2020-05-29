const test = require('tape')
const nlp = require('./_lib')

test('simple chanage-punct', function (t) {
  let statement = `I can't believe it's a law firm.`
  let question = `I can't believe it's a law firm?`
  let excl = `I can't believe it's a law firm!`
  let doc = nlp(statement)

  doc.sentences().toExclamation()
  t.equal(doc.text(), excl, 'statement -> excl')
  doc.sentences().toStatement()
  t.equal(doc.text(), statement, 'excl -> statement')
  doc.sentences().toQuestion()
  t.equal(doc.text(), question, 'statement -> question')
  doc.sentences().toExclamation()
  t.equal(doc.text(), excl, 'question -> excl')
  doc.sentences().toQuestion()
  t.equal(doc.text(), question, 'excl -> question')

  t.end()
})

test('toquestion edge-cases ', function (t) {
  let doc = nlp('how do you do...')
  doc = doc.sentences().toExclamation()
  t.equal(doc.text(), 'how do you do!', 'elipses')

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
