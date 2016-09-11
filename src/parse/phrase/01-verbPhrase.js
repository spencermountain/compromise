'use strict';
//
const verbPhrase = function(result) {
  //'will have had'..
  result.match('#Auxillary+').tag('VerbPhrase');
  // 'is'
  result.match('#Copula').tag('VerbPhrase');
  result.match('#Verb').tag('VerbPhrase');
  //'really will'..
  result.match('#adverb #Auxillary').tag('VerbPhrase');
  //to go
  result.match('to #Infinitive').tag('VerbPhrase');
  //get the last verb
  result.match('#VerbPhrase #Verb').tag('VerbPhrase');
  return result;
};

module.exports = verbPhrase;
