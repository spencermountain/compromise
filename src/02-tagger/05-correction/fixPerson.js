const fixPerson = function(doc) {
  // 'john E rockefeller'
  doc.match('#FirstName /^[^aiurck]$/').tag(['Acronym', 'Person'], 'john-e')

  //Doctor john smith jr
  doc.match('#Honorific #Person').tag('Person', 'honorific-person')
  doc.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')

  //mr Putin
  doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin')

  //a bunch of ambiguous first names
  let maybeNoun =
    '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
  if (doc.has(maybeNoun)) {
    doc.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray')
    doc
      .match(maybeNoun + ' (#Person|#Acronym|#TitleCase)')
      .canBe('#Person')
      .tag('Person', 'ray-smith')
  }
  //verbs or people-names
  let maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
  if (doc.has(maybeVerb)) {
    doc.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark')
    doc.match(maybeVerb + ' (#Person|#TitleCase)').tag('Person', 'rob-smith')
  }
  //adjectives or people-names
  let maybeAdj = '(misty|rusty|dusty|rich|randy)'
  if (doc.has(maybeAdj)) {
    doc.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich')
    doc.match(maybeAdj + ' (#Person|#TitleCase)').tag('Person', 'randy-smith')
  }
  //dates as people names
  let maybeDate = '(april|june|may|jan|august|eve)'
  if (doc.has(maybeDate)) {
    doc
      .match(String(maybeDate) + ' (#Person|#TitleCase)')
      .canBe('#Person')
      .tag('Person', 'june-smith')
    doc
      .match('(in|during|on|by|before|#Date) [' + maybeDate + ']')
      .canBe('#Date')
      .tag('Date', 'in-june')
    doc
      .match(maybeDate + ' (#Date|#Value)')
      .canBe('#Date')
      .tag('Date', 'june-5th')
  }
  //place-names as people-names
  let maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)'
  if (doc.has(maybePlace)) {
    doc
      .match('(in|near|at|from|to|#Place) [' + maybePlace + ']')
      .canBe('#Place')
      .tag('Place', 'in-paris')
    doc
      .match('[' + maybePlace + '] #Place')
      .canBe('#Place')
      .tag('Place', 'paris-france')
    doc
      .match('[' + maybePlace + '] #Person')
      .canBe('#Person')
      .tag('Person', 'paris-hilton')
  }
  //this one is tricky
  if (doc.match('al')) {
    doc
      .match('al (#Person|#TitleCase)')
      .canBe('#Person')
      .tag('#Person', 'al-borlen')
    doc
      .match('#TitleCase al #TitleCase')
      .canBe('#Person')
      .tag('#Person', 'arabic-al-arabic')
  }
  //ambiguous honorifics
  doc
    .match('(private|general|major|corporal|lord|lady|secretary|premier) #Honorific? #Person')
    .terms(0)
    .tag('Honorific', 'ambg-honorifics')
  //first general..
  doc
    .match('(1st|2nd|first|second) #Honorific')
    .terms(0)
    .tag('Honorific', 'ordinal-honorific')

  //methods requiring a firstname match
  if (doc.has('#FirstName')) {
    // Firstname x (dangerous)
    let tmp = doc
      .match('#FirstName #Noun')
      .ifNo('^#Possessive')
      .ifNo('#ClauseEnd .')
    tmp
      .lastTerm()
      .canBe('#LastName')
      .tag('#LastName', 'firstname-noun')
    //ferdinand de almar
    doc
      .match('#FirstName de #Noun')
      .canBe('#Person')
      .tag('#Person', 'firstname-de-noun')
    //Osama bin Laden
    doc
      .match('#FirstName (bin|al) #Noun')
      .canBe('#Person')
      .tag('#Person', 'firstname-al-noun')
    //John L. Foo
    doc.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase')
    //Andrew Lloyd Webber
    doc.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase')
    //Mr Foo
    doc.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase')
    //John Foo
    doc
      .match('#FirstName #TitleCase #TitleCase?')
      .match('#Noun+')
      .tag('Person', 'firstname-titlecase')
    //peter the great
    doc.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5')
    //very common-but-ambiguous lastnames
    doc.match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)').tag('#Person', 'firstname-maybe')
    //Joe K. Sombrero
    doc
      .match('#FirstName #Acronym #Noun')
      .ifNo('#Date')
      .tag('#Person', 'n-acro-noun')
      .lastTerm()
      .tag('#LastName', 'n-acro-noun')
    // Dwayne 'the rock' Johnson
    doc
      .match('#FirstName [#Determiner? #Noun] #LastName')
      .tag('#NickName', 'first-noun-last')
      .tag('#Person', 'first-noun-last')

    //john bodego's
    doc
      .match('#FirstName (#Singular|#Possessive)')
      .ifNo('#Date')
      .ifNo('#NickName')
      .tag('#Person', 'first-possessive')
      .lastTerm()
      .tag('#LastName', 'first-possessive')
  }

  //methods requiring a lastname match
  if (doc.has('#LastName')) {
    // x Lastname
    doc
      .match('#Noun #LastName')
      .firstTerm()
      .canBe('#FirstName')
      .tag('#FirstName', 'noun-lastname')
    //ambiguous-but-common firstnames
    doc
      .match('(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill) #LastName')
      .firstTerm()
      .tag('#FirstName', 'maybe-lastname')
    //Jani K. Smith
    doc
      .match('#TitleCase #Acronym? #LastName')
      .ifNo('#Date')
      .tag('#Person', 'title-acro-noun')
      .lastTerm()
      .tag('#LastName', 'title-acro-noun')
    //is foo Smith
    doc
      .match('#Copula (#Noun|#PresentTense) #LastName')
      .term(1)
      .tag('#FirstName', 'copula-noun-lastname')
  }

  //methods requiring a titlecase
  if (doc.has('#TitleCase')) {
    doc
      .match('#Acronym #TitleCase')
      .canBe('#Person')
      .tag('#Person', 'acronym-titlecase')
    //ludwig van beethovan
    doc
      .match('#TitleCase (van|al|bin) #TitleCase')
      .canBe('#Person')
      .tag('Person', 'correction-titlecase-van-titlecase')
    doc
      .match('#TitleCase (de|du) la? #TitleCase')
      .canBe('#Person')
      .tag('Person', 'correction-titlecase-van-titlecase')
    //Morgan Shlkjsfne
    doc
      .match('#Person #TitleCase')
      .match('#TitleCase #Noun')
      .canBe('#Person')
      .tag('Person', 'correction-person-titlecase')
    //pope francis
    doc
      .match('(lady|queen|sister) #TitleCase')
      .ifNo('#Date')
      .ifNo('#Honorific')
      .tag('#FemaleName', 'lady-titlecase')
    doc
      .match('(king|pope|father) #TitleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'correction-poe')
  }

  //j.k Rowling
  doc
    .match('#Noun van der? #Noun')
    .canBe('#Person')
    .tag('#Person', 'von der noun')
  //king of spain
  doc
    .match('(king|queen|prince|saint|lady) of? #Noun')
    .canBe('#Person')
    .tag('#Person', 'king-of-noun')
  //mr X
  doc.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase')
  //peter II
  doc.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral')

  //'Professor Fink', 'General McCarthy'
  doc.match('#Honorific #Person').tag('Person', 'Honorific-Person')

  //remove single 'mr'
  doc.match('^#Honorific$').unTag('Person', 'single-honorific')
  return doc
}
module.exports = fixPerson
