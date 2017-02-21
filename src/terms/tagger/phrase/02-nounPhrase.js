'use strict';
//
const nounPhrase = function (r) {
  let reason = 'noun-phrase-correction';
  //fifty stars
  r.match('#Value #Noun').tag('NounPhrase', reason);
  //nice house
  r.match('#Adjective #NounPhrase').tag('NounPhrase', reason);
  //tag preceding determiner 'the nice house'
  r.match('#Determiner #NounPhrase').tag('NounPhrase', reason);
  //
  r.match('#Noun #Preposition #Noun').tag('NounPhrase', reason);
  //john and sara
  r.match('#Noun #Conjunction #Noun').tag('NounPhrase', reason);
  //difficult but necessary talks
  r.match('#Adjective #Conjunction #Adjective #NounPhrase').tag('NounPhrase', reason);

  return r;
};

module.exports = nounPhrase;
