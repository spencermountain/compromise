import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentences/is-question] '

test('selects questions from mixed sentences', function (t) {
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

test(here + 'question forms and statement contrasts', t => {
  const cases = [
    ['Who called?', true],
    ['What happened?', true],
    ['Where are you going?', true],
    ['Why did she leave?', true],
    ['How many books do you need?', true],
    ['Can you help me?', true],
    ['Are they ready?', true],
    ["Didn't she call?", true],
    ["You are ready, aren't you?", true],
    ['Tea or coffee?', true],
    ['Really?', true],
    ['"Are you ready?"', true],
    ['I know who called.', false],
    ['She explained why she left.', false],
    ['Tell me where you are going.', false],
    ['What a beautiful day!', false],
    ['They are ready.', false],
    ['', false],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    t.equal(doc.sentences().isQuestion().found, expected, here + input)
    t.equal(doc.text(), input, here + 'selection preserves input: ' + input)
  })
  t.end()
})

test(here + 'multiple questions retain their order and sentence scope', t => {
  const doc = nlp('Who called? She left. Are you ready? We are.')
  t.deepEqual(doc.sentences().isQuestion().out('array'), ['Who called?', 'Are you ready?'], here + 'both questions')
  t.equal(doc.sentences(1).isQuestion().length, 0, here + 'statement selection')
  t.equal(doc.sentences(2).isQuestion().text(), 'Are you ready?', here + 'second question only')
  t.end()
})
