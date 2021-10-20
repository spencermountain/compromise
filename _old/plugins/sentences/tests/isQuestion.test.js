const test = require('tape')
const nlp = require('./_lib')

test('false-positives', function (t) {
  const txt = `Probably the renovation right away from the amount of work, which has been done to the property.
  I have one two, three, four five six properties, which came on the market in the month.
  I think that the number one quite comfortable looking at the two properties, which I'm working on now.`
  const questions = nlp(txt).sentences().isQuestion()
  t.equal(questions.length, 0, 'no questions here')
  t.end()
})
