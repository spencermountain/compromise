const maybeNoun =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const maybeAdj = '(misty|rusty|dusty|rich|randy)'
const maybeDate = '(april|june|may|jan|august|eve)'
const maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)'

const fixPerson = function(doc) {
  //j.k Rowling
  doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun')
  //king of spain
  doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun')
  //mr Putin
  doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin')

  // clues from honorifics
  let hon = doc.if('#Honorific')
  if (hon.found === true) {
    //mr X
    doc.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase')
    //remove single 'mr'
    doc.match('^#Honorific$').unTag('Person', 'single-honorific')
    //first general..
    doc.match('[(1st|2nd|first|second)] #Honorific').tag('Honorific', 'ordinal-honorific')
  }

  let person = doc.if('#Person')
  if (person.found === true) {
    //Frank jr
    person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')
    //peter II
    person.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral')
    //'Professor Fink', 'General McCarthy'
    person.match('#Honorific #Person').tag('Person', 'Honorific-Person')
    // 'john E rockefeller'
    person.match('#FirstName [/^[^aiurck]$/]').tag(['Acronym', 'Person'], 'john-e')
    //Doctor john smith jr
    person.match('#Honorific #Person').tag('Person', 'honorific-person')
    //general pearson
    person
      .match('[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person')
      .tag('Honorific', 'ambg-honorifics')

    //a bunch of ambiguous first names

    //Nouns: 'viola' or 'sky'
    let ambigNoun = person.if(maybeNoun)
    if (ambigNoun.found === true) {
      ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray')
      ambigNoun.match(maybeNoun + ' (#Person|#Acronym|#TitleCase)').tagSafe('Person', 'ray-smith')
    }

    //Verbs: 'pat' or 'wade'
    let ambigVerb = person.if(maybeVerb)
    if (ambigVerb === true) {
      ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark')
      ambigVerb.match(maybeVerb + ' (#Person|#TitleCase)').tag('Person', 'rob-smith')
    }

    //Adjectives: 'rusty' or 'rich'
    let ambigAdj = person.if(maybeAdj)
    if (ambigAdj.found === true) {
      ambigAdj.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich')
      ambigAdj.match(maybeAdj + ' (#Person|#TitleCase)').tag('Person', 'randy-smith')
    }

    //Dates: 'june' or 'may'
    let ambigDate = person.if(maybeDate)
    if (ambigDate.found === true) {
      ambigDate.match(String(maybeDate) + ' (#Person|#TitleCase)').tagSafe('Person', 'june-smith')
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').tagSafe('Date', 'in-june')
      ambigDate.match(maybeDate + ' (#Date|#Value)').tagSafe('Date', 'june-5th')
    }

    //Places: paris or syndey
    let ambigPlace = person.if(maybePlace)
    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').tagSafe('Place', 'in-paris')
      ambigPlace.match('[' + maybePlace + '] #Place').tagSafe('Place', 'paris-france')
      ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    }

    //this one is tricky
    let al = person.if('al')
    if (al.found === true) {
      al.match('al (#Person|#TitleCase)').tagSafe('#Person', 'al-borlen')
      al.match('#TitleCase al #TitleCase').tagSafe('#Person', 'arabic-al-arabic')
    }
  }

  //methods requiring a firstname match
  if (doc.has('#FirstName')) {
    // Firstname x (dangerous)
    let tmp = doc
      .match('#FirstName (#Noun|#TitleCase)')
      .ifNo('^#Possessive')
      .ifNo('#ClauseEnd .')
    tmp.lastTerm().tag('#LastName', 'firstname-noun')

    //ferdinand de almar
    doc.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun')
    //Osama bin Laden
    doc.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun')
    //John L. Foo
    doc.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase')
    //Andrew Lloyd Webber
    doc.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase')
    //Mr Foo
    doc.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase')
    //peter the great
    doc.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5')
    //very common-but-ambiguous lastnames
    doc.match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)').tag('#Person', 'firstname-maybe')

    //John Foo
    doc
      .match('#FirstName #TitleCase #TitleCase?')
      .match('#Noun+')
      .tag('Person', 'firstname-titlecase')
    //Joe K. Sombrero
    doc
      .match('#FirstName #Acronym #Noun')
      .ifNo('#Date')
      .tag('#Person', 'n-acro-noun')
      .lastTerm()
      .tag('#LastName', 'n-acro-noun')

    // Dwayne 'the rock' Johnson
    doc
      .match('#FirstName [#Determiner #Noun] #LastName')
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
      .match('[#Noun] #LastName')
      .canBe('#FirstName')
      .tag('#FirstName', 'noun-lastname')
    //ambiguous-but-common firstnames
    doc
      .match('[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName')
      .tag('#FirstName', 'maybe-lastname')

    //Jani K. Smith
    doc
      .match('#TitleCase #Acronym? #LastName')
      .ifNo('#Date')
      .tag('#Person', 'title-acro-noun')
      .lastTerm()
      .tag('#LastName', 'title-acro-noun')

    //is foo Smith
    doc.match('#Copula [(#Noun|#PresentTense)] #LastName').tag('#FirstName', 'copula-noun-lastname')
  }

  //methods requiring a titlecase
  if (doc.has('#TitleCase')) {
    doc.match('#Acronym #TitleCase').tagSafe('#Person', 'acronym-titlecase')
    //ludwig van beethovan
    doc.match('#TitleCase (van|al|bin) #TitleCase').tagSafe('Person', 'correction-titlecase-van-titlecase')
    //jose de Sucre
    doc.match('#TitleCase (de|du) la? #TitleCase').tagSafe('Person', 'correction-titlecase-van-titlecase')

    //Morgan Shlkjsfne
    doc
      .match('#Person #TitleCase')
      .match('#TitleCase #Noun')
      .tagSafe('Person', 'correction-person-titlecase')
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

  return doc
}
module.exports = fixPerson
