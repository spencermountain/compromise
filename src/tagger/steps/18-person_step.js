'use strict';

let titles = require('../paths').data.titles;
titles = titles.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

const person_step = function (ts) {
  if (ts.has('#FirstName').found) {

  }
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName', 'noun-lastname');

  // Firstname x (dangerous)
  let tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive').ifNo('#ClauseEnd .');
  tmp.lastTerm().canBe('#LastName').tag('#LastName', 'firstname-noun');

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person', 'acronym-titlecase');
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person', 'von der noun');
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', 'firstname-de-noun');
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person', 'king-of-noun');
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', 'firstname-al-noun');

  //ambiguous firstnames
  let maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match(maybe + ' #LastName').firstTerm().tag('#FirstName', 'maybe-lastname');

  //ambiguous lastnames
  maybe = ['green', 'white', 'brown', 'hall', 'young', 'king', 'hill', 'cook', 'gray', 'price'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match('#FirstName ' + maybe).tag('#Person', 'firstname-maybe');

  //people chunks
  //John L. Foo
  ts.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
  //Andrew Lloyd Webber
  ts.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase');
  //Mr Foo
  ts.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
  //mr X
  ts.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase');
  //John Foo
  ts.match('#FirstName #TitleCase #TitleCase?').match('#Noun+').tag('Person', 'firstname-titlecase');
  //ludwig van beethovan
  ts.match('#TitleCase (van|al|bin) #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  ts.match('#TitleCase (de|du) la? #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  //peter the great
  ts.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');
  //Morgan Shlkjsfne
  ts.match('#Person #TitleCase').match('#TitleCase #Noun').tag('Person', 'correction-person-titlecase');

  //last names
  // let reason = 'person-correction';
  //Joe K. Sombrero
  ts.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', 'n-acro-noun').lastTerm().tag('#LastName', 'n-acro-noun');
  //Jani K. Smith
  ts.match('#TitleCase #Acronym? #LastName').ifNo('#Date').tag('#Person', 'title-acro-noun').lastTerm().tag('#LastName', 'title-acro-noun');
  //john bodego's
  ts.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').tag('#Person', 'first-possessive').lastTerm().tag('#LastName', 'first-possessive');
  //pope francis
  ts.match('(lady|queen|sister) #TitleCase').ifNo('#Date').tag('#FemaleName', 'lady-titlecase');
  ts.match('(king|pope|father) #TitleCase').ifNo('#Date').tag('#MaleName', 'correction-poe');

  //peter II
  ts.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral');

  //'Professor Fink', 'General McCarthy'
  for(let i = 0; i < ts.terms.length - 1; i++) {
    let t = ts.terms[i];
    if (titles[t.normal]) {
      if (ts.terms[i + 1] && ts.terms[i + 1].tags.Person) {
        t.tag('Person', 'title-person');
      }
    }
  }

  //remove single 'mr'
  ts.match('#Person+').match('^#Honorific$').unTag('Person', 'single-honorific');
  return ts;
};

module.exports = person_step;
