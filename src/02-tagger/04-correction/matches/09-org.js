module.exports = [
  //John & Joe's
  { match: '#Noun (&|n) #Noun', tag: 'Organization', reason: 'Noun-&-Noun' },
  { match: '#Organization of the? #ProperNoun', tag: 'Organization', reason: 'org-of-place', safe: true },
  { match: '#Organization #Country', tag: 'Organization', reason: 'org-country' },
  {
    match: '(world|global|international|national|#Demonym) #Organization',

    tag: 'Organization',
    reason: 'global-org',
  },
  //organization
  { match: '#ProperNoun #Organization', tag: 'Organization', reason: 'titlecase-org' },

  //FitBit Inc
  { match: '#ProperNoun (ltd|co|inc|dept|assn|bros)', tag: 'Organization', reason: 'org-abbrv' },

  // the OCED
  { match: 'the [#Acronym]', group: 0, tag: 'Organization', reason: 'the-acronym', safe: true },
  // schools
  { match: '#Noun+ (public|private) school', tag: 'School', reason: 'noun-public-school' },
]
