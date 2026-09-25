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
  // university of Toronto
  { match: 'university of #Place', hook: 'university', tag: 'Organization', reason: 'university-of-Foo' },
  // John & Joe's
  { match: '#Noun (&|n) (#Noun && @hasTitleCase)', hook: '#Noun', tag: 'Organization', reason: 'Noun-&-Noun' },
  // Microsoft of Canada
  { match: '#Organization of the? #ProperNoun', hook: 'of', tag: 'Organization', reason: 'org-of-place', safe: true },
  // walmart USA
  { match: '#Organization #Country', hook: '#Country', tag: 'Organization', reason: 'org-country' },
  // Toronto Microsoft
  { match: '#ProperNoun #Organization', hook: '#Organization', tag: 'Organization', notIf: '#FirstName', reason: 'titlecase-org' },
  // FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', hook: '#ProperNoun', tag: 'Organization', reason: 'org-abbrv' },
  // the OCED
  { match: 'the [#Acronym]', hook: 'the', group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },
  // government of india
  { match: 'government of the? [#Place+]', hook: 'government', tag: 'Organization', reason: 'government-of-x' },
  // school board
  { match: '(health|school|commerce) board', hook: 'board', tag: 'Organization', reason: 'school-board' },
  // special committee
  {
    match: '(nominating|special|conference|executive|steering|central|congressional) committee', hook: 'committee',
    tag: 'Organization',
    reason: 'special-comittee',
  },
  // global Microsoft
  {
    match: '(world|global|international|national|#Demonym) #Organization', hook: '#Organization',
    tag: 'Organization',
    reason: 'global-org',
  },
  // Toronto public school
  { match: '#Noun+ (public|private) school', hook: 'school', tag: 'School', reason: 'noun-public-school' },
  // Toronto Yankees
  { match: '#Place+ #SportsTeam', hook: '#SportsTeam', tag: 'SportsTeam', reason: 'place-sportsteam' },
  // 'manchester united'
  {
    match: '(dc|atlanta|minnesota|manchester|newcastle|sheffield) united', hook: 'united',
    tag: 'SportsTeam',
    reason: 'united-sportsteam',
  },
  // 'toronto fc'
  { match: '#Place+ fc', hook: 'fc', tag: 'SportsTeam', reason: 'fc-sportsteam' },

  // the new orleans basketball team
  {
    match: '#Place+ #Noun{0,2} (club|society|group|team|committee|commission|association|guild|crew)', hook: '#Place',
    tag: 'Organization',
    reason: 'place-noun-society',
  },
]
