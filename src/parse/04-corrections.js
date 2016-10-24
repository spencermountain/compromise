'use strict';
const log = require('./tagger/paths').log;
const path = 'correction';
//
const corrections = function(r) {
  log.here(path);

  //the word 'so'
  //so funny
  r.match('so #Adjective').match('so').tag('Adverb');
  //so the
  r.match('so #Noun').match('so').tag('Conjunction');
  //do so
  r.match('do so').match('so').tag('Noun');
  //still good
  r.match('still #Adjective').match('still').tag('Adverb');
  //'more' is not always an adverb
  r.match('more #Noun').tag('Noun');
  //still make
  r.match('still #Verb').term(0).tag('Adverb', 'still-verb');

  //the word 'second'
  r.match('second #Noun').term(0).unTag('Unit').tag('Ordinal', 'second-noun');

  //will secure our
  r.match('will #Adjective').term(1).tag('Verb', 'will-adj');

  //is no walk
  r.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb').match('#Verb').tag('#Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner4');
  //peter the great
  r.match('#Person the #Adjective').tag('Person', 'correction-determiner5');
  //book the flight
  r.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');
  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');

  //past-tense copula
  r.match('has #Adverb? #Negative? #Adverb? been').tag('Copula');

  //he quickly foo
  r.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');

  //is eager to go
  r.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');

  //different views than
  r.match('#Verb than').term(0).tag('Noun', 'correction');

  //her polling
  r.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'correction');

  //the threat of force
  r.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');

  //big dreams, critical thinking
  r.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');

  //ambiguous 'may' and 'march'
  r.match('(may|march) #Determiner').term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Value').term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Date').term(0).tag('Month', 'correction-may');
  r.match('#Date (may|march)').term(1).tag('Month', 'correction-may');
  r.match('(next|this|last) (may|march)').term(1).tag('Month', 'correction-may'); //maybe not 'this'

  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').term(0).tag('Value');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal');

  //time
  r.match('#Cardinal #Time').tag('Time', 'value-time');
  r.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  r.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  r.match('all day').tag('Time', 'all-day');
  //may the 5th
  r.match('#Date the? #Ordinal').term(1).tag('Date', 'correction-date');
  //5th of March
  r.match('#Value of? #Month').term(1).tag('Date', 'value-of-month');
  //5 March
  r.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //by 5 March
  r.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  r.match('#Date (by|before|after|at|@|about) #Cardinal').remove('^#Date').tag('Time', 'before-Cardinal');
  //2pm est
  r.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  r.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  r.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  r.match('at night').tag('Time');
  r.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time');
  r.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time');
  //march 12th 2018
  r.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  return r;
};

module.exports = corrections;
