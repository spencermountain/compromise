'use strict';
const log = require('../paths').log;
const path = 'person_correction';

const corrections = function (r) {
  log.here(path);

  //people chunks
  //John L. Foo
  r.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
  //Andrew Lloyd Webber
  r.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase');
  //Mr Foo
  r.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
  //John Foo
  r.match('#FirstName #TitleCase').match('#FirstName #Noun').tag('Person', 'firstname-titlecase');
  //ludwig van beethovan
  r.match('#TitleCase (van|al|bin) #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  r.match('#TitleCase (de|du) la? #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  //peter the great
  r.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');
  //Morgan Shlkjsfne
  r.match('#Person #TitleCase').match('#TitleCase #Noun').tag('Person', 'correction-person-titlecase');

  //last names
  let reason = 'person-correction';
  r.match('#FirstName #Acronym? #TitleCase').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('(lady|queen|sister) #TitleCase').ifNo('#Date').tag('#FemaleName', reason);
  r.match('(king|pope|father) #TitleCase').ifNo('#Date').tag('#MaleName', 'correction-poe');

  //peter II
  r.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral');
  return r;
};
module.exports = corrections;
