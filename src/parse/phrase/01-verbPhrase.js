'use strict';
//
const verbPhrase = function(result) {
  //'will have had'..
  result.match('#Auxillary+').tag('VerbPhrase');
  // 'is'
  result.match('#Copula').tag('VerbPhrase');
  //'really will'..
  result.match('#adverb #Auxillary').tag('VerbPhrase');
  //to go
  result.match('to #Infinitive').tag('VerbPhrase');
  //work with
  result.match('#Verb #Preposition').tag('VerbPhrase');
  return result;
};

module.exports = verbPhrase;
