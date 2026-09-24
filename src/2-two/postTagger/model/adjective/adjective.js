export default [
  // off-white is a colour, not the particle in 'is off'
  { match: '(off && #Hyphenated) white', hook: 'off', tag: 'Adjective', reason: 'off-white' },
  // Restore the copula when the colour is written without a hyphen.
  { match: '[(is|are|am|was|were)] off white$', hook: 'off', group: 0, unTag: 'PhrasalVerb', tag: 'Copula', reason: 'off-white-copula' },
  { match: '(is|are|am|was|were) [off white]$', hook: 'off', group: 0, tag: 'Adjective', reason: 'off-white-predicate' },
  // all fell apart
  { match: '[(all|both)] #Determiner #Noun', hook: '#Determiner', group: 0, tag: 'Noun', reason: 'all-noun' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', hook: '#Copula', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', hook: 'is', group: 0, tag: 'Adjective', reason: 'is-filled' },
  // smoked poutine is
  { match: '[#PastTense] #Singular is', hook: 'is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // baked onions are
  { match: '[#PastTense] #Plural are', hook: 'are', group: 0, tag: 'Adjective', reason: 'baked-onions' },
  // well made
  { match: 'well [#PastTense]', hook: 'well', group: 0, tag: 'Adjective', reason: 'well-made' },
  // is f*ed up
  { match: '#Copula [fucked up?]', hook: 'fucked', group: 0, tag: 'Adjective', reason: 'swears-adjective' },
  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', hook: '#PastTense', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  // jury is out - preposition ➔ adjective
  { match: '#Copula #Adjective? [(out|in|through)]$', hook: '#Copula', group: 0, tag: 'Adjective', reason: 'still-out' },
  // shut the door
  { match: '^[#Adjective] (the|your) #Noun', hook: '#Adjective', group: 0, notIf: '(all|even)', tag: 'Infinitive', reason: 'shut-the' },
  // the said card
  { match: 'the [said] #Noun', hook: 'said', group: 0, tag: 'Adjective', reason: 'the-said-card' },
  // faith-based, much-appreciated, soft-boiled
  { match: '(#Adjective && #Hyphenated) [(#Hyphenated && #PastTense)]$', hook: '#Hyphenated', group: 0, tag: 'Adjective', reason: 'red-shouldered' },
  { match: '[#Hyphenated (#Hyphenated && #PastTense)] (#Noun|#Conjunction)', hook: '#Hyphenated', group: 0, tag: 'Adjective', notIf: '#Adverb', reason: 'faith-based' },
  //self-driving
  { match: '[#Hyphenated (#Hyphenated && #Gerund)] (#Noun|#Conjunction)', hook: '#Hyphenated', group: 0, tag: 'Adjective', notIf: '#Adverb', reason: 'self-driving' },
  //dammed-up
  { match: '[#PastTense (#Hyphenated && #PhrasalVerb)] (#Noun|#Conjunction)', hook: '#PhrasalVerb', group: 0, tag: 'Adjective', reason: 'dammed-up' },
  //two-fold
  { match: '(#Hyphenated && #Value) fold', hook: 'fold', tag: 'Adjective', reason: 'two-fold' },
  //must-win
  { match: 'must (#Hyphenated && #Infinitive)', hook: 'must', tag: 'Adjective', reason: 'must-win' },
  // vacuum-sealed
  { match: `(#Hyphenated && #Infinitive) #Hyphenated`, hook: '#Hyphenated', tag: 'Adjective', notIf: '#PhrasalVerb', reason: 'vacuum-sealed' },

  { match: 'too much', hook: 'much', tag: 'Adverb Adjective', reason: 'bit-4' },
  { match: 'a bit much', hook: 'bit', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },

  // adjective-prefixes - 'un skilled'
  { match: '[(un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex)] #Adjective', hook: '#Adjective', group: 0, tag: ['Adjective', 'Prefix'], reason: 'un-skilled' },

]
