'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/person_step';

const person_step = function (ts) {
  log.here(path);
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().tagMaybe('#FirstName')

  // Firstname x
  ts.match('#FirstName #Noun').lastTerm().tagMaybe('#LastName')

  //j.k Rowling
  ts.match('#Acronym #TitleCase').tagMaybe('#Person')
  ts.match('#Noun van der? #Noun').tagMaybe('#Person')
  ts.match('(king|queen|prince|saint) of #Noun').tagMaybe('#Person')
  ts.match('#Noun al #Noun').tagMaybe('#Person')

  let maybeFirst = ['will', 'may', 'april', 'june']
  maybeFirst = '(' + maybeFirst.join('|') + ')'
  return ts;
};

module.exports = person_step;
