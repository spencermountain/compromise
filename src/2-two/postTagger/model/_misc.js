// order matters
let matches = [
  // u r cool
  { match: 'u r', tag: '#Pronoun #Copula', reason: 'u r' },
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' },

  // ==== Conditions ====
  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  //swear-words as non-expression POS
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  // well..
  { match: '^(well|so|okay)', tag: 'Expression', reason: 'well-' },
  // some sort of
  { match: 'some sort of', tag: 'Adjective Noun Conjunction', reason: 'some-sort-of' },
  // of some sort
  { match: 'of some sort', tag: 'Conjunction Adjective Noun', reason: 'of-some-sort' },

  // such skill
  { match: '[such] (a|an|is)? #Noun', group: 0, tag: 'Determiner', reason: 'such-skill' },
  // that is
  // { match: '^[that] (is|was)', group: 0, tag: 'Noun', reason: 'that-is' },

  // sorry
  { match: '(say|says|said) [sorry]', group: 0, tag: 'Expression', reason: 'say-sorry' },

  // double-prepositions
  // rush out of
  {
    match: '#Verb [(out|for|through|about|around|in|down|up|on|off)] #Preposition',
    group: 0,
    ifNo: ['#Copula'],//were out
    tag: 'Particle',
    reason: 'rush-out',
  },
  // at about
  { match: '#Preposition [about]', group: 0, tag: 'Adjective', reason: 'at-about' },
  // dude we should
  { match: '^[(dude|man|girl)] #Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
  // are welcome
  // { match: '#Copula [#Expression]', group: 0, tag: 'Noun', reason: 'are-welcome' },
]
export default matches
