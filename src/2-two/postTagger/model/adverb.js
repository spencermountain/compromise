// const adverbAdj = '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)'

export default [
  // [way] too hot
  { match: '[way] #Adverb #Adjective', group: 0, tag: 'Adverb', reason: 'way-too-adj' },
  // sing [like] an angel
  { match: '#Verb  [like]', group: 0, notIf: '(#Modal|#PhrasalVerb)', tag: 'Adverb', reason: 'verb-like' },
  // barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  // even left
  { match: 'even left', tag: '#Adverb #Verb', reason: 'even-left' },
  // cheering [hard]
  {
    match: '#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]',
    notIf: '(#Copula|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    group: 0,
    tag: 'Adverb',
    reason: 'lazy-ly',
  },
  // is [well]
  { match: '#Copula [#Adverb]$', group: 0, tag: 'Adjective', reason: 'is-well' },
  // a [bit] cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // become overly [weakened]
  { match: '(become|fall|grow) #Adverb? [#PastTense]', group: 0, tag: 'Adjective', reason: 'weakened' },
  // a completely [beaten] man
  { match: '(a|an) #Adverb [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'beaten' },
  // a [close] friend
  { match: '#Determiner #Adverb? [close] #Noun', group: 0, tag: 'Adjective', reason: 'a-close' },
  // does [better]
  { match: '(do|does|did) #Adverb? [(better|worse)]', group: 0, tag: 'Adverb', reason: 'do-better' },
  // walking [close]
  { match: '#Gerund #Adverb? [close]', group: 0, tag: 'Adverb', notIf: '(getting|becoming|feeling)', reason: 'being-close' },
  // charged [back]
  { match: '(#PresentTense|#PastTense) [back]', group: 0, tag: 'Adverb', notIf: '(#PhrasalVerb|#Copula)', reason: 'charge-back' },
  // the [well]
  { match: '#Determiner [well] !#PastTense?', group: 0, tag: 'Noun', reason: 'well' },
  // sees [well]
  { match: '(#PresentTense && !#Copula) [well]', group: 0, tag: 'Adverb', reason: 'sees-well' },
]
