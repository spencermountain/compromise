export default [
  // The station was closing. The shop is closing soon.
  { match: '#Copula #Adverb+? [closing] (#Adverb|soon)+?$', hook: 'closing', group: 0, tag: 'Gerund', reason: 'station-closing' },
  // that were growing
  { match: '(that|which) were [%Adj|Gerund%]', hook: 'were', group: 0, tag: 'Gerund', reason: 'that-were-growing' },
  // was dissapointing
  // { match: '#Copula [%Adj|Gerund%]$', group: 0, tag: 'Adjective', reason: 'was-disappointing$' },

  // repairing crumbling roads
  { match: '#Gerund [#Gerund] #Plural', hook: '#Gerund', group: 0, tag: 'Adjective', reason: 'hard-working-fam' },

  // { match: '(that|which) were [%Adj|Gerund%]', group: 0, tag: 'Gerund', reason: 'that-were-growing' },
]
