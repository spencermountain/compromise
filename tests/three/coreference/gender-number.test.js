import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference-gender] '

test(here + 'common person gender and number', t => {
  const cases = [
    ['The man greeted the girl. He waved.', 'he', 'the man'],
    ['The woman greeted the boy. She waved.', 'she', 'the woman'],
    ['The woman greeted the children. She waved.', 'she', 'the woman'],
    ['The man greeted the boys. He waved.', 'he', 'the man'],
    ['The children arrived. She waved.', 'she', ''],
    ['The girls arrived. He waved.', 'he', ''],
    ['The man arrived. She waved.', 'she', ''],
    ['The woman arrived. He waved.', 'he', ''],
    ['The teacher arrived. She waved.', 'she', 'the teacher'],
    ['The teacher arrived. He waved.', 'he', 'the teacher'],
    ['The boys and girls arrived. She waved.', 'she', ''],
    ['The mother greeted the father. She waved.', 'she', 'the mother'],
    ['The father greeted the mother. He waved.', 'he', 'the father'],
  ]
  cases.forEach(([input, pronoun, expected]) => {
    const doc = nlp(input)
    const ref = doc.pronouns().if(pronoun).refersTo()
    t.equal(ref.text('normal'), expected, here + input)
  })
  t.end()
})
