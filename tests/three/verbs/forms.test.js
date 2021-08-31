import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-forms] '

test('verb form names', function (t) {
  let forms = {
    // simple
    'simple-present': ['we walk home.', 'she walks home'], //Simple present tense
    'simple-past': ['Peter lived in China in 1961.', 'we skated on the ice'], //Simple past tense
    'simple-future': ['They will go to Denmark next week.', 'we will sing'], //Simple future tense

    // progressive
    'present-progressive': ['They are walking home.', 'i am walking quickly', 'and then we are walking'], //Present continuous tense
    'past-progressive': ['I was reading when she arrived.', 'we were walking'], //Past continuous tense
    'future-progressive': ['I will be travelling by coach.', 'we will be walking'], //Future continuous tense

    // prefect
    'present-perfect': ['I have lived here since 1982.', 'we have learned a lot'], //Present perfect tense
    'past-perfect': ['We had been to see her several times.', 'he had walked'], //Past perfect
    'future-perfect': ['We will have arrived in the States by then.', 'i will have walked'], //Future perfect

    // combo
    'present-perfect-progressive': ['I have been living here for years.', 'we have been walking'], //Present perfect continuous
    'past-perfect-progressive': ['He had been watching her for some time.', 'we had been walking'], //Past perfect continuous
    'future-perfect-progressive': [
      'By the end of the year, you will have been studying for ten years.',
      'we will have been walking',
    ], //Future perfect continuous

    // passive
    'passive-present': [
      'thousands of people are killed on our roads.',
      'Our planet is wrapped in a mass of gases.',
      'Waste materials are disposed of',
      // simple present
      'The house is cleaned every day.',
      // Present perfect
      'The house has been cleaned since you left.',
    ],
    'passive-past': [
      'a window had been left open.',
      'a plate had been broken.',
      'All the cookies have been eaten.',
      'My car has been stolen!',
      'The movie ET was directed by Spielberg.',
      // Simple past
      'The house was cleaned yesterday.',
      // Present continuous
      'The house is being cleaned at the moment.',
      // Past continuous
      'The house was being cleaned last week.',
      // Past perfect
      'The house had been cleaned before they arrived.',
    ],

    'passive-future': [
      // Future continuous
      'The house will be being cleaned tomorrow.',
      // Future
      'The house will be cleaned next week.',
      'he will be watched',
      'The house will have been cleaned by then.', // Future conditional
    ],

    // conditional
    'present-conditional': [
      'The house would be cleaned by then.', // Present conditional
      'we would be looked at',
    ],
    'past-conditional': [
      'The house would have been cleaned.', // Past conditional
      'the dog would have been walked',
      'we would have been seen',
    ],
    // 'future-conditional': [],
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
