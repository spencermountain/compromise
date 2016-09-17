'use strict';
const log = require('./tagger/paths').log;
const path = 'correction';
//
const corrections = function(r) {
  log.here(path);

  //the word 'so'
  //so funny
  r.match('so #Adjective', true).match('so', true).tag('Adverb');
  //so the
  r.match('so #Noun', true).match('so', true).tag('Conjunction');
  //do so
  r.match('do so', true).match('so', true).tag('Noun');
  //still good
  r.match('still #Adjective', true).match('still', true).tag('Adverb');
  //'more' is not always an adverb
  r.match('more #Noun', true).tag('Noun');
  //still make
  r.match('still #Verb', true).term(0).tag('Adverb', 'still-verb');

  //will secure our
  r.match('will #Adjective', true).term(1).tag('Verb', 'will-adj');

  //is no walk
  r.match('is no #Verb', true).term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .', true).match('#Verb', true).tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner4');
  //peter the great
  r.match('#Person the #Adjective', true).tag('Person', 'correction-determiner5');
  //book the flight
  r.match('#Noun the #Noun', true).term(0).tag('Verb', 'correction-determiner6');
  //a sense of
  r.match('#Determiner #Verb of', true).term(1).tag('Noun', 'the-verb-of');

  //past-tense copula
  r.match('has #Adverb? #Negative? #Adverb? been', true).tag('Copula');

  //he quickly foo
  r.match('#Noun #Adverb #Noun', true).term(2).tag('Verb', 'correction');

  //is eager to go
  r.match('#Copula #Adjective to #Verb', true).match('#Adjective to').tag('Verb', 'correction');

  //different views than
  r.match('#Verb than', true).term(0).tag('Noun', 'correction');

  //her polling
  r.match('#Possessive #Verb', true).term(1).tag('Noun', 'correction-possessive');

  //folks like her
  r.match('#Noun like #Noun', true).term(1).tag('Preposition', 'correction');

  //the threat of force
  r.match('#Determiner #Noun of #Verb', true).match('#Verb', true).tag('Noun', 'noun-of-noun');

  //big dreams, critical thinking
  r.match('#Adjective #PresentTense', true).term(1).tag('Noun', 'adj-presentTense');

  //ambiguous 'may' and 'march'
  r.match('(may|march) #Determiner', true).term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Value', true).term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Date', true).term(0).tag('Month', 'correction-may');
  r.match('#Date (may|march)', true).term(1).tag('Month', 'correction-may');
  r.match('(next|this|last) (may|march)', true).term(1).tag('Month', 'correction-may');

  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)', true).term(0).tag('Value');
  //all values are either ordinal or cardinal
  r.match('#Value', true).match('!#Ordinal', true).tag('#Cardinal');

  //time
  r.match('#Cardinal #Time', true).tag('Time', 'value-time');
  r.match('(by|before|after|at|@|about) #Time', true).tag('Time', 'preposition-time');
  r.match('(#Value|#Time) (am|pm)', true).tag('Time', 'value-ampm');
  //may the 5th
  r.match('#Date the? #Ordinal', true).term(1).tag('Date', 'correction-date');
  return r;
};

module.exports = corrections;
