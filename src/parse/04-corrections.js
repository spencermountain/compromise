'use strict';
//
const corrections = function(result) {
  //the swim
  result.match('the #Verb').match('#Verb').tag('#Noun');
  //the nice swim
  result.match('the #Adjective #Verb').match('#Verb').tag('#Noun');
  //the truly nice swim
  result.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun');

  //peter the great
  result.match('#Person the #Adjective').tag('Person');
  //book the flight
  result.match('#Noun the #Noun').term(0).tag('Verb');

  // result.match('').tag('');


  return result;
};

module.exports = corrections;
