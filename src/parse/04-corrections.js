'use strict';
const log = require('./tagger/paths').log;
const path = 'correction';
//
const corrections = function(result) {
  log.here(path);

  //the word 'so'
  //so funny
  result.match('so #Adjective', true).match('so', true).tag('Adverb');
  //so the
  result.match('so #Noun', true).match('so', true).tag('Conjunction');
  //do so
  result.match('do so', true).match('so', true).tag('Noun');
  //still good
  result.match('still #Adjective', true).match('still', true).tag('Adverb');
  //'more' is not always an adverb
  result.match('more #Noun', true).tag('Noun');
  //still make
  result.match('still #Verb', true).term(0).tag('Adverb', 'still-verb');

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

  //past-tense copula
  result.match('has #Adverb? #Negative? #Adverb? been', true).tag('Copula');

  //he quickly foo
  result.match('#Noun #Adverb #Noun', true).term(2).tag('Verb', 'correction');

  //is eager to go
  result.match('#Copula #Adjective to #Verb', true).match('#Adjective to').tag('Verb', 'correction');

  //different views than
  result.match('#Verb than', true).term(0).tag('Noun', 'correction');

  //her polling
  result.match('#Possessive #Verb', true).term(1).tag('Noun', 'correction-possessive');

  //folks like her
  result.match('#Plural like #Noun', true).term(1).tag('Preposition', 'correction');

  //the threat of force
  result.match('#Determiner #Noun of #Verb', true).match('#Verb', true).tag('Noun', 'noun-of-noun');

  //big dreams, critical thinking
  result.match('#Adjective #PresentTense', true).term(1).tag('Noun', 'adj-presentTense');

  //ambiguous 'may' and 'march'
  result.match('(may|march) #Determiner', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Value', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Date', true).term(0).tag('Month', 'correction-may');
  result.match('#Date (may|march)', true).term(1).tag('Month', 'correction-may');
  result.match('(next|this|last) (may|march)', true).term(1).tag('Month', 'correction-may');

  //'a/an' can mean 1
  result.match('(a|an) (#Duration|#Value)', true).term(0).tag('Value');
  //all values are either ordinal or cardinal
  result.match('#Value', true).match('!#Ordinal', true).tag('#Cardinal');

  //time
  result.match('#Cardinal #Time', true).tag('Time', 'value-time');
  result.match('(by|before|after|at|@|about) #Time', true).tag('Time', 'preposition-time');
  result.match('(#Value|#Time) (am|pm)', true).tag('Time', 'value-ampm');
  //may the 5th
  result.match('#Date the? #Ordinal', true).term(1).tag('Date', 'correction-date');
  return result;
};

module.exports = corrections;
