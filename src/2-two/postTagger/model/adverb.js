// const adverbAdj = '(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)'

export default [
  // still good
  { match: '[still] #Adjective', hook: 'still', group: 0, tag: 'Adverb', reason: 'still-adjective' },
  // still make
  { match: '[still] #Verb', hook: 'still', group: 0, tag: 'Adverb', reason: 'still-verb' },
  // so hot
  { match: '[so] #Adjective', hook: 'so', group: 0, tag: 'Adverb', reason: 'so-adv' },
  // way hotter
  { match: '[way] #Comparative', hook: 'way', group: 0, tag: 'Adverb', reason: 'way-adj' },
  // way too hot
  { match: '[way] #Adverb #Adjective', hook: 'way', group: 0, tag: 'Adverb', reason: 'way-too-adj' },
  // they all swim
  { match: '[all] #Verb', hook: 'all', group: 0, tag: 'Adverb', reason: 'all-verb' },
  // sing like an angel
  { match: '#Verb  [like]', hook: 'like', group: 0, notIf: '(#Modal|#PhrasalVerb)', tag: 'Adverb', reason: 'verb-like' },
  // barely even walk
  { match: '(barely|hardly) even', hook: 'even', tag: 'Adverb', reason: 'barely-even' },
  // even held
  { match: '[even] #Verb', hook: 'even', group: 0, tag: 'Adverb', reason: 'even-walk' },
  // even worse
  { match: '[even] #Comparative', hook: 'even', group: 0, tag: 'Adverb', reason: 'even-worse' },
  // even the greatest
  { match: '[even] (#Determiner|#Possessive)', hook: 'even', group: 0, tag: '#Adverb', reason: 'even-the' },
  // even left
  { match: 'even left', hook: 'even', tag: '#Adverb #Verb', reason: 'even-left' },
  // way over
  { match: '[way] #Adjective', hook: 'way', group: 0, tag: '#Adverb', reason: 'way-over' },
  // cheering hard
  {
    match: '#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]', hook: '#PresentTense',
    notIf: '#Copula',
    group: 0,
    tag: 'Adverb',
    reason: 'lazy-ly',
  },
  // much appreciated
  { match: '[much] #Adjective', hook: 'much', group: 0, tag: 'Adverb', reason: 'much-participle' },
  // is well
  { match: '#Copula [#Adverb]$', hook: '#Adverb', group: 0, tag: 'Adjective', reason: 'is-well' },
  // a bit cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', hook: 'a', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // super strong
  { match: `[(super|pretty)] #Adjective`, hook: '#Adjective', group: 0, tag: 'Adverb', reason: 'super-strong' },
  // become overly weakened
  { match: '(become|fall|grow) #Adverb? [#PastTense]', hook: '#PastTense', group: 0, tag: 'Adjective', reason: 'overly-weakened' },
  // a completely beaten man
  { match: '(a|an) #Adverb [#Participle] #Noun', hook: '#Participle', group: 0, tag: 'Adjective', reason: 'completely-beaten' },
  // a close
  { match: '#Determiner #Adverb? [close]', hook: 'close', group: 0, tag: 'Adjective', reason: 'a-close' },
  // walking close
  { match: '#Gerund #Adverb? [close]', hook: 'close', group: 0, tag: 'Adverb', notIf: '(getting|becoming|feeling)', reason: 'being-close' },
  // a blown motor
  { match: '(the|those|these|a|an) [#Participle] #Noun', hook: '#Participle', group: 0, tag: 'Adjective', reason: 'blown-motor' },
  // charged back
  { match: '(#PresentTense|#PastTense) [back]', hook: 'back', group: 0, tag: 'Adverb', notIf: '(#PhrasalVerb|#Copula)', reason: 'charge-back' },
  // later say
  { match: '[later] #PresentTense', hook: 'later', group: 0, tag: 'Adverb', reason: 'later-say' },
  // the well
  { match: '#Determiner [well] !#PastTense?', hook: 'well', group: 0, tag: 'Noun', reason: 'the-well' },
  // sees well
  { match: '(#PresentTense && !#Copula) [well]', hook: 'well', group: 0, tag: 'Adverb', reason: 'sees-well' },
  // high enough
  { match: '#Adjective [enough]', hook: 'enough', group: 0, tag: 'Adverb', reason: 'high-enough' },
  // least expensive
  { match: '[least] #Adjective', hook: 'least', group: 0, tag: 'Adverb', reason: 'least-expensive' },
  // the least
  { match: '#Determiner [least]', hook: 'least', group: 0, tag: 'Adverb', reason: 'the-least' },
]
