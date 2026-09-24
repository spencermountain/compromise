const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'

export default [
  // kinda sparkly
  { match: `#Adverb [#Adverb] (and|or|then)`, hook: '#Adverb', group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
  // dark green
  { match: `[${adverbAdj}] #Adjective`, hook: '#Adjective', group: 0, tag: 'Adverb', reason: 'dark-green' },
  // far too
  { match: `#Copula [far too] #Adjective`, hook: 'far', group: 0, tag: 'Adverb', reason: 'far-too' },
  // was still in
  { match: `#Copula [still] (in|#Gerund|#Adjective)`, hook: 'still', group: 0, tag: 'Adverb', reason: 'was-still-walking' },
  // studies hard
  { match: `#Plural ${noLy}`, hook: '#Plural', tag: '#PresentTense #Adverb', reason: 'studies-hard' },
  // shops direct
  {
    match: `#Verb [${noLy}] !#Noun?`, hook: '#Verb',
    group: 0,
    notIf: '(#Copula|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Determiner|#Preposition)',
    tag: 'Adverb',
    reason: 'shops-direct',
  },
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  { match: '(be|been|being) (#Adverb|not)+? [late]', hook: 'late', group: 0, tag: 'Adjective', reason: 'be-late' },
  { match: '(be|been|being) (#Adverb|not)+? [early]', hook: 'early', group: 0, tag: 'Adjective', reason: 'be-late' },
  // studies a lot
  { match: `[#Plural] a lot`, hook: 'lot', tag: 'PresentTense', reason: 'studies-a-lot' },
]
