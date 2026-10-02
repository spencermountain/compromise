export default [
  // ==== FirstNames ====
  // is [foo] Smith
  { match: '#Copula [(#Noun|#PresentTense)] #LastName', group: 0, tag: 'FirstName', notIf: '#Gerund', reason: 'cop-noun-last' },
  // pope francis
  {
    match: '(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #ProperNoun',
    tag: 'Person',
    reason: 'lady-title',
    safe: true,
  },

  // ==== Nickname ====
  // Dwayne '[the rock]' Johnson
  { match: '#FirstName [#Determiner #Noun] #LastName', group: 0, tag: 'Person', reason: 'first-noun-last' },
  // John b Smith
  {
    match: '#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun',
    tag: 'Person',
    reason: 'name-init-name',
    safe: true,
  },
  // J. Smith
  { match: '#Acronym #LastName', tag: 'Person', reason: 'acro-last', safe: true },
  // John jr
  { match: '#Person (jr|sr|md)', tag: 'Person', reason: 'person-hon' },
  // Dr. J.
  { match: '#Honorific #Acronym', tag: 'Person', reason: 'hon-init' },
  // John Smith III
  { match: '#Person #Person the? #RomanNumeral', tag: 'Person', reason: 'roman-numeral' },
  // John [b]
  { match: '#FirstName [/^[bdefghjlmnopqstvwxyz]$/]', group: 0, tag: ['Acronym', 'Person'], reason: 'john-e' },
  // Ludwig van Beethoven
  { match: '#Noun van der? #Noun', tag: 'Person', reason: 'van-der-noun', safe: true },
  // king of spain
  { match: '(king|queen|prince|saint|lady) of #Noun', tag: 'Person', reason: 'king-of-noun', safe: true },
  // prince Paris
  { match: '(prince|lady) #Place', tag: 'Person', reason: 'lady-place' },
  // saint Foo
  { match: '(king|queen|prince|saint) #ProperNoun', tag: 'Person', notIf: '#Place', reason: 'saint-foo' },

  // al Smith
  { match: 'al (#Person|#ProperNoun)', tag: 'Person', reason: 'al-borlen', safe: true },
  // ferdinand de almar
  { match: '#FirstName de #Noun', tag: 'Person', reason: 'bill-de-noun' },
  // Osama bin Laden
  { match: '#FirstName (bin|al) #Noun', tag: 'Person', reason: 'bill-al-noun' },
  // John L. Foo
  { match: '#FirstName #Acronym #ProperNoun', tag: 'Person', reason: 'bill-acro-title' },
  // Andrew Lloyd Webber
  { match: '#FirstName #FirstName #ProperNoun', tag: 'Person', reason: 'bill-first-title' },
  // Mr Foo
  { match: '#Honorific #FirstName? #ProperNoun', tag: 'Person', reason: 'dr-john-title' },
  // peter the great
  { match: '#FirstName the #Adjective', tag: 'Person', reason: 'name-the-great' },

  // John van Smith
  { match: '#ProperNoun (van|al|bin) #ProperNoun', tag: 'Person', reason: 'title-van-title', safe: true },
  // jose de Sucre
  { match: '#ProperNoun (de|du) la? #ProperNoun', tag: 'Person', notIf: '#Place', reason: 'title-de-title' },
  // Jani K. Smith
  { match: '#Singular #Acronym #LastName', tag: '#FirstName #Person .', reason: 'title-acro-noun', safe: true },
  // [Toronto] John
  { match: '[#ProperNoun] #Person', group: 0, tag: 'Person', reason: 'proper-person', safe: true },
  // john [keith jones]
  {
    match: '#Person [#ProperNoun #ProperNoun]',
    group: 0,
    tag: 'Person',
    notIf: '#Possessive',
    reason: 'three-names',
    safe: true,
  },
  // John [Foo]
  {
    match: '#FirstName #Acronym? [#ProperNoun]',
    group: 0,
    tag: 'LastName',
    notIf: '#Possessive',
    reason: 'first-title',
  },
  // Joe K. Sombrero
  { match: '#FirstName #Acronym #Noun', tag: 'Person', reason: 'n-acro-noun', safe: true },
  // Anthony [de] Marco
  { match: '#FirstName [(de|di|du|van|von)] #Person', group: 0, tag: 'LastName', reason: 'de-first' },

  // baker jenna smith
  // { match: '[#Actor+] #Person', group: 0, tag: 'Person', reason: 'baker-sam' },
  // [sergeant] major Harold
  {
    match:
      '[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #ProperNoun',
    group: 0,
    tag: 'Honorific',
    reason: 'sergeant-john',
  },
  // ==== Honorics ====
  // [general] John
  {
    match: '[(private|general|major|rear|prime|field|count)] #Honorific? #Person',
    group: 0,
    tag: ['Honorific', 'Person'],
    reason: 'ambg-hon',
  },
  // [Miss] John
  { match: '[(miss && @isTitleCase)] #Person', group: 0, tag: ['Honorific', 'Person'], reason: 'miss-hon' },
  // dr john [foobar]
  {
    match: '#Honorific #FirstName [#Singular]',
    group: 0,
    tag: 'LastName',
    notIf: '#Possessive',
    reason: 'dr-john-foo',
    safe: true,
  },
  // [his excellency] John
  {
    match: '[(his|her) (majesty|honour|worship|excellency|honorable)] #Person',
    group: 0,
    tag: 'Honorific',
    reason: 'his-excellency',
  },
  // Dr teacher
  { match: '#Honorific #Actor', tag: 'Honorific', reason: 'lt-colonel' },
  // [first lady] michelle obama
  { match: '[first lady] #Person', group: 0, tag: 'Honorific', reason: 'first-lady' },
  // first lady, second admiral
  { match: '(first|second|third|1st|2nd|3rd) lieutenant', tag: 'Honorific', reason: 'ord-lt' },
  // Louis IV
  { match: '#Person #RomanNumeral', tag: 'Person', reason: 'louis-iv' },
]
