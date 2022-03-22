// import orgWords from './_orgWords.js'
// let orgMap = `(${orgWords.join('|')})`

/*
const multi = [
  'building society',
  'central bank',
  'department store',
  'institute of technology',
  'liberation army',
  'people party',
  'social club',
  'state police',
  'state university',
]
*/

export default [
  // Foo University
  // { match: `#Noun ${orgMap}`, tag: 'Organization', safe: true, reason: 'foo-university' },
  // // University of Toronto
  // { match: `${orgMap} of #Place`, tag: 'Organization', safe: true, reason: 'university-of-foo' },

  // // foo regional health authority
  // { match: `${orgMap} (health|local|regional)+ authority`, tag: 'Organization', reason: 'regional-health' },
  // // foo stock exchange
  // { match: `${orgMap} (stock|mergantile)+ exchange`, tag: 'Organization', reason: 'stock-exchange' },
  // // foo news service
  // { match: `${orgMap} (daily|evening|local)+ news service?`, tag: 'Organization', reason: 'foo-news' },

  //John & Joe's
  { match: '#Noun (&|n) #Noun', tag: 'Organization', reason: 'Noun-&-Noun' },
  // teachers union of Ontario
  { match: '#Organization of the? #ProperNoun', tag: 'Organization', reason: 'org-of-place', safe: true },
  //walmart USA
  { match: '#Organization #Country', tag: 'Organization', reason: 'org-country' },
  //organization
  { match: '#ProperNoun #Organization', tag: 'Organization', reason: 'titlecase-org' },
  //FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', tag: 'Organization', reason: 'org-abbrv' },
  // the OCED
  { match: 'the [#Acronym]', group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },
  // global trade union
  {
    match: '(world|global|international|national|#Demonym) #Organization',
    tag: 'Organization',
    reason: 'global-org',
  },
  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },
]
