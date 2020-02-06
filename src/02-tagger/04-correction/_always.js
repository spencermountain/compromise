let list = [
  //'foo-up'
  ['(#Verb && @hasHyphen) (up|off|over|out)', null, 'PhrasalVerb', 'foo-up'],
  //foot/feet
  // ['(foot|feet)', null, 'Noun', 'foot-noun'],

  ['^(well|so|okay)', null, 'Expression', 'well-'],
  // damn them
  ['[(shit|damn|fuck)] (#Determiner|#Possessive|them)', 0, 'Verb', 'swears-verb'],

  //FitBit Inc
  ['@titleCase (ltd|co|inc|dept|assn|bros)', null, 'Organization', 'org-abbrv'],
  ['@titleCase (van|al|bin) @titleCase', null, 'Person', 'title-van-title', true],
  //jose de Sucre
  ['@titleCase (de|du) la? @titleCase', null, 'Person', 'title-de-title', true],
  //Foo District
  [
    '@titleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    null,
    'Region',
    'foo-district',
  ],

  //mr Putin
  ['(mr|mrs|ms|dr) (@titleCase|#Possessive)+', null, 'Person', 'mr-putin'], //mr X
  //the swim
  ['(the|those|these) #Adjective? [(#Infinitive|#PresentTense|#PastTense)]', 0, 'Noun', 'determiner2'],
  // FBI's
  ['(#Acronym && #Possessive)', null, 'Organization', 'possessive-acronym'],
  //Morgan Shlkjsfne
  ['(#Person && @titleCase) (#Noun && @titleCase)', null, 'Person', 'person-titlecase'],
]
module.exports = list
