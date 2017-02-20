'use strict';
const log = require('../paths').log;
const path = 'correction';
const verb_corrections = require('./verb_corrections');

//mostly pos-corections here
const corrections = function (r) {
  log.here(path);
  //ambig prepositions/conjunctions
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
  //foot/feet
  r.match('(foot|feet)').tag('Noun', 'foot-noun');
  r.match('#Value (foot|feet)').match('(foot|feet)').tag('Unit', 'foot-unit');
  //the word 'how'
  r.match('how (#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-question');
  //will secure our
  r.match('will #Adjective').term(1).tag('Verb', 'will-adj');
  //'u' as pronoun
  r.match('u #Verb').term(0).tag('Pronoun', 'u-pronoun-1');
  r.match('#Conjunction u').term(1).tag('Pronoun', 'u-pronoun-2');
  //is no walk
  r.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb').match('#Verb').tag('Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner4');

  //organization
  r.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
  r.match('#Organization #Country').tag('Organization', 'org-country');
  r.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
  r.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');

  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');
  //he quickly foo
  r.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');
  //is eager to go
  r.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
  //different views than
  r.match('#Verb than').term(0).tag('Noun', 'correction');
  //her polling
  r.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //like
  r.match('just like').term(1).tag('Preposition', 'like-preposition');
  //folks like her
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'noun-like');
  //look like
  r.match('#Verb like').term(1).tag('Adverb', 'verb-like');
  //exactly like
  r.match('#Adverb like').term(1).tag('Adverb', 'adverb-like');

  //the threat of force
  r.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');
  //big dreams, critical thinking
  r.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');
  //my buddy
  r.match('#Possessive #FirstName').term(1).unTag('Person', 'possessive-name');
  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').ifNo('#Plural').term(0).tag('Value', 'a-is-one');
  //half a million
  r.match('half a? #Value').tag('Value', 'half-a-value'); //quarter not ready
  r.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');

  //money
  r.match('#Value+ #Currency').tag('Money', 'value-currency');
  r.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');

  //swear-words as non-expression POS
  //nsfw
  r.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  r.match('#Determiner (shit|damn|hell)').term(1).tag('Noun', 'swears-noun');
  r.match('(shit|damn|fuck) (#Determiner|#Possessive|them)').term(0).tag('Verb', 'swears-verb');
  r.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective');

  //more-detailed corrections
  r = verb_corrections(r);

  return r;
};

module.exports = corrections;
