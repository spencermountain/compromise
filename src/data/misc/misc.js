'use strict';

const misc = {
  here: 'Noun',
  better: 'Comparative',
  earlier: 'Superlative',
  'make sure': 'Verb',
  'keep tabs': 'Verb',
  gonna: 'Verb',
  cannot: 'Verb',
  has: 'Verb',
  sounds: 'PresentTense',
  //special case for took/taken
  taken: 'PastTense',
  msg: 'Verb', //slang
  'a few': 'Value', //different than 'few people'
  'years old': 'Unit', //special case
  not: 'Negative',
  non: 'Negative',
  never: 'Negative',
  no: 'Negative',
  'no doubt': 'Noun',
  'not only': 'Adverb',
  "how's": 'QuestionWord' //not conjunction
};

const compact = {
  //these have numbers
  Organization: ['20th century fox', '3m', '7-eleven', 'g8', 'motel 6', 'vh1'],

  Verb: [
    'lengthen',
    'heighten',
    'worsen',
    'lessen',
    'awaken',
    'frighten',
    'threaten',
    'hasten',
    'strengthen',
    'given',
    //misc
    'known',
    'shown',
    'seen',
    'born'
  ],

  Time: [
    //date
    'noon',
    'midnight',
    'now',
    'morning',
    'evening',
    'afternoon',
    'night',
    'breakfast time',
    'lunchtime',
    'dinnertime',
    'ago',
    'sometime',
    'eod',
    'oclock',
    'all day',
    'at night'
  ],
  Date: [
    //end of day, end of month
    'eom',
    'standard time',
    'daylight time'
  ],
  Condition: ['if', 'unless', 'notwithstanding'],

  PastTense: ['said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went'],

  Gerund: ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  Copula: ['is', 'are', 'was', 'were', 'am'],

  //modal verbs
  Modal: [],

  //questions are awkward pos. are clarified in question_pass
  QuestionWord: ['where', 'why', 'when', 'who', 'whom', 'whose', 'what', 'which']
};
//unpack the compact terms into the misc lexicon..
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
module.exports = misc;
