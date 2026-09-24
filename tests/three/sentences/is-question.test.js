import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/isQuestion] '

test('false-positives', function (t) {
  const txt = `He is cool. Do you agree? I do.`
  let s = nlp(txt).sentences()
  t.equal(s.length, 3, here + 'sentences has questions')
  s = s.isQuestion()
  t.equal(s.text(), 'Do you agree?', here + 'one question')
  t.end()
})

test('false-positives', function (t) {
  const txt = `Probably the renovation right away from the amount of work, which has been done to the property.
  I have one two, three, four five six properties, which came on the market in the month.
  I think that the number one quite comfortable looking at the two properties, which I'm working on now.`
  const questions = nlp(txt).sentences().isQuestion()
  t.equal(questions.length, 0, here + 'no questions here')
  t.end()
})
