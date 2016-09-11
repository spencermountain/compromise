'use strict';
//
const verbPhrase = function(result) {
  result.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
  //'will have had'..
  result.match('#Auxillary+').tag('VerbPhrase', '2');
  // 'is'
  result.match('#Copula').tag('VerbPhrase', '#3');
  //'really will'..
  result.match('#Adverb #Auxillary').tag('VerbPhrase', '#4');
  //to go
  result.match('to #Infinitive').tag('VerbPhrase', '#5');
  //work with
  result.match('#Verb #Preposition').tag('VerbPhrase', '#6');
  return result;
};

module.exports = verbPhrase;
