'use strict';
const log = require('../paths').log;
const path = 'correction';
const date_corrections = require('./date_corrections');

//
const corrections = function (r) {
  log.here(path);
  //the word 'so'
  //so funny
  r.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
  //so the
  r.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
  //do so
  r.match('do so').match('so').tag('Noun', 'so-noun');
  //still good
  r.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
  //'more' is not always an adverb
  r.match('more #Noun').tag('Noun', 'more-noun');
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

  //people chunks
  //John L. Foo
  r.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
  //Mr Foo
  r.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
  //John Foo
  r.match('#FirstName #TitleCase').match('#FirstName #Noun').tag('Person', 'firstname-titlecase');
  //peter the great
  r.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');


  //book the flight
  r.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');
  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');

  //past-tense copula
  r.match('has #Adverb? #Negative? #Adverb? been').tag('Copula', 'has-been');

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

  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').term(0).tag('Value', 'a-is-one');
  //half a million
  r.match('(half|quarter) a? #Value').tag('Value', 'half-a-value');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');

  //money
  r.match('#Value+ #Currency').tag('#Money', 'value-currency');
  r.match('#Money and #Money #Currency?').tag('#Money', 'money-and-money');

  //last names
  let reason = 'person-correction';
  r.match('#FirstName #Acronym? #TitleCase').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('(lady|queen) #TitleCase').ifNo('#Date').tag('#FemalePerson', reason);
  r.match('(king|pope) #TitleCase').ifNo('#Date').tag('#MalePerson', reason);

  r = date_corrections(r);

  return r;
};

module.exports = corrections;
