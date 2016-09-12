'use strict';
//
const corrections = function(result) {
  //Determiner-signals
  //the wait to vote
  result.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  result.match('the #Verb').match('#Verb').tag('#Noun', 'correction-determiner2');
  //the nice swim
  result.match('the #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  result.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner4');
  //peter the great
  result.match('#Person the #Adjective').tag('Person', 'correction-determiner5');
  //book the flight
  result.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');


  //he quickly foo
  result.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');

  //is eager to go
  result.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');

  //different views than
  result.match('#Verb than').term(0).tag('Noun', 'correction');

  //her polling
  // result.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  result.match('#Plural like #Noun').term(1).tag('Preposition', 'correction');

  return result;
};

module.exports = corrections;
