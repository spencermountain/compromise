'use strict';
//
const nounPhrase = function(result) {
  //nice house
  result.match('#Adjective #NounPhrase').tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  result.match('#Determiner #NounPhrase').tag('NounPhrase');
  //
  result.match('#Noun #Preposition #Noun').tag('NounPhrase');
  //john and sara
  result.match('#Noun #Conjunction #Noun').tag('NounPhrase');
  //fifty stars
  result.match('#Value #NounPhrase').tag('NounPhrase');

  return result;
};

module.exports = nounPhrase;
