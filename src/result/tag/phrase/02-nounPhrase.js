'use strict';
//
const nounPhrase = function (r) {
  //fifty stars
  r.match('#Value #Noun').tag('NounPhrase');
  //nice house
  r.match('#Adjective #NounPhrase').tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  r.match('#Determiner #NounPhrase').tag('NounPhrase');
  //
  r.match('#Noun #Preposition #Noun').tag('NounPhrase');
  //john and sara
  r.match('#Noun #Conjunction #Noun').tag('NounPhrase');
  //difficult but necessary talks
  r.match('#Adjective #Conjunction #Adjective #NounPhrase').tag('NounPhrase');

  return r;
};

module.exports = nounPhrase;
