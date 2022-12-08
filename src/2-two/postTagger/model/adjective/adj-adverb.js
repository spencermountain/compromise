const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
export default [
  // kinda sparkly
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
  // dark green
  { match: `[${adverbAdj}] #Adjective`, group: 0, tag: 'Adverb', reason: 'dark-green' },
  // far too
  { match: `#Copula [far too] #Adjective`, group: 0, tag: 'Adverb', reason: 'far-too' },
  // was still in 
  { match: `#Copula [still] (in|#Gerund|#Adjective)`, group: 0, tag: 'Adverb', reason: 'was-still-walking' },
]
