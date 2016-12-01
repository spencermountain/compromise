'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/person_step';

const person_step = function (ts) {
  log.here(path);
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName')

  // Firstname x
  ts.match('#FirstName #Noun').lastTerm().canBe('#LastName').tag('#LastName')

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person')
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person')
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person')
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person')
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person')

  //ambiguous firstnames
  let maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill']
  maybe = '(' + maybe.join('|') + ')'
  ts.match(maybe + ' #LastName').firstTerm().tag('#FirstName')

  //ambiguous lastnames
  maybe = ['green', 'white', 'brown', 'hall', 'young', 'king', 'hill', 'cook', 'gray', 'price']
  maybe = '(' + maybe.join('|') + ')'
  ts.match('#FirstName ' + maybe).tag('#Person')
  return ts;
};

module.exports = person_step;
