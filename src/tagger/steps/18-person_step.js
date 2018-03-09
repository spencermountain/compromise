'use strict';

//sort-out things like 'theresa may', or 'will jones'.
const person_step = function(ts) {
  //mr Putin
  ts.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin');

  //a bunch of ambiguous first names
  let maybeNoun = '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)';
  if (ts.has(maybeNoun)) {
    ts.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray');
    ts.match(maybeNoun + ' (#Person|#Acronym|#TitleCase)').canBe('#Person').tag('Person', 'ray-smith');
  }
  //verbs or people-names
  let maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)';
  if (ts.has(maybeVerb)) {
    ts.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark');
    ts.match(maybeVerb + ' (#Person|#TitleCase)').tag('Person', 'rob-smith');
  }
  //adjectives or people-names
  let maybeAdj = '(misty|rusty|dusty|rich|randy)';
  if (ts.has(maybeAdj)) {
    ts.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich');
    ts.match(maybeAdj + ' (#Person|#TitleCase)').tag('Person', 'randy-smith');
  }
  //dates as people names
  let maybeDate = '(april|june|may|jan|august|eve)';
  if (ts.has(maybeDate)) {
    ts.match(String(maybeDate) + ' (#Person|#TitleCase)').canBe('#Person').tag('Person', 'june-smith');
    ts.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').canBe('#Date').tag('Date', 'in-june');
    ts.match(maybeDate + ' (#Date|#Value)').canBe('#Date').tag('Date', 'june-5th');
  }
  //place-names as people-names
  let maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)';
  if (ts.has(maybePlace)) {
    ts.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').canBe('#Place').tag('Place', 'in-paris');
    ts.match('[' + maybePlace + '] #Place').canBe('#Place').tag('Place', 'paris-france');
    ts.match('[' + maybePlace + '] #Person').canBe('#Person').tag('Person', 'paris-hilton');
  }
  //this one is tricky
  if (ts.match('al')) {
    ts.match('al (#Person|#TitleCase)').canBe('#Person').tag('#Person', 'al-borlen');
    ts.match('#TitleCase al #TitleCase').canBe('#Person').tag('#Person', 'arabic-al-arabic');
  }
  // let firstNames = '()';
  // let names = ts.match(firstNames);
  // if (names.found) {
  //   //prolly not a name:
  //   if (ts.has('(#Determiner|#Adverb|#Pronoun|#Possessive) ' + firstNames)) {
  //     names.unTag('Person', 'the-bill');
  //   } else {
  //     //probably a name here:
  //     let name = ts.match('(#Honorific|#Person) ' + firstNames);
  //     if (!name.found) {
  //       name = ts.match(firstNames + ' (#Person|#Honorific|#TitleCase)');
  //     }
  //     if (name.found && name.has('(#Place|#Date|#Organization)') === false) {
  //       name.tag('Person', 'dr-bill');
  //       names.tag('FirstName', 'ambiguous-name');
  //     }
  //   }
  // }
  //tighter-matches for other ambiguous names:
  // ts.match('(al|) #Acronym? #LastName').firstTerm().tag('#FirstName', 'ambig-lastname');

  //methods requiring a firstname match
  if (ts.has('#FirstName')) {
    // Firstname x (dangerous)
    let tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive').ifNo('#ClauseEnd .');
    tmp.lastTerm().canBe('#LastName').tag('#LastName', 'firstname-noun');
    //ferdinand de almar
    ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', 'firstname-de-noun');
    //Osama bin Laden
    ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', 'firstname-al-noun');
    //John L. Foo
    ts.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
    //Andrew Lloyd Webber
    ts.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase');
    //Mr Foo
    ts.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
    //John Foo
    ts.match('#FirstName #TitleCase #TitleCase?').match('#Noun+').tag('Person', 'firstname-titlecase');
    //peter the great
    ts.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');
    //very common-but-ambiguous lastnames
    ts.match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)').tag('#Person', 'firstname-maybe');
    //Joe K. Sombrero
    ts.match('#FirstName #Acronym #Noun')
      .ifNo('#Date')
      .tag('#Person', 'n-acro-noun')
      .lastTerm()
      .tag('#LastName', 'n-acro-noun');
    // Dwayne 'the rock' Johnson
    ts.match('#FirstName [#Determiner? #Noun] #LastName')
      .tag('#NickName', 'first-noun-last')
      .tag('#Person', 'first-noun-last');

    //john bodego's
    ts.match('#FirstName (#Singular|#Possessive)')
      .ifNo('#Date')
      .ifNo('#NickName')
      .tag('#Person', 'first-possessive')
      .lastTerm()
      .tag('#LastName', 'first-possessive');
  }

  //methods requiring a lastname match
  if (ts.has('#LastName')) {
    // x Lastname
    ts.match('#Noun #LastName')
      .firstTerm()
      .canBe('#FirstName')
      .tag('#FirstName', 'noun-lastname');
    //ambiguous-but-common firstnames
    ts.match('(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill) #LastName')
      .firstTerm()
      .tag('#FirstName', 'maybe-lastname');
    //Jani K. Smith
    ts.match('#TitleCase #Acronym? #LastName')
      .ifNo('#Date')
      .tag('#Person', 'title-acro-noun')
      .lastTerm()
      .tag('#LastName', 'title-acro-noun');
    //is foo Smith
    ts.match('#Copula (#Noun|#PresentTense) #LastName')
      .term(1)
      .tag('#FirstName', 'copula-noun-lastname');
  }

  //methods requiring a titlecase
  if (ts.has('#TitleCase')) {
    ts.match('#Acronym #TitleCase')
      .canBe('#Person')
      .tag('#Person', 'acronym-titlecase');
    //ludwig van beethovan
    ts.match('#TitleCase (van|al|bin) #TitleCase')
      .canBe('#Person')
      .tag('Person', 'correction-titlecase-van-titlecase');
    ts.match('#TitleCase (de|du) la? #TitleCase')
      .canBe('#Person')
      .tag('Person', 'correction-titlecase-van-titlecase');
    //Morgan Shlkjsfne
    ts.match('#Person #TitleCase')
      .match('#TitleCase #Noun')
      .canBe('#Person')
      .tag('Person', 'correction-person-titlecase');
    //pope francis
    ts.match('(lady|queen|sister) #TitleCase')
      .ifNo('#Date')
      .tag('#FemaleName', 'lady-titlecase');
    ts.match('(king|pope|father) #TitleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'correction-poe');
  }

  //j.k Rowling
  ts.match('#Noun van der? #Noun')
    .canBe('#Person')
    .tag('#Person', 'von der noun');
  //king of spain
  ts.match('(king|queen|prince|saint|lady) of? #Noun')
    .canBe('#Person')
    .tag('#Person', 'king-of-noun');
  //mr X
  ts.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase');
  //peter II
  ts.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral');

  //'Professor Fink', 'General McCarthy'
  ts.match('#Honorific #Person').tag('Person', 'Honorific-Person');

  //remove single 'mr'
  ts.match('^#Honorific$').unTag('Person', 'single-honorific');


  return ts;
};

module.exports = person_step;
