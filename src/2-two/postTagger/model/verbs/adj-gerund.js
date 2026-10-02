export default [
  // The station was [closing]. The shop is [closing] soon.
  { match: '#Copula #Adverb+? [closing] (#Adverb|soon)+?$', group: 0, tag: 'Gerund', reason: 'closing' },
  // that were [growing]
  { match: '(that|which) were [%Adj|Gerund%]', group: 0, tag: 'Gerund', reason: 'were-growing' },
]
