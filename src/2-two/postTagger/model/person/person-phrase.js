export default [
  // ==== FirstNames ====
  // is foo Smith
  { match: '#Copula [(#Noun|#PresentTense)] #LastName', hook: '#LastName', group: 0, tag: 'FirstName', reason: 'copula-noun-lastname' },
  // pope francis
  {
    match: '(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #ProperNoun', hook: '#ProperNoun',
    tag: 'Person',
    reason: 'lady-titlecase',
    safe: true,
  },

  // ==== Nickname ====
  // Dwayne 'the rock' Johnson
  { match: '#FirstName [#Determiner #Noun] #LastName', hook: '#LastName', group: 0, tag: 'Person', reason: 'first-noun-last' },
  // John b Smith
  {
    match: '#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun', hook: '#ProperNoun',
    tag: 'Person',
    reason: 'titlecase-acronym-titlecase',
    safe: true,
  },
  // J. Smith
  { match: '#Acronym #LastName', hook: '#LastName', tag: 'Person', reason: 'acronym-lastname', safe: true },
  // John jr
  { match: '#Person (jr|sr|md)', hook: '#Person', tag: 'Person', reason: 'person-honorific' },
  // Dr. J.
  { match: '#Honorific #Acronym', hook: '#Honorific', tag: 'Person', reason: 'Honorific-TitleCase' },
  // John Smith III
  { match: '#Person #Person the? #RomanNumeral', hook: '#RomanNumeral', tag: 'Person', reason: 'roman-numeral' },
  // John b
  { match: '#FirstName [/^[^aiurck]$/]', hook: '#FirstName', group: 0, tag: ['Acronym', 'Person'], reason: 'john-e' },
  // Ludwig van Beethoven
  { match: '#Noun van der? #Noun', hook: 'van', tag: 'Person', reason: 'van der noun', safe: true },
  // king of spain
  { match: '(king|queen|prince|saint|lady) of #Noun', hook: 'of', tag: 'Person', reason: 'king-of-noun', safe: true },
  // prince Paris
  { match: '(prince|lady) #Place', hook: '#Place', tag: 'Person', reason: 'lady-place' },
  // saint Foo
  { match: '(king|queen|prince|saint) #ProperNoun', hook: '#ProperNoun', tag: 'Person', notIf: '#Place', reason: 'saint-foo' },

  // al Smith
  { match: 'al (#Person|#ProperNoun)', hook: 'al', tag: 'Person', reason: 'al-borlen', safe: true },
  // ferdinand de almar
  { match: '#FirstName de #Noun', hook: 'de', tag: 'Person', reason: 'bill-de-noun' },
  // Osama bin Laden
  { match: '#FirstName (bin|al) #Noun', hook: '#FirstName', tag: 'Person', reason: 'bill-al-noun' },
  // John L. Foo
  { match: '#FirstName #Acronym #ProperNoun', hook: '#Acronym', tag: 'Person', reason: 'bill-acronym-title' },
  // Andrew Lloyd Webber
  { match: '#FirstName #FirstName #ProperNoun', hook: '#FirstName', tag: 'Person', reason: 'bill-firstname-title' },
  // Mr Foo
  { match: '#Honorific #FirstName? #ProperNoun', hook: '#Honorific', tag: 'Person', reason: 'dr-john-Title' },
  // peter the great
  { match: '#FirstName the #Adjective', hook: 'the', tag: 'Person', reason: 'name-the-great' },

  // John van Smith
  { match: '#ProperNoun (van|al|bin) #ProperNoun', hook: '#ProperNoun', tag: 'Person', reason: 'title-van-title', safe: true },
  // jose de Sucre
  { match: '#ProperNoun (de|du) la? #ProperNoun', hook: '#ProperNoun', tag: 'Person', notIf: '#Place', reason: 'title-de-title' },
  // Jani K. Smith
  { match: '#Singular #Acronym #LastName', hook: '#LastName', tag: '#FirstName #Person .', reason: 'title-acro-noun', safe: true },
  // Toronto John
  { match: '[#ProperNoun] #Person', hook: '#Person', group: 0, tag: 'Person', reason: 'proper-person', safe: true },
  // john keith jones
  {
    match: '#Person [#ProperNoun #ProperNoun]', hook: '#Person',
    group: 0,
    tag: 'Person',
    notIf: '#Possessive',
    reason: 'three-name-person',
    safe: true,
  },
  // John Foo
  {
    match: '#FirstName #Acronym? [#ProperNoun]', hook: '#FirstName',
    group: 0,
    tag: 'LastName',
    notIf: '#Possessive',
    reason: 'firstname-titlecase',
  },
  // john stewart
  { match: '#FirstName [#FirstName]', hook: '#FirstName', group: 0, tag: 'LastName', reason: 'firstname-firstname' },
  // Joe K. Sombrero
  { match: '#FirstName #Acronym #Noun', hook: '#Acronym', tag: 'Person', reason: 'n-acro-noun', safe: true },
  // Anthony de Marco
  { match: '#FirstName [(de|di|du|van|von)] #Person', hook: '#FirstName', group: 0, tag: 'LastName', reason: 'de-firstname' },

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person', reason: 'baker-sam-smith' },
  // sergeant major Harold
  {
    match:
      '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #ProperNoun', hook: '#ProperNoun',
    group: 0,
    tag: 'Honorific',
    reason: 'seargeant-john',
  },
  // ==== Honorics ====
  // general John
  {
    match: '[(private|general|major|rear|prime|field|count|miss)] #Honorific? #Person', hook: '#Person',
    group: 0,
    tag: ['Honorific', 'Person'],
    reason: 'ambg-honorifics',
  },
  // dr john foobar
  {
    match: '#Honorific #FirstName [#Singular]', hook: '#Honorific',
    group: 0,
    tag: 'LastName',
    notIf: '#Possessive',
    reason: 'dr-john-foo',
    safe: true,
  },
  // his excellency John
  {
    match: '[(his|her) (majesty|honour|worship|excellency|honorable)] #Person', hook: '#Person',
    group: 0,
    tag: 'Honorific',
    reason: 'his-excellency',
  },
  // Dr teacher
  { match: '#Honorific #Actor', hook: '#Honorific', tag: 'Honorific', reason: 'Lieutenant colonel' },
  // first lady, second admiral
  { match: '(first|second|third|1st|2nd|3rd) #Actor', hook: '#Actor', tag: 'Honorific', reason: 'first lady' },
  // Louis IV
  { match: '#Person #RomanNumeral', hook: '#RomanNumeral', tag: 'Person', reason: 'louis-IV' },
]
