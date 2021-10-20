import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-forms] '

test('verb form names', function (t) {
  let forms = {
    // simple
    'simple-present': [
      'we walk home.',
      'she walks home', //Simple present tense
      'they really walk home.',
      'they walk quickly home.',
      'they really walk quickly home.',
    ],
    'simple-past': [
      'Peter lived in China in 1961.',
      'we skated on the ice', //Simple past tense
    ],
    'simple-future': [
      'They will go to Denmark next week.',
      'we will sing', //Simple future tense
    ],

    // progressive
    'present-progressive': [
      'They are walking home.',
      'i am walking quickly',
      'and then we are walking', //Present continuous tense
    ],
    'past-progressive': [
      'I was reading when she arrived.',
      'we were walking', //Past continuous tense
    ],
    'future-progressive': [
      'I will be travelling by coach.',
      'we will be walking', //Future continuous tense
    ],

    // perfect
    'present-perfect': [
      'I have lived here since 1982.',
      'we have learned a lot', //Present perfect tense
    ],
    'past-perfect': [
      'We had been to see her several times.',
      'he had walked', //Past perfect
    ],
    'future-perfect': [
      'We will have arrived in the States by then.',
      'i will have walked', //Future perfect
    ],

    // combo
    'present-perfect-progressive': [
      'I have been living here for years.',
      'we have been walking', //Present perfect continuous
    ],
    'past-perfect-progressive': [
      'He had been watching her for some time.',
      'we had been walking', //Past perfect continuous
    ],
    'future-perfect-progressive': [
      'By the end of the year, you will have been studying for ten years.',
      'we will have been walking', //Future perfect continuous
    ],

    // passive
    'passive-present': [
      'thousands of people are killed on our roads.',
      'Our planet is wrapped in a mass of gases.',
      'Waste materials are disposed of',
      'The house is cleaned every day.', // simple present
      'The house has been cleaned since you left.', // Present perfect
      'My car has been stolen!',
      'The house is being cleaned at the moment.', // Present continuous
    ],
    'passive-past': [
      'a window had been left open.',
      'a plate had been broken.',
      'a plate had been smashed.',
      'My car had been stolen!',
      'All the cookies have been eaten.',
      'The movie ET was directed by Spielberg.',
      'The house was cleaned yesterday.', // Simple past
      'The house was being cleaned last week.', // Past continuous
      'The house had been cleaned before they arrived.', // Past perfect
    ],
    'passive-future': [
      'The house will be being cleaned tomorrow.', // Future continuous
      'The house will be cleaned next week.', // Future
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
    'auxiliary-future': [
      // 'he is going to walk', //
      // 'we are going to walk',
    ],
    'auxiliary-past': [
      'he did walk', //
      'we used to walk',
    ],
    'auxiliary-present': [
      'we do walk', //
      'he does walk',
    ],

    // missing
    //  'has been elected',
    //  'would have been elected',
    //  'was elected',
    //  'are elected',
    //  'is elected',
    //  'did elect',
  }
  Object.keys(forms).forEach(form => {
    forms[form].forEach(str => {
      let doc = nlp(str)
      let json = doc.verbs().json()[0] || { verb: {} }
      const grammar = json.verb.grammar || {}
      t.equal(grammar.form, form, here + `''${str}`)
    })
  })
  t.end()
})
