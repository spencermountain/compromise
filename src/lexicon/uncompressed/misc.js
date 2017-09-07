'use strict';

const misc = {
  better: 'Comparative',
  earlier: 'Superlative',
  sounds: 'PresentTense',
  'a few': 'Value', //different than 'few people'
  here: 'Noun',
  'no doubt': 'Noun'
  // we: ['Pronoun', 'Plural']
};

const compact = {
  //these have numbers
  Organization: ['20th century fox', '3m', '7-eleven', 'g8', 'motel 6', 'vh1'],

  Copula: ['is', 'are', 'was', 'were', 'am'],

  Date: [
    //end of day, end of month
    'eom',
    'standard time',
    'daylight time',
    'today',
    'tomorrow',
    'yesterday'
  ],
  Condition: ['if', 'unless', 'notwithstanding'],

  PastTense: ['said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went', 'taken'],

  Gerund: ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  Negative: ['not', 'non', 'never', 'no'],

  //questions are awkward pos. are clarified in question_pass
  QuestionWord: ['where', 'why', 'when', 'who', 'whom', 'whose', 'what', 'which', "how's"]
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
