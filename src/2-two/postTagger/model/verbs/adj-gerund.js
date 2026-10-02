export default [
  // The station was [closing]. The shop is [closing] soon.
  { match: '#Copula #Adverb+? [closing] (#Adverb|soon)+?$', group: 0, tag: 'Gerund', reason: 'station-closing' },
  // that were [growing]
  { match: '(that|which) were [%Adj|Gerund%]', group: 0, tag: 'Gerund', reason: 'that-were-growing' },
]
