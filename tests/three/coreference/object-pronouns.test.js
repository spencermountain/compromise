import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference/object-pronouns] '

test(here + 'plural object pronouns', t => {
  const cases = [
    ['The children arrived. I greeted them.', 'the children'],
    ['The books arrived. I read them.', 'the books'],
    ['I greeted them.', ''],
    ['The woman arrived. I greeted them.', ''],
  ]
  cases.forEach(([input, expected]) => {
    t.equal(nlp(input).pronouns().if('them').refersTo().text('normal'), expected, input)
  })
  t.end()
})

test(here + 'gendered titles', t => {
  const cases = [
    ['The lady arrived. He waved.', 'he', ''],
    ['The sultan arrived. She waved.', 'she', ''],
    ['The lady arrived. She waved.', 'she', 'the lady'],
    ['The sultan arrived. He waved.', 'he', 'the sultan'],
  ]
  cases.forEach(([input, pronoun, expected]) => {
    t.equal(nlp(input).pronouns().if(pronoun).refersTo().text('normal'), expected, input)
  })
  t.end()
})
