module.exports = [
  //was walking
  { match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  //would walk
  { match: `[(#Modal|did) (#Adverb|not)+?] #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //would be walking
  { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },

  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  //fall over
  { match: '#PhrasalVerb [#PhrasalVerb]', group: 0, tag: 'Particle', reason: 'phrasal-particle' },
  //'the can'
  { match: '#Determiner [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },
  //is mark hughes
  { match: '#Copula [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'is-pres-noun' },
  //
  { match: '[#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'inf-copula' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'is-filled' },
  //is eager to go
  { match: '#Copula [#Adjective to] #Verb', group: 0, tag: 'Verb', reason: 'adj-to' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  //running-a-show
  { match: '#Gerund #Determiner [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-a-show' },
]
