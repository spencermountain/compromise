import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-forms] '

test('verb form names', function (t) {
  let forms = {
    // simple
    'simple-present': ['we walk home.'], //Simple present tense
    'simple-past': ['Peter lived in China in 1961.'], //Simple past tense
    'simple-future': ['They will go to Denmark next week.'], //Simple future tense

    // progressive
    'present-progressive': ['They are walking home.'], //Present continuous tense
    'past-progressive': ['I was reading when she arrived.'], //Past continuous tense
    'future-progressive': ['I will be travelling by coach.'], //Future continuous tense

    // prefect
    'present-perfect': ['I have lived here since 1982.'], //Present perfect tense
    'past-perfect': ['We had been to see her several times before she visited us.'], //Past perfect
    'future-perfect': ['We will have arrived in the States by the time you get this letter.'], //Future perfect

    // combo
    'present-perfect-progressive': ['I have been living here for years.'], //Present perfect continuous
    'past-perfect-progressive': ['He had been watching her for some time when she turned and smiled.'], //Past perfect continuous
    'future-perfect-progressive': ['By the end of the year, you will have been studying for ten years.'], //Future perfect continuous

    // passive
    'passive-present': [
      'thousands of people are killed on our roads.',
      'Our planet is wrapped in a mass of gases.',
      'Waste materials are disposed of',
      // simple present
      'The house is cleaned every day.',
    ],
    'passive-past': [
      'a window had been left open.',
      'All the cookies have been eaten.',
      'My car has been stolen!',
      'The movie ET was directed by Spielberg.',
      // Simple past
      'The house was cleaned yesterday.',
      // Present continuous
      'The house is being cleaned at the moment.',
      // Past continuous
      'The house was being cleaned last week.',
      // Future continuous
      'The house will be being cleaned tomorrow.',

      // Present perfect
      'The house has been cleaned since you left.',
      // Past perfect
      'The house had been cleaned before they arrived.',
    ],

    'passive-future': [
      // Future
      'The house will be cleaned next week.',
    ],

    // conditional
    'present-conditional': [
      'The house would be cleaned by then.', // Present conditional
    ],
    'past-conditional': [
      'The house would have been cleaned.', // Past conditional
    ],
    'future-conditional': [
      'The house will have been cleaned by then.', // Future conditional
    ],

    // '': ['She goes running every morning.'], //Present participle
  }
  Object.keys(forms).forEach(form => {
    forms[form].forEach(str => {
      let doc = nlp(str)
      let json = doc.verbs().json()[0]
      t.equal(json.verb.form.name, form, here + `''${str}`)
    })
  })
  t.end()
})
