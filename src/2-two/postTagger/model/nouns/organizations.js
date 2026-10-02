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

const companySuffix = '(inc|ltd|llc|co|corp|corporation|company|limited)'

export default [
  // university of Toronto
  { match: 'university of #Place', tag: 'Organization', reason: 'university-place' },
  // Name pairs can be business names without a known organization suffix.
  { match: '#ProperNoun & #ProperNoun', tag: 'ProperNoun', reason: 'name-and-name' },
  // John & Mary Ltd
  { match: `#Person & #Person ${companySuffix}`, tag: 'Organization', reason: 'person-and-person' },
  // Smith & Rogers
  { match: '#LastName & #LastName', tag: 'Organization', reason: 'surname-and-surname' },
  // Microsoft of Canada
  { match: '#Organization of the? #ProperNoun', tag: 'Organization', reason: 'org-of-place', safe: true },
  // walmart USA
  { match: '#Organization #Country', tag: 'Organization', reason: 'org-country' },
  // Toronto Microsoft
  { match: '#ProperNoun #Organization', tag: 'Organization', notIf: '#FirstName', reason: 'titlecase-org' },
  // FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', tag: 'Organization', reason: 'org-abbrv' },
  // the [XYZ corporation]
  { match: `the [#Acronym ${companySuffix}]`, group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },
  // [government of india]
  { match: '[government of the? #Place+]', group: 0, tag: 'Organization', reason: 'government-of-x' },
  // school board
  { match: '(health|school|commerce) board', tag: 'Organization', reason: 'school-board' },
  // special committee
  {
    match: '(nominating|special|conference|executive|steering|central|congressional) committee',
    tag: 'Organization',
    reason: 'special-committee',
  },
  // global Microsoft
  {
    match: '(world|global|international|national|#Demonym) #Organization',
    tag: 'Organization',
    reason: 'global-org',
  },
  // Toronto public school
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },
  // Toronto Yankees
  { match: '#Place+ #SportsTeam', tag: 'SportsTeam', reason: 'place-sportsteam' },
  // 'manchester united'
  {
    match: '(dc|atlanta|minnesota|manchester|newcastle|sheffield) united',
    tag: 'SportsTeam',
    reason: 'united-sportsteam',
  },
  // 'toronto fc'
  { match: '#Place+ fc', tag: 'SportsTeam', reason: 'fc-sportsteam' },

  // the new orleans basketball team
  {
    match: '#Place+ #Noun{0,2} (club|society|group|team|committee|commission|association|guild|crew)',
    tag: 'Organization',
    reason: 'place-noun-society',
  },
]
