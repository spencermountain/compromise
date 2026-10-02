export default [
  // off-white
  { match: '(off && #Hyphenated) white', tag: 'Adjective', reason: 'off-white' },
  // Restore the copula when the colour is written without a hyphen.
  // [is] off white
  { match: '[(is|are|am|was|were)] off white$', group: 0, unTag: 'PhrasalVerb', tag: 'Copula', reason: 'off-white-copula' },
  // is [off white]
  { match: '(is|are|am|was|were) [off white]$', group: 0, tag: 'Adjective', reason: 'off-white-predicate' },
  // [all] the dogs
  { match: '[(all|both)] #Determiner #Noun', group: 0, tag: 'Noun', reason: 'all-noun' },
  // is [alone]
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  // the door is [closed]
  { match: '#Singular is #Adverb? [%Adj|Past%]$', group: 0, tag: 'Adjective', reason: 'is-filled' },
  // [forgotten] art is rediscovered
  { match: '[#PastTense] #Singular is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // [forgotten] stories are lost
  { match: '[#PastTense] #Plural are', group: 0, tag: 'Adjective', reason: 'baked-onions' },
  // well [made]
  { match: 'well [#PastTense]', group: 0, tag: 'Adjective', reason: 'well-made' },
  // is [fucked up]
  { match: '#Copula [fucked up?]', group: 0, tag: 'Adjective', reason: 'swears-adjective' },
  // the door seems [opened]
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  // jury is out - preposition ➔ adjective
  // jury is [out]
  { match: '#Copula #Adjective? [(out|in|through)]$', group: 0, tag: 'Adjective', reason: 'still-out' },
  // [quiet] the room
  { match: '^[(#Adjective && !near && !inside && !outside && !opposite)] (the|your) #Noun', group: 0, notIf: '(all|even)', tag: 'Infinitive', reason: 'shut-the' },
  // the [said] dog
  { match: 'the [said] #Noun', group: 0, tag: 'Adjective', reason: 'the-said-card' },
  // blue-[tinted]
  { match: '(#Adjective && #Hyphenated) [(#Hyphenated && #PastTense)]$', group: 0, tag: 'Adjective', reason: 'red-shouldered' },
  // [blue-tinted] glasses
  { match: '[#Hyphenated (#Hyphenated && #PastTense)] (#Noun|#Conjunction)', group: 0, tag: 'Adjective', notIf: '#Adverb', reason: 'faith-based' },
  // [non-breaking] spaces
  { match: '[#Hyphenated (#Hyphenated && #Gerund)] (#Noun|#Conjunction)', group: 0, tag: 'Adjective', notIf: '#Adverb', reason: 'self-driving' },
  // [dammed-up] river
  { match: '[#PastTense (#Hyphenated && #PhrasalVerb)] (#Noun|#Conjunction)', group: 0, tag: 'Adjective', reason: 'dammed-up' },
  // two-fold
  { match: '(#Hyphenated && #Value) fold', tag: 'Adjective', reason: 'two-fold' },
  // must-win
  { match: 'must (#Hyphenated && #Infinitive)', tag: 'Adjective', reason: 'must-win' },
  // vacuum-sealed
  { match: `(#Hyphenated && #Infinitive) #Hyphenated`, tag: 'Adjective', notIf: '#PhrasalVerb', reason: 'vacuum-sealed' },
  // too much
  { match: 'too much', tag: 'Adverb Adjective', reason: 'too-much' },
  // a bit much
  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'a-bit-much' },
  // [un] skilled
  { match: '[(un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex)] #Adjective', group: 0, tag: ['Adjective', 'Prefix'], reason: 'un-skilled' },

]
