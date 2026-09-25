const adverbAdj = `(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)`
const noLy = '(hard|fast|late|early|high|right|deep|close|direct)'

export default [
  // [dark] green
  { match: `[${adverbAdj}] #Adjective`, hook: '#Adjective', group: 0, tag: 'Adverb', reason: 'dark-green' },
  // is [far too] cold
  { match: `#Copula [far too] #Adjective`, hook: 'far', group: 0, tag: 'Adverb', reason: 'far-too' },
  // was [still] in
  { match: `#Copula [still] (in|#Gerund|#Adjective)`, hook: 'still', group: 0, tag: 'Adverb', reason: 'was-still-walking' },
  // shops [direct]
  {
    match: `#Verb [${noLy}] !#Noun?`, hook: '#Verb',
    group: 0,
    notIf: '(#Copula|be|been|being|get|got|getting|become|became|becoming|feel|feels|feeling|#Determiner|#Preposition)',
    tag: 'Adverb',
    reason: 'shops-direct',
  },
  // Bare 'be' may still be Infinitive rather than Copula in commands.
  // be [late]
  { match: '(be|been|being) (#Adverb|not)+? [late]', hook: 'late', group: 0, tag: 'Adjective', reason: 'be-late' },
  // be [early]
  { match: '(be|been|being) (#Adverb|not)+? [early]', hook: 'early', group: 0, tag: 'Adjective', reason: 'be-early' },
  // [moons] a lot
  { match: `[#Plural] a lot`, hook: 'lot', group: 0, tag: 'PresentTense', reason: 'studies-a-lot' },
]
