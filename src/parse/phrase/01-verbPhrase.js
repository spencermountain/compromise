'use strict';
//
const verbPhrase = function(result) {
  result.match('#Verb', true).tag('VerbPhrase', 'verbphrase-verb');
  //'will have had'..
  result.match('#Auxillary+', true).tag('VerbPhrase', '2');
  // 'is'
  result.match('#Copula', true).tag('VerbPhrase', '#3');
  //'really will'..
  result.match('#Adverb #Auxillary', true).tag('VerbPhrase', '#4');
  //to go
  result.match('to #Infinitive', true).tag('VerbPhrase', '#5');
  //work with
  result.match('#Verb #Preposition', true).tag('VerbPhrase', '#6');
  return result;
};

module.exports = verbPhrase;
