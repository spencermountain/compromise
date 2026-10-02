// const adverbAdj = '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)'

export default [
  // [still] good
  // left-right: { match: '[still] #Adjective', group: 0, tag: 'Adverb', reason: 'still-adj' },
  // [still] make
  // left-right: { match: '[still] #Verb', group: 0, tag: 'Adverb', reason: 'still-verb' },
  // [so] hot
  // left-right: { match: '[so] #Adjective', group: 0, tag: 'Adverb', reason: 'so-adv' },
  // [way] hotter
  // left-right: { match: '[way] #Comparative', group: 0, tag: 'Adverb', reason: 'way-adj' },
  // [way] too hot
  { match: '[way] #Adverb #Adjective', group: 0, tag: 'Adverb', reason: 'way-too-adj' },
  // they [all] swim
  // left-right: { match: '[all] #Verb', group: 0, tag: 'Adverb', reason: 'all-verb' },
  // sing [like] an angel
  { match: '#Verb  [like]', group: 0, notIf: '(#Modal|#PhrasalVerb)', tag: 'Adverb', reason: 'verb-like' },
  // barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  // [even] held
  // left-right: { match: '[even] #Verb', group: 0, tag: 'Adverb', reason: 'even-walk' },
  // [even] worse
  // left-right: { match: '[even] #Comparative', group: 0, tag: 'Adverb', reason: 'even-worse' },
  // [even] the greatest
  // left-right: { match: '[even] (#Determiner|#Possessive)', group: 0, tag: '#Adverb', reason: 'even-the' },
  // even left
  { match: 'even left', tag: '#Adverb #Verb', reason: 'even-left' },
  // [way] over
  // left-right: { match: '[way] #Adjective', group: 0, tag: '#Adverb', reason: 'way-over' },
  // cheering [hard]
  {
    match: '#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]',
    notIf: '(#Copula|feel|feels|look|looks|seem|seems|appear|appears|sound|sounds|smell|smells|taste|tastes|become|becomes|grow|grows|get|gets|stay|stays|remain|remains)',
    group: 0,
    tag: 'Adverb',
    reason: 'lazy-ly',
  },
  // [much] appreciated
  // left-right: { match: '[much] #Adjective', group: 0, tag: 'Adverb', reason: 'much-part' },
  // is [well]
  { match: '#Copula [#Adverb]$', group: 0, tag: 'Adjective', reason: 'is-well' },
  // a [bit] cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // [super] strong
  // left-right: { match: `[(super|pretty)] #Adjective`, group: 0, tag: 'Adverb', reason: 'super-strong' },
  // become overly [weakened]
  { match: '(become|fall|grow) #Adverb? [#PastTense]', group: 0, tag: 'Adjective', reason: 'weakened' },
  // a completely [beaten] man
  { match: '(a|an) #Adverb [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'beaten' },
  // a [close] friend
  { match: '#Determiner #Adverb? [close] #Noun', group: 0, tag: 'Adjective', reason: 'a-close' },
  // came to a [close]
  // left-right: { match: '#Determiner [close]$', group: 0, tag: 'Noun', reason: 'a-close-noun' },
  // does [better]
  { match: '(do|does|did) #Adverb? [(better|worse)]', group: 0, tag: 'Adverb', reason: 'do-better' },
  // walking [close]
  { match: '#Gerund #Adverb? [close]', group: 0, tag: 'Adverb', notIf: '(getting|becoming|feeling)', reason: 'being-close' },
  // a [blown] motor
  // left-right: { match: '(the|those|these|a|an) [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'blown-motor' },
  // charged [back]
  { match: '(#PresentTense|#PastTense) [back]', group: 0, tag: 'Adverb', notIf: '(#PhrasalVerb|#Copula)', reason: 'charge-back' },
  // [later] say
  // left-right: { match: '[later] #PresentTense', group: 0, tag: 'Adverb', reason: 'later-say' },
  // the [well]
  { match: '#Determiner [well] !#PastTense?', group: 0, tag: 'Noun', reason: 'well' },
  // sees [well]
  { match: '(#PresentTense && !#Copula) [well]', group: 0, tag: 'Adverb', reason: 'sees-well' },
  // high [enough]
  // left-right: { match: '#Adjective [enough]', group: 0, tag: 'Adverb', reason: 'high-enough' },
  // [least] expensive
  // left-right: { match: '[least] #Adjective', group: 0, tag: 'Adverb', reason: 'least-costly' },
  // the [least]
  // left-right: { match: '#Determiner [least]', group: 0, tag: 'Adverb', reason: 'least' },
]
