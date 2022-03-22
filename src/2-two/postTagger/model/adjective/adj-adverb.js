const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
export default [
  // kinda sparkly
  // { match: `#Adverb [#Adverb]$`, ifNo: ['very', 'really', 'so'], group: 0, tag: 'Adjective', reason: 'kinda-sparkly' },
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
  // dark green
  { match: `[${adverbAdj}] #Adjective`, group: 0, tag: 'Adverb', reason: 'dark-green' },
]
