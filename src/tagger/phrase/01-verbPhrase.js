'use strict';
//a verbPhrase is a sequence of axiliaries, adverbs and verbs
const verbPhrase = function (ts) {
  if (ts.has('(#Verb|#Auxiliary)')) {
    ts.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
    //quickly was
    ts.match('#Adverb #Verb').tag('VerbPhrase', 'adverb-verb');
    //was quickly
    ts.match('#Verb #Adverb').tag('VerbPhrase', 'verb-adverb');
    //is not
    ts.match('#Verb #Negative').tag('VerbPhrase', 'verb-not');
    //never is
    ts.match('never #Verb').tag('VerbPhrase', 'not-verb');
    //'will have had'..
    ts.match('#Auxiliary+').tag('VerbPhrase', '2');
    // 'is'
    ts.match('#Copula').tag('VerbPhrase', '#3');
    //'really will'..
    ts.match('#Adverb #Auxiliary').tag('VerbPhrase', '#4');
  //to go
  // ts.match('to #Infinitive').tag('VerbPhrase', '#5');
  //work with
  // ts.match('#Verb #Preposition').tag('VerbPhrase', '#6');
  }
  return ts;
};

module.exports = verbPhrase;
