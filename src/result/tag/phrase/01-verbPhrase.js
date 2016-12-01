'use strict';
//
const verbPhrase = function (r) {
  r.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
  //was quickly
  r.match('#Adverb? #Verb #Adverb?').tag('VerbPhrase', 'verbphrase-verb');
  //is not
  r.match('#Verb #Negative').tag('VerbPhrase', 'verb-not');
  //never is
  r.match('never #Verb').tag('VerbPhrase', 'not-verb');
  //'will have had'..
  r.match('#Auxillary+').tag('VerbPhrase', '2');
  // 'is'
  r.match('#Copula').tag('VerbPhrase', '#3');
  //'really will'..
  r.match('#Adverb #Auxillary').tag('VerbPhrase', '#4');
  //to go
  r.match('to #Infinitive').tag('VerbPhrase', '#5');
  //work with
  r.match('#Verb #Preposition').tag('VerbPhrase', '#6');
  return r;
};

module.exports = verbPhrase;
