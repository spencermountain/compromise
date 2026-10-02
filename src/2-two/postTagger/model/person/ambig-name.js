// const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'

export default [
  // ebenezer scrooge
  {
    match: '#FirstName #Noun$',
    tag: '. #LastName',
    notIf: '(#Possessive|#Organization|#Place|#Pronoun|@hasTitleCase)',
    reason: 'first-noun',
  },

  // June Smith
  { match: '%Person|Date% #Acronym? #ProperNoun', tag: 'Person', reason: 'jan-thierson' },
  // ===person-noun===
  // Cliff Clavin
  { match: '%Person|Noun% #Acronym? #ProperNoun', tag: 'Person', reason: 'switch-person', safe: true },
  // Rose Microsoft
  { match: '%Person|Noun% #Organization', tag: 'Organization', reason: 'olive-garden' },
  // ===person-verb===
  // Ollie Faroo
  { match: '(%Person|Verb% && #Person) #Acronym? #ProperNoun', tag: 'Person', reason: 'verb-proper', ifNo: '#Actor' },

  // ===person-verb===
  // really [wade]
  { match: `#Adverb [(%Person|Verb% && !@isTitleCase)]`, group: 0, tag: 'Verb', reason: 'really-mark' },
  // [drew] closer
  { match: `[%Person|Verb%] (#Adverb|#Comparative)`, group: 0, tag: 'Verb', reason: 'drew-closer' },
  // wade smith
  { match: `(%Person|Verb% && #Person) #Person`, tag: 'Person', reason: 'rob-smith' },
  // Wade G. Slapgoop
  { match: `%Person|Verb% #Acronym #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },
  // Will Smith
  { match: '(will && @isTitleCase) #ProperNoun', tag: 'Person', reason: 'will-name' },
  // jack [layton] won
  {
    match: '(#FirstName && !#Possessive) [#Singular] #Verb',
    group: 0,
    safe: true,
    tag: 'LastName',
    reason: 'jack-layton',
  },
  // [captain] John walks
  { match: '^[#Singular] #Person #Verb', group: 0, safe: true, tag: 'Person', reason: 'sherwood' },
]
