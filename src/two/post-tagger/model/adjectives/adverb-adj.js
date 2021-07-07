export default [
  // kinda sparkly
  { match: `#Adverb [#Adverb]$`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly' },
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
]
