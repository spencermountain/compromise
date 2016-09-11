'use strict';
//
const nounPhrase = function(result) {
  //nice house
  result.match('#Adjective #Noun').tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  result.match('#Determiner #NounPhrase').tag('NounPhrase');
  return result;
};

module.exports = nounPhrase;
