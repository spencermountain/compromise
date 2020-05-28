const test = require('tape')
const nlp = require('./_lib')

test('simple chanage-punct', function (t) {
  let statement = `I can't believe it's a law firm.`
  let question = `I can't believe it's a law firm?`
  let excl = `I can't believe it's a law firm!`
  let doc = nlp(statement)

  doc.sentences().toExclamation().text()
  t.equal(doc.text(), excl, 'statement -> excl')
  doc.sentences().toStatement().text()
  t.equal(doc.text(), statement, 'excl -> statement')
  doc.sentences().toQuestion().text()
  t.equal(doc.text(), question, 'statement -> question')
  doc.sentences().toExclamation().text()
  t.equal(doc.text(), excl, 'question -> excl')
  doc.sentences().toQuestion().text()
  t.equal(doc.text(), question, 'excl -> question')

  t.end()
})
