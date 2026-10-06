import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference/antecedent-boundaries] '

test(here + 'person spans exclude possessions and measurements', t => {
  const cases = [
    ["We admired an artist's ability to overcome his mistakes.", 'his', "an artist's"],
    ['We admired an artist’s ability to overcome his mistakes.', 'his', "an artist's"],
    ["The magician's conduct pleased the Sultan, who spoke to her.", 'her', "the magician's"],
    ['They carried a woman 60 feet, then helped her.', 'her', 'a woman'],
    ['They carried a Kansas woman 60 ft., dropping her next to a record.', 'her', 'a kansas woman'],
    ['They moved a man 20 meters before helping him.', 'him', 'a man'],
    ["The doctor's assistant said she was tired.", 'she', "the doctor's assistant"],
    ["Josh's mom burned her toast.", 'her', "josh's mom"],
    ["The woman's son said he was tired.", 'he', "the woman's son"],
    ["The man's daughter said she was tired.", 'she', "the man's daughter"],
    ["The woman's ability impressed him.", 'him', ''],
    ['The mother of two boys said she was tired.', 'she', 'the mother'],
    ['The doctor and the nurse arrived. She waved.', 'she', ''],
  ]
  cases.forEach(([input, pronoun, expected]) => {
    const doc = nlp(input)
    const reference = doc.pronouns().if(pronoun).refersTo()
    t.equal(reference.text('normal'), expected, here + input)
    t.equal(doc.text(), input, here + 'resolution does not rewrite text')
    t.equal(doc.pronouns().if(pronoun).refersTo().text('normal'), expected, here + 'repeat resolution')
  })
  t.end()
})

test(here + 'coordinated antecedents', t => {
  const cases = [
    ['The officers and kids would leave. They waved.', 'the officers and kids'],
    ['The shops and stores will close. They need repairs.', 'the shops and stores'],
    ['The doctor and the nurse arrived. They waved.', 'the doctor and the nurse'],
    ['The boys and girls arrived. They waved.', 'the boys and girls'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    t.equal(doc.pronouns().if('they').refersTo().text('normal'), expected, here + input)
    t.equal(doc.text(), input, here + 'coordination preserved')
  })
  const input = "But a lot of people laid down their seats in Congress so that police officers and kids wouldn't have to lay down their lives."
  const doc = nlp(input)
  const pronouns = doc.pronouns().if('their')
  t.equal(pronouns.eq(1).refersTo().text('normal'), 'police officers and kids', here + 'second possessor')
  t.equal(doc.text(), input, here + 'original text')
  t.end()
})

test.skip(here + 'coordination across separate noun chunks', t => {
  const doc = nlp('The doctor and the young nurse arrived. They waved.')
  t.equal(doc.pronouns().if('they').refersTo().text('normal'), 'the doctor and the young nurse')
  t.end()
})

test(here + 'coordinated subject tagging preserves verb readings', t => {
  t.equal(nlp('The officers and kids would leave.').match('kids').has('#Plural'), true, 'kids is a subject')
  t.equal(nlp('He kids around.').match('kids').has('#Verb'), true, 'kids remains a verb')
  t.equal(nlp('The shops and stores will close.').match('stores').has('#Plural'), true, 'stores is a subject')
  t.equal(nlp('She stores food.').match('stores').has('#Verb'), true, 'stores remains a verb')
  t.end()
})
