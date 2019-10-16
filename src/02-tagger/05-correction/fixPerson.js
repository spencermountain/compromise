const maybeNoun =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const maybeAdj = '(misty|rusty|dusty|rich|randy)'
const maybeDate = '(april|june|may|jan|august|eve)'
const maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)'

const fixPerson = function(doc) {
  // clues from honorifics
  let hon = doc.if('#Honorific')
  if (hon.found === true) {
    //mr Putin
    doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin')
    //mr X
    hon.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase')
    //remove single 'mr'
    hon.match('^#Honorific$').unTag('Person', 'single-honorific')
    //first general..
    hon.match('[(1st|2nd|first|second)] #Honorific').tag('Honorific', 'ordinal-honorific')
  }

  //methods requiring a titlecase
  let titleCase = doc.if('#TitleCase')
  if (titleCase.found === true) {
    titleCase.match('#Acronym #TitleCase').tagSafe('#Person', 'acronym-titlecase')
    //ludwig van beethovan
    titleCase.match('#TitleCase (van|al|bin) #TitleCase').tagSafe('Person', 'titlecase-van-titlecase')
    //jose de Sucre
    titleCase.match('#TitleCase (de|du) la? #TitleCase').tagSafe('Person', 'titlecase-van-titlecase')

    //pope francis
    titleCase
      .match('(lady|queen|sister) #TitleCase')
      .ifNo('#Date')
      .ifNo('#Honorific')
      .tag('#FemaleName', 'lady-titlecase')
    titleCase
      .match('(king|pope|father) #TitleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'poe')

    // jean Foobar
    titleCase.match(maybeNoun + ' #Acronym? #TitleCase').tagSafe('Person', 'ray-smith')
    // rob Foobar
    titleCase.match(maybeVerb + ' #Acronym? #TitleCase').tag('Person', 'rob-smith')
    // rusty Foobar
    titleCase.match(maybeAdj + ' #Acronym? #TitleCase').tag('Person', 'rusty-smith')
    // june Foobar
    titleCase.match(maybeDate + ' #Acronym? #TitleCase').tagSafe('Person', 'june-smith')
  }

  let person = doc.if('#Person')
  if (person.found === true) {
    //Frank jr
    person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')
    //peter II
    person.match('#Person #Person the? #RomanNumeral').tag('Person', 'roman-numeral')
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
    //Morgan Shlkjsfne
    titleCase
      .match('#Person #TitleCase')
      .match('#TitleCase #Noun')
      .tagSafe('Person', 'person-titlecase')
    //a bunch of ambiguous first names

    //Nouns: 'viola' or 'sky'
    let ambigNoun = person.if(maybeNoun)
    if (ambigNoun.found === true) {
      // ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray')
      ambigNoun.match(maybeNoun + ' #Person').tagSafe('Person', 'ray-smith')
    }

    //Verbs: 'pat' or 'wade'
    let ambigVerb = person.if(maybeVerb)
    if (ambigVerb === true) {
      ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark')
      ambigVerb.match(maybeVerb + ' #Person').tag('Person', 'rob-smith')
    }

    //Adjectives: 'rusty' or 'rich'
    let ambigAdj = person.if(maybeAdj)
    if (ambigAdj.found === true) {
      ambigAdj.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich')
      ambigAdj.match(maybeAdj + ' #Person').tag('Person', 'randy-smith')
    }

    //Dates: 'june' or 'may'
    let ambigDate = person.if(maybeDate)
    if (ambigDate.found === true) {
      ambigDate.match(String(maybeDate) + ' #Person').tagSafe('Person', 'june-smith')
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').tagSafe('Date', 'in-june')
      ambigDate.match(maybeDate + ' (#Date|#Value)').tagSafe('Date', 'june-5th')
    }

    //Places: paris or syndey
    let ambigPlace = person.if(maybePlace)
    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').tagSafe('Place', 'in-paris')
      ambigPlace.match('[' + maybePlace + '] #Place').tagSafe('Place', 'paris-france')
      // ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    }

    //this one is tricky
    let al = person.if('al')
    if (al.found === true) {
      al.match('al (#Person|#TitleCase)').tagSafe('#Person', 'al-borlen')
      al.match('#TitleCase al #TitleCase').tagSafe('#Person', 'arabic-al-arabic')
    }

    let firstName = person.if('#FirstName')
    if (firstName.found === true) {
      //ferdinand de almar
      firstName.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun')
      //Osama bin Laden
      firstName.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun')
      //John L. Foo
      firstName.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase')
      //Andrew Lloyd Webber
      firstName.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase')
      //Mr Foo
      firstName.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase')
      //peter the great
      firstName.match('#FirstName the #Adjective').tag('Person', 'determiner5')

      //very common-but-ambiguous lastnames
      firstName
        .match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)')
        .tag('#Person', 'firstname-maybe')

      //John Foo
      firstName
        .match('#FirstName #TitleCase #TitleCase?')
        .match('#Noun+')
        .tag('Person', 'firstname-titlecase')
      //Joe K. Sombrero
      firstName
        .match('#FirstName #Acronym #Noun')
        .ifNo('#Date')
        .tag('#Person', 'n-acro-noun')
        .lastTerm()
        .tag('#LastName', 'n-acro-noun')

      // Dwayne 'the rock' Johnson
      firstName
        .match('#FirstName [#Determiner #Noun] #LastName')
        .tag('#NickName', 'first-noun-last')
        .tag('#Person', 'first-noun-last')

      //john bodego's
      firstName
        .match('#FirstName (#Singular|#Possessive)')
        .ifNo('#Date')
        .ifNo('#NickName')
        .tag('#Person', 'first-possessive')
        .lastTerm()
        .tag('#LastName', 'first-possessive')

      // Firstname x (dangerous)
      let tmp = firstName
        .match('#FirstName (#Noun|#TitleCase)')
        .ifNo('^#Possessive')
        .ifNo('#ClauseEnd .')
        .ifNo('#Pronoun')
      tmp.lastTerm().tag('#LastName', 'firstname-noun')
    }

    let lastName = person.if('#LastName')
    if (lastName.found === true) {
      //is foo Smith
      lastName.match('#Copula [(#Noun|#PresentTense)] #LastName').tag('#FirstName', 'copula-noun-lastname')
      // x Lastname
      lastName
        .match('[#Noun] #LastName')
        .canBe('#FirstName')
        .tag('#FirstName', 'noun-lastname')
      //ambiguous-but-common firstnames
      lastName
        .match(
          '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName'
        )
        .tag('#FirstName', 'maybe-lastname')
      //Jani K. Smith
      lastName
        .match('(#TitleCase|#Singular) #Acronym? #LastName')
        .ifNo('#Date')
        .tag('#Person', 'title-acro-noun')
        .lastTerm()
        .tag('#LastName', 'title-acro-noun')
    }
  }

  return doc
}
module.exports = fixPerson
