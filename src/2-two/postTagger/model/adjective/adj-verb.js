export default [
  // Resume fragments: developed [scalable React] architecture.
  {
    match: '^[developed] (#Adjective|#ProperNoun)+? (backend|frontend|software|architecture|applications|apps|systems)',
    group: 0, tag: 'PastTense',
    notIf: '(#PresentTense|#Copula|#Modal)', reason: 'developed',
  },
  // quickly [warm]
  { match: '(slowly|quickly) [%Adj|Present%]', group: 0, tag: 'Verb', reason: 'slowly-adj' },
  // does [mean]
  { match: 'does (#Adverb|not)? [%Adj|Present%]', group: 0, tag: 'Infinitive', reason: 'does-mean' },
  // [okay] by me
  { match: '[(fine|okay|cool|ok)] by me', group: 0, tag: 'Adjective', reason: 'okay-by-me' },
  // i [mean]
  { match: 'i (#Adverb|do)? not? [mean]', group: 0, tag: 'PresentTense', reason: 'i-mean' },
  // the ship will near the coast
  { match: 'will #Adjective', tag: 'Auxiliary Infinitive', reason: 'will-adj' },
  // I [frequent] this restaurant
  { match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', group: 0, tag: 'Verb', reason: 'he-adj-the' },
  // is [done] well
  { match: '#Copula [#Adjective] (well|badly|quickly|slowly)', group: 0, tag: 'Verb', reason: 'done-well' },
  // rude and [insulting]
  { match: '#Adjective and [(%Adj|Gerund% && #Gerund)] !#Preposition?', group: 0, tag: 'Adjective', reason: 'rude-and-x' },
  // was under [paid]
  { match: '#Copula #Adverb? (over|under) [#PastTense]', group: 0, tag: 'Adjective', reason: 'over-cooked' },
  // got [tired] of
  { match: 'got #Adverb? [%Adj|Past%] of', group: 0, tag: 'Adjective', reason: 'got-tired-of' },
  // felt [cheated]
  {
    match:
      '(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adverb|#Adjective)? [#PastTense]',
    group: 0,
    tag: 'Adjective',
    reason: 'felt-loved',
  },
  // felt [cheated]
  { match: '(seem|feel|seemed|felt) [#PastTense #Particle?]', group: 0, tag: 'Adjective', reason: 'seem-confused' },
  // a bit [confused]
  { match: 'a (bit|little|tad) [#PastTense #Particle?]', group: 0, tag: 'Adjective', reason: 'a-bit-confused' },
  // do not be [embarrassed]
  { match: 'not be [%Adj|Past% #Particle?]', group: 0, tag: 'Adjective', reason: 'not-be-adj' },
  // is just [tired]
  { match: '#Copula just [%Adj|Past% #Particle?]', group: 0, tag: 'Adjective', reason: 'is-just-right' },
  // as [fit] as
  { match: 'as [#Infinitive] as', group: 0, tag: 'Adjective', reason: 'as-pale-as' },
  // [failed] and oppressive
  { match: '[%Adj|Past%] and #Adjective', group: 0, tag: 'Adjective', reason: 'failed-and' },
  // the fear or [heightened] emotion
  {
    match: '(#Determiner|#Preposition) #Adjective? #Noun or [#PastTense] #Noun',
    group: 0,
    tag: 'Adjective',
    notIf: '(#Copula|#Pronoun)',
    reason: 'or-heightened',
  },
  // tired and overworked describes a state after a copula
  { match: '#Copula #Adverb? #Adjective and [(overworked|overwhelmed|overpaid|underpaid|overqualified|underqualified|understaffed)]$', group: 0, tag: 'Adjective', reason: 'coord-state' },
  // became [embroiled]
  { match: '(become|became|becoming|becomes) [#Verb]', group: 0, tag: 'Adjective', reason: 'become-verb' },
  // their [declared] intentions
   { match: '#Possessive [#PastTense] #Noun', group: 0, notIf: '#Copula', tag: 'Adjective', reason: 'declared' },
  // is he [cool]
  { match: '#Copula #Pronoun [%Adj|Present%]', group: 0, tag: 'Adjective', reason: 'is-he-cool' },
  // is [crowded] with  
  {
    match: '#Copula [%Adj|Past%] with',
    group: 0,
    tag: 'Adjective',
    notIf: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)',
    reason: 'crowded-with',
  },
  // is [empty]
  { match: '#Copula #Adverb? [%Adj|Present%]$', group: 0, tag: 'Adjective', reason: 'cop-adj' },
  // she is being [cool]
  { match: 'being #Adverb? [%Adj|Present%]', group: 0, tag: 'Adjective', reason: 'being-adj' },
  // does the store [open]
  {
    match: '(does|will) #Determiner #Noun [%Adj|Present%]$',
    group: 0,
    tag: 'Infinitive',
    reason: 'q-adj-verb',
  },
]
