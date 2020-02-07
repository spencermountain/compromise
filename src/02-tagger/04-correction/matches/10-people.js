const nouns =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'

const months = '(january|april|may|june|jan|sep)' //summer|autumn

let list = [
  //my buddy
  { match: '#Possessive [#FirstName]', group: 0, tag: 'Person', reason: 'possessive-name' },
  { match: '[(1st|2nd|first|second)] #Honorific', group: 0, tag: 'Honorific', reason: 'ordinal-honorific' },
  { match: '#Acronym #ProperNoun', tag: 'Person', reason: 'acronym-titlecase', safe: true }, //ludwig van beethovan
  { match: '#Person (jr|sr|md)', tag: 'Person', reason: 'person-honorific' }, //peter II
  { match: '#Person #Person the? #RomanNumeral', tag: 'Person', reason: 'roman-numeral' }, //'Professor Fink', 'General McCarthy'
  { match: '#FirstName [/^[^aiurck]$/]', group: 0, tag: ['Acronym', 'Person'], reason: 'john-e' }, //Doctor john smith jr
  //general pearson
  { match: '#Honorific #Person', tag: 'Person', reason: 'honorific-person' },
  //remove single 'mr'
  { match: '#Honorific #Acronym', tag: 'Person', reason: 'Honorific-TitleCase' },
  //j.k Rowling
  { match: '#Noun van der? #Noun', tag: 'Person', reason: 'von der noun', safe: true },
  //king of spain
  { match: '(king|queen|prince|saint|lady) of? #Noun', tag: 'Person', reason: 'king-of-noun', safe: true },
  //Foo U Ford
  { match: '[#ProperNoun] #Person', group: 0, tag: 'Person', reason: 'proper-person', safe: true },

  { match: 'al (#Person|#ProperNoun)', tag: 'Person', reason: 'al-borlen', safe: true },
  //ferdinand de almar
  { match: '#FirstName de #Noun', tag: 'Person', reason: 'bill-de-noun' },
  //Osama bin Laden
  { match: '#FirstName (bin|al) #Noun', tag: 'Person', reason: 'bill-al-noun' },
  //John L. Foo
  { match: '#FirstName #Acronym #ProperNoun', tag: 'Person', reason: 'bill-acronym-title' },
  //Andrew Lloyd Webber
  { match: '#FirstName #FirstName #ProperNoun', tag: 'Person', reason: 'bill-firstname-title' },
  //Mr Foo
  { match: '#Honorific #FirstName? #ProperNoun', tag: 'Person', reason: 'dr-john-Title' },
  //peter the great
  { match: '#FirstName the #Adjective', tag: 'Person', reason: 'name-the-great' },

  //very common-but-ambiguous lastnames
  {
    match: '#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)',

    tag: 'Person',
    reason: 'bill-green',
  },
  //is foo Smith
  { match: '#Copula [(#Noun|#PresentTense)] #LastName', group: 0, tag: 'FirstName', reason: 'copula-noun-lastname' },
  //ambiguous-but-common firstnames
  {
    match: '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
    group: 0,
    tag: 'FirstName',
    reason: 'maybe-lastname',
  },

  //pope francis
  { match: '(lady|queen|sister) #ProperNoun', tag: 'FemaleName', reason: 'lady-titlecase', safe: true },
  { match: '(king|pope|father) #ProperNoun', tag: 'MaleName', reason: 'pope-titlecase', safe: true },

  // faith smith
  { match: `${nouns} #Person`, tag: 'Person', reason: 'ray-smith', safe: true },
  // faith m. Smith
  { match: `${nouns} #Acronym? #ProperNoun`, tag: 'Person', reason: 'ray-a-smith', safe: true },

  //give to april
  {
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person',
  },
  // remind june
  { match: `#Infinitive [${months}]`, group: 0, tag: 'Person', reason: 'infinitive-person' },
  // may waits for
  { match: `[${months}] #PresentTense for`, group: 0, tag: 'Person', reason: 'ambig-active-for' },
  // may waits for
  { match: `[${months}] #PresentTense to`, group: 0, tag: 'Person', reason: 'ambig-active-to' },
  // april will
  { match: `[${months}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' },
  // would april
  { match: `#Modal [${months}]`, group: 0, tag: 'Person', reason: 'modal-ambig' },
  // it is may
  { match: `#Copula [${months}]`, group: 0, tag: 'Person', reason: 'is-may' },
  // may is
  { match: `[${months}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' },
  // with april
  { match: `that [${months}]`, group: 0, tag: 'Person', reason: 'that-month' },
  { match: `with [${months}]`, group: 0, tag: 'Person', reason: 'with-month' },
  { match: `for [${months}]`, group: 0, tag: 'Person', reason: 'for-month' },
  // this april
  { match: `this [${months}]`, group: 0, tag: 'Month', reason: 'this-may' }, //maybe not 'this'
  { match: `next [${months}]`, group: 0, tag: 'Month', reason: 'next-may' },
  { match: `last [${months}]`, group: 0, tag: 'Month', reason: 'last-may' },

  // date tags
  // wednesday april
  { match: `#Date [${months}]`, group: 0, tag: 'Month', reason: 'date-may' },
  // may 5th
  { match: `[${months}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' },
  // 5th of may
  { match: `#Value of [${months}]`, group: 0, tag: 'Month', reason: '5th-of-may' },
  // dick van dyke
  { match: '#ProperNoun (van|al|bin) #ProperNoun', tag: 'Person', reason: 'title-van-title', safe: true },
  //jose de Sucre
  { match: '#ProperNoun (de|du) la? #ProperNoun', tag: 'Person', reason: 'title-de-title', safe: true },

  // Dwayne 'the rock' Johnson
  { match: '#FirstName [#Determiner #Noun] #LastName', group: 0, tag: '#NickName', reason: 'first-noun-last' },

  //Jani K. Smith
  { match: '#Singular #Acronym #LastName', tag: '#Person', reason: 'title-acro-noun', safe: true },

  //John Foo
  { match: '#FirstName (#Noun && #ProperNoun) #ProperNoun?', tag: 'Person', reason: 'firstname-titlecase' },
  //Joe K. Sombrero
  { match: '#FirstName #Acronym #Noun', tag: 'Person', reason: 'n-acro-noun', safe: true },
]
module.exports = list
