'use strict';
//
const verbPhrase = function(result) {
  result.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
  //was quickly
  result.match('#Adverb? #Verb #Adverb?').tag('VerbPhrase', 'verbphrase-verb');
  //is not
  result.match('#Verb #Negative').tag('VerbPhrase', 'verb-not');
  //never is
  result.match('never #Verb').tag('VerbPhrase', 'not-verb');
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
