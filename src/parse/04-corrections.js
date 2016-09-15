'use strict';
//
const corrections = function(result) {
  //Determiner-signals
  //the wait to vote
  result.match('the #Verb #Preposition .', true).match('#Verb', true).tag('Noun', 'correction-determiner1');
  //the swim
  result.match('the #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner2');
  //the nice swim
  result.match('the #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  result.match('the #Adverb #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner4');
  //peter the great
  result.match('#Person the #Adjective', true).tag('Person', 'correction-determiner5');
  //book the flight
  result.match('#Noun the #Noun', true).term(0).tag('Verb', 'correction-determiner6');


  //he quickly foo
  result.match('#Noun #Adverb #Noun', true).term(2).tag('Verb', 'correction');

  //is eager to go
  result.match('#Copula #Adjective to #Verb', true).match('#Adjective to').tag('Verb', 'correction');

  //different views than
  result.match('#Verb than', true).term(0).tag('Noun', 'correction');

  //her polling
  // result.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  result.match('#Plural like #Noun', true).term(1).tag('Preposition', 'correction');

  //ambiguous 'may' and 'march'
  result.match('(may|march) #Determiner', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Value', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Date', true).term(0).tag('Month', 'correction-may');
  result.match('#Date (may|march)', true).term(1).tag('Month', 'correction-may');
  result.match('(next|this|last) (may|march)', true).term(1).tag('Month', 'correction-may');
  //time
  result.match('#Value #Time', true).tag('Time', 'value-time');
  result.match('(by|before|after|at|@|about) #Time', true).tag('Time', 'preposition-time');
  result.match('(#Value|#Time) (am|pm)', true).tag('Time', 'value-ampm');
  //may the 5th
  result.match('#Date the #Ordinal', true).term(1).tag('Date', 'correction-date');
  //'a/an' can mean 1
  result.match('(a|an) (#Duration|#Value)', true).term(0).tag('Value');
  //all values are either ordinal or cardinal
  result.match('#Value', true).match('!#Ordinal', true).tag('#Cardinal');
  return result;
};

module.exports = corrections;
