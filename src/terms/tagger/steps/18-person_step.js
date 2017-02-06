'use strict';
const log = require('../paths').log;
const path = 'tagger/person_step';

let titles = require('../paths').data.titles;
titles = titles.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

const person_step = function (ts) {
  log.here(path);
  let reason = 'person-step';
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName', reason);

  // Firstname x (dangerous)
  let tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive');
  tmp.lastTerm().canBe('#LastName').tag('#LastName', reason);

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person', reason);
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', reason);

  //ambiguous firstnames
  let maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match(maybe + ' #LastName').firstTerm().tag('#FirstName', reason);

  //ambiguous lastnames
  maybe = ['green', 'white', 'brown', 'hall', 'young', 'king', 'hill', 'cook', 'gray', 'price'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match('#FirstName ' + maybe).tag('#Person', reason);

  //'Professor Fink', 'General McCarthy'
  for(let i = 0; i < ts.terms.length - 1; i++) {
    let t = ts.terms[i];
    if (titles[t.normal]) {
      if (ts.terms[i + 1] && ts.terms[i + 1].tag.Person) {
        t.tagAs('Person', 'title-person');
      }
    }
  }
  return ts;
};

module.exports = person_step;
