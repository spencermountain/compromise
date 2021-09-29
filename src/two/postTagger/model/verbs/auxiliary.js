// these are some of our heaviest-used matches
export default [
  // ==== Auxiliary ====
  //was walking
  { match: `[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //would walk
  { match: `#Adverb+? [(#Modal|did)+] (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  //would have had
  {
    match: `#Modal (#Adverb|not)+? [have] (#Adverb|not)+? [had] (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had)] (#Adverb|not)+? #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  // will walk
  {
    match: '[(do|does|did|will|have|had|has|got)] (not|#Adverb)+? #Verb',
    group: 0,
    tag: 'Auxiliary',
    reason: 'have-had',
  },
  // about to go
  { match: '[about to] #Adverb? #Verb', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' },
  //would be walking
  { match: `#Modal (#Adverb|not)+? [be] (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  {
    match: `[(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },
  // was being driven
  { match: '[(be|being|been)] #Participle', group: 0, tag: 'Auxiliary', reason: 'being-foo' },
  // been walking
  { match: '[(be|been)] (#Adverb|not)+? #Gerund', group: 0, tag: 'Auxiliary', reason: 'been-walking' },
  // used to walk
  { match: '[used to] #PresentTense', group: 0, tag: 'Auxiliary', reason: 'used-to-walk' },
]
