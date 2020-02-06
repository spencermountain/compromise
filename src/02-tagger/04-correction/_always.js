// const people = '(january|april|may|june|summer|autumn|jan|sep)' //ambiguous month-names
// const maybeDate = '(april|june|may|jan|august|eve)'
// const maybeNoun =
// '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
// const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
// const maybeAdj = '(misty|rusty|dusty|rich|randy)'
let list = [
  //'foo-up'
  ['(#Verb && @hasHyphen) (up|off|over|out)', null, 'PhrasalVerb', 'foo-up'],

  // //with april
  // [`(that|with|for) [${people}]`, 0, 'Person', 'that-month'],
  // //this april
  // [`(next|this|last) [${people}]`, 0, 'Month', 'next-may'], //maybe not 'this'
  //foot/feet
  ['(foot|feet)', null, 'Noun', 'foot-noun'], // blood, sweat, and tears
  ['^(well|so|okay)', null, 'Expression', 'well-'],
  ['[(shit|damn|fuck)] (#Determiner|#Possessive|them)', 0, 'Verb', 'swears-verb'], //so funny
  //FitBit Inc
  ['@titleCase (ltd|co|inc|dept|assn|bros)', null, 'Organization', 'org-abbrv'],
  //Foo District
  [
    '@titleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    null,
    'Region',
    'foo-district',
  ],
  //mr Putin
  ['(mr|mrs|ms|dr) (@titleCase|#Possessive)+', null, 'Person', 'mr-putin'], //mr X
  ['@titleCase (van|al|bin) @titleCase', null, 'Person', 'title-van-title', true], //jose de Sucre
  ['@titleCase (de|du) la? @titleCase', null, 'Person', 'title-de-title', true],
  // jean Foobar
  // [maybeNoun + ' #Acronym? @titleCase', null, 'Person', 'ray-a-smith', true], // rob Foobar
  // [maybeVerb + ' #Acronym? @titleCase', null, 'Person', 'rob-a-smith'], // rusty Foobar
  // // [maybeAdj + ' #Acronym? @titleCase', null, 'Person', 'rusty-smith'], // june Foobar
  // [maybeDate + ' #Acronym? (@titleCase && !#Month)', null, 'Person', 'june-smith-jr'], //Frank jr
  // ['(#Modal|#Adverb) [' + maybeVerb + ']', 0, 'Verb', 'would-mark'],
  //the swim
  ['(the|those|these) #Adjective? [(#Infinitive|#PresentTense|#PastTense)]', 0, 'Noun', 'determiner2'],
  // FBI's
  ['(#Acronym && #Possessive)', null, 'Organization', 'possessive-acronym'],
  //Morgan Shlkjsfne
  ['(#Person && @titleCase) (#Noun && @titleCase)', null, 'Person', 'person-titlecase'],
]
module.exports = list
