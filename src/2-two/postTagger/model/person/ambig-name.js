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
  // [chuck] will ...
  {
    match: `[%Person|Verb%] (will|had|has|said|says|told|did|learned|wants|wanted)`,
    group: 0,
    tag: 'Person',
    reason: 'person-said',
  },

  // ===person-place===
  // [sydney] harbour
  {
    match: `[%Person|Place%] (harbor|harbour|pier|town|city|place|dump|landfill)`,
    group: 0,
    tag: 'Place',
    reason: 'sydney-harbour',
  },
  // east [sydney]
  { match: `(west|east|north|south) [%Person|Place%]`, group: 0, tag: 'Place', reason: 'east-sydney' },

  // ===person-verb===
  // really [wade]
  { match: `#Adverb [(%Person|Verb% && !@isTitleCase)]`, group: 0, tag: 'Verb', reason: 'really-mark' },
  // [drew] closer
  { match: `[%Person|Verb%] (#Adverb|#Comparative)`, group: 0, tag: 'Verb', reason: 'drew-closer' },
  // wade smith
  { match: `(%Person|Verb% && #Person) #Person`, tag: 'Person', reason: 'rob-smith' },
  // Wade G. Slapgoop
  { match: `%Person|Verb% #Acronym #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },
  // [will] go
  { match: '[will] #Infinitive', group: 0, tag: 'Modal', reason: 'will-verb' },
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
  // bought a [warhol]
  { match: '(a|an) [#Person]$', group: 0, unTag: 'Person', reason: 'a-warhol' },
]
