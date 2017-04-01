'use strict';
const verb_corrections = require('./verb_corrections');

//mostly pos-corections here
const corrections = function (ts) {

  //ambig prepositions/conjunctions
  if (ts.has('so')) {
    //so funny
    ts.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
    //so the
    ts.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
    //do so
    ts.match('do so').match('so').tag('Noun', 'so-noun');
  }

  //Determiner-signals
  if (ts.has('#Determiner')) {
    //the wait to vote
    ts.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
    //the swim
    ts.match('the #Verb').match('#Verb').tag('Noun', 'correction-determiner2');
    //the nice swim
    ts.match('the #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner3');
    //the truly nice swim
    ts.match('the #Adverb #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner4');
    //a stream runs
    ts.match('#Determiner #Infinitive #Adverb? #Verb').term(1).tag('Noun', 'correction-determiner5');
    //a sense of
    ts.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');
    //the threat of force
    ts.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');
  }

  //organization
  if (ts.has('#Organization')) {
    ts.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
    ts.match('#Organization #Country').tag('Organization', 'org-country');
    ts.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
  }

  //like
  if (ts.has('like')) {
    ts.match('just like').term(1).tag('Preposition', 'like-preposition');
    //folks like her
    ts.match('#Noun like #Noun').term(1).tag('Preposition', 'noun-like');
    //look like
    ts.match('#Verb like').term(1).tag('Adverb', 'verb-like');
    //exactly like
    ts.match('#Adverb like').term(1).tag('Adverb', 'adverb-like');
  }

  if (ts.has('#Value')) {
    //half a million
    ts.match('half a? #Value').tag('Value', 'half-a-value'); //quarter not ready
    ts.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
    //all values are either ordinal or cardinal
    ts.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
    //money
    ts.match('#Value+ #Currency').tag('Money', 'value-currency');
  }

  if (ts.has('#Noun')) {
    //'more' is not always an adverb
    ts.match('more #Noun').tag('Noun', 'more-noun');
    //the word 'second'
    ts.match('second #Noun').term(0).unTag('Unit').tag('Ordinal', 'second-noun');
    //he quickly foo
    ts.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');
  }

  if (ts.has('#Verb')) {
    //still make
    ts.match('still #Verb').term(0).tag('Adverb', 'still-verb');
    //'u' as pronoun
    ts.match('u #Verb').term(0).tag('Pronoun', 'u-pronoun-1');
    //is no walk
    ts.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');
    //different views than
    ts.match('#Verb than').term(0).tag('Noun', 'correction');
    //her polling
    ts.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');
    //is eager to go
    ts.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
    //the word 'how'
    ts.match('how (#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-question');
  }

  if (ts.has('#Adjective')) {
    //still good
    ts.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
    //big dreams, critical thinking
    ts.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');
    //will secure our
    ts.match('will #Adjective').term(1).tag('Verb', 'will-adj');
  }

  //misc:
  //foot/feet
  ts.match('(foot|feet)').tag('Noun', 'foot-noun');
  ts.match('#Value (foot|feet)').match('(foot|feet)').tag('Unit', 'foot-unit');
  //'u' as pronoun
  ts.match('#Conjunction u').term(1).tag('Pronoun', 'u-pronoun-2');
  //FitBit Inc
  ts.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');
  //my buddy
  ts.match('#Possessive #FirstName').term(1).unTag('Person', 'possessive-name');
  //'a/an' can mean 1
  ts.match('(a|an) (#Duration|#Value)').ifNo('#Plural').term(0).tag('Value', 'a-is-one');

  ts.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');

  //swear-words as non-expression POS
  //nsfw
  ts.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  ts.match('#Determiner (shit|damn|hell)').term(1).tag('Noun', 'swears-noun');
  ts.match('(shit|damn|fuck) (#Determiner|#Possessive|them)').term(0).tag('Verb', 'swears-verb');
  ts.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective');

  //more-detailed corrections
  ts = verb_corrections(ts);

  return ts;
};

module.exports = corrections;
