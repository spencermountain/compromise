import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/misc/acronym-periods] '

test(here + 'terminal punctuation survives period conversion', t => {
  const cases = [
    ['Ask the FBI.', 'Ask the F.B.I.'],
    ['Ask the FBI. Then wait.', 'Ask the F.B.I. Then wait.'],
    ['Ask the FBI!','Ask the F.B.I.!'],
    ['Ask the FBI?', 'Ask the F.B.I.?'],
    ['Ask the FBI...', 'Ask the F.B.I...'],
    ['Ask the FBI…', 'Ask the F.B.I.…'],
    ['Ask the FBI.  ', 'Ask the F.B.I.  '],
    ['Ask the "FBI."', 'Ask the "F.B.I."'],
    ['Ask the FBI, please.', 'Ask the F.B.I., please.'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.acronyms().addPeriods()
    t.equal(doc.text(), expected, here + input)
    doc.acronyms().addPeriods()
    t.equal(doc.text(), expected, here + 'repeat: ' + input)
    doc.acronyms().strip()
    t.equal(doc.text(), input, here + 'restore: ' + input)
  })
  t.end()
})
