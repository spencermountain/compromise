export default [
  // amusing his aunt
  // { match: '[#Adjective] #Possessive #Noun', group: 0, tag: 'Verb', reason: 'gerund-his-noun' },
  // loving you
  // { match: '[#Adjective] (us|you)', group: 0, tag: 'Gerund', reason: 'loving-you' },
  // quickly warm
  { match: '(slowly|quickly) [#Adjective]', hook: '#Adjective', group: 0, tag: 'Verb', reason: 'slowly-adj' },
  // does better
  { match: 'does (#Adverb|not)? [#Adjective]', hook: 'does', group: 0, tag: 'PresentTense', reason: 'does-mean' },
  // okay by me
  { match: '[(fine|okay|cool|ok)] by me', hook: 'me', group: 0, tag: 'Adjective', reason: 'okay-by-me' },
  // i mean
  { match: 'i (#Adverb|do)? not? [mean]', hook: 'mean', group: 0, tag: 'PresentTense', reason: 'i-mean' },
  // the ship will near the coast
  { match: 'will #Adjective', hook: 'will', tag: 'Auxiliary Infinitive', reason: 'will-adj' },
  // I frequent this restaurant
  { match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', hook: '#Pronoun', group: 0, tag: 'Verb', reason: 'he-adj-the' },
  // is open to go
  { match: '#Copula [%Adj|Present%] to #Verb', hook: 'to', group: 0, tag: 'Verb', reason: 'adj-to' },
  // is done well
  { match: '#Copula [#Adjective] (well|badly|quickly|slowly)', hook: '#Copula', group: 0, tag: 'Verb', reason: 'done-well' },
  // rude and insulting
  { match: '#Adjective and [#Gerund] !#Preposition?', hook: 'and', group: 0, tag: 'Adjective', reason: 'rude-and-x' },
  // was under paid
  { match: '#Copula #Adverb? (over|under) [#PastTense]', hook: '#PastTense', group: 0, tag: 'Adjective', reason: 'over-cooked' },
  // was tired and overworked
  { match: '#Copula #Adjective+ (and|or) [#PastTense]$', hook: '#PastTense', group: 0, tag: 'Adjective', reason: 'bland-and-overcooked' },
  // got accused of
  { match: 'got #Adverb? [#PastTense] of', hook: 'got', group: 0, tag: 'Adjective', reason: 'got-tired-of' },
  // felt cheated
  {
    match:
      '(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adverb|#Adjective)? [#PastTense]', hook: '#PastTense',
    group: 0,
    tag: 'Adjective',
    reason: 'felt-loved',
  },
  // felt cheated
  { match: '(seem|feel|seemed|felt) [#PastTense #Particle?]', hook: '#PastTense', group: 0, tag: 'Adjective', reason: 'seem-confused' },
  // a bit confused
  { match: 'a (bit|little|tad) [#PastTense #Particle?]', hook: 'a', group: 0, tag: 'Adjective', reason: 'a-bit-confused' },
  // do not be embarrassed
  { match: 'not be [%Adj|Past% #Particle?]', hook: 'not', group: 0, tag: 'Adjective', reason: 'do-not-be-confused' },
  // is just tired
  { match: '#Copula just [%Adj|Past% #Particle?]', hook: 'just', group: 0, tag: 'Adjective', reason: 'is-just-right' },
  // as fit as
  { match: 'as [#Infinitive] as', hook: 'as', group: 0, tag: 'Adjective', reason: 'as-pale-as' },
  // failed and oppressive
  { match: '[%Adj|Past%] and #Adjective', hook: 'and', group: 0, tag: 'Adjective', reason: 'faled-and-oppressive' },
  // or heightened emotion
  {
    match: 'or [#PastTense] #Noun', hook: 'or',
    group: 0,
    tag: 'Adjective',
    notIf: '(#Copula|#Pronoun)',
    reason: 'or-heightened-emotion',
  },
  // became embroiled
  { match: '(become|became|becoming|becomes) [#Verb]', hook: '#Verb', group: 0, tag: 'Adjective', reason: 'become-verb' },
  // their declared intentions
  { match: '#Possessive [#PastTense] #Noun', hook: '#Possessive', group: 0, tag: 'Adjective', reason: 'declared-intentions' },
  // is he cool
  { match: '#Copula #Pronoun [%Adj|Present%]', hook: '#Copula', group: 0, tag: 'Adjective', reason: 'is-he-cool' },
  // is crowded with
  {
    match: '#Copula [%Adj|Past%] with', hook: 'with',
    group: 0,
    tag: 'Adjective',
    notIf: '(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)',
    reason: 'is-crowded-with',
  },
  // is empty
  { match: '#Copula #Adverb? [%Adj|Present%]$', hook: '#Copula', group: 0, tag: 'Adjective', reason: 'was-empty$' },
  // she is being cool
  { match: 'being #Adverb? [%Adj|Present%]$', hook: 'being', group: 0, tag: 'Adjective', reason: 'being-adjective' },
  // does the store open
  {
    match: '(does|will) #Determiner #Noun [%Adj|Present%]$',
    hook: '%Adj|Present%',
    group: 0,
    tag: 'Infinitive',
    reason: 'does-the-store-open',
  },
]
