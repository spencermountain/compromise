import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[ignored/base-coref] '

const cases = [
  // Nearest plural object wins over the intended subject.
  [
    "the boys play video games in their free time",
    [["their","the boys"]]
  ],
  // Both Spencer and John are plausible possessors.
  [
    "spencer likes john but not his brother",
    [["his","john"]]
  ],
  // Both Sara and the captain are plausible antecedents.
  [
    "i saw sara. spencer likes the captain but not her brother",
    [["her","the captain"]]
  ],
  // The apparition may be the referent of he; context is insufficient.
  [
    "The giants were terrified at the apparition, and, fearful lest he should slay them, they all took to their heels",
    [["they","the giants"],["their","the giants"]]
  ],
  // The captain is not explicitly gendered; resolving her requires wider context.
  [
    "The Princess was very sorry, but as Grabugeon was really dead, she allowed the Captain of the Guard to take her tongue; but, alas!",
    [["she","the princess"],["her","the princess"]]
  ],
  // The common title King is not found as an actor.
  [
    "And when the sentence had been carried out the young King was married to his real bride",
    [["his","young king"]]
  ],
  // The two occurrences need different antecedents, including a coordinated phrase.
  [
    "But a lot of people laid down their seats in Congress so that police officers and kids wouldn't have to lay down their lives under a hail of assault weapon attack.",
    [["their","a lot of people"],["their","police officers and kids"]]
  ],
  // The antecedent incorrectly includes the following measurement.
  [
    "1 of these carried a Kansas woman 60 ft., dropping her next to a record titled \"Stormy Weather\"",
    [["her","a kansas woman"]]
  ],
]

test(here + 'deferred references', t => {
  cases.forEach(([input, expected]) => {
    const pronouns = nlp(input).pronouns().hasReference()
    const actual = []
    pronouns.forEach(pronoun => {
      actual.push([pronoun.text('implicit').toLowerCase(), pronoun.refersTo().text('normal')])
    })
    t.deepEqual(actual, expected, input)
  })
  t.end()
})
