'use strict';
//
const nounPhrase = function(result) {
  //nice house
  result.match('#Adjective #NounPhrase', true).tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  result.match('#Determiner #NounPhrase', true).tag('NounPhrase');
  //
  result.match('#Noun #Preposition #Noun', true).tag('NounPhrase');
  //john and sara
  result.match('#Noun #Conjunction #Noun', true).tag('NounPhrase');
  //fifty stars
  result.match('#Value #NounPhrase', true).tag('NounPhrase');
  //difficult but necessary talks
  result.match('#Adjective #Conjunction #Adjective #NounPhrase', true).tag('NounPhrase');

  return result;
};

module.exports = nounPhrase;
