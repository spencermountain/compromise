import expandTags from '../../../2-two/postTagger/model/_lib.js'

const rules = [
  // === Conjunction ===
  // that the houses
  { match: '[that] #Det #NN', group: 0, chunk: 'Pivot' },
  // estimated that
  { match: '#Past [that]', group: 0, chunk: 'Pivot' },
  // so the
  { match: '[so] #Det', group: 0, chunk: 'Pivot' },

  // === Adjective ===
  // was really nice
  { match: '#Cop #Adv+? [#Adj]', group: 0, chunk: 'Adjective' },
  // was nice
  // { match: '#Copula [#Adjective]', group: 0, chunk: 'Adjective' },
  // nice and cool
  { match: '#Adj and #Adj', chunk: 'Adjective' },
  // really nice
  // { match: '#Adverb+ #Adjective', chunk: 'Adjective' },

  // === Verb ===
  // quickly and suddenly run
  { match: '#Adv+ and #Adv #V', chunk: 'Verb' },
  // sitting near
  { match: '#Ger #Adj$', chunk: 'Verb' },
  // going to walk
  { match: '#Ger to #V', chunk: 'Verb' },
  // come and have a drink
  { match: '#Pres and #Pres', chunk: 'Verb' },
  // really not
  { match: '#Adv #Neg', chunk: 'Verb' },
  // want to see
  { match: '(want|wants|wanted) to #Inf', chunk: 'Verb' },
  // walk ourselves
  { match: '#V #Refl', chunk: 'Verb' },
  // tell him the story
  // { match: '#PresentTense [#Pronoun] #Determiner', group: 0, chunk: 'Verb' },
  // tries to walk
  { match: '#V [to] #Adv? #Inf', group: 0, chunk: 'Verb' },
  // upon seeing
  { match: '[#Prep] #Ger', group: 0, chunk: 'Verb' },
  // ensure that
  { match: '#Inf [that] <Noun>', group: 0, chunk: 'Verb' },

  // === Noun ===
  // the brown fox
  // { match: '#Determiner #Adjective+ #Noun', chunk: 'Noun' },
  // the fox
  // { match: '(the|this) <Noun>', chunk: 'Noun' },
  // brown fox
  // { match: '#Adjective+ <Noun>', chunk: 'Noun' },
  // --- of ---
  // son of a gun
  { match: '#NN of #Det? #NN', chunk: 'Noun' },
  // 3 beautiful women
  { match: '#Value+ #Adv? #Adj', chunk: 'Noun' },
  // the last russian tsar
  { match: 'the [#Adj] #NN', chunk: 'Noun' },
  // the happy and playful dog
  { match: '#Det? #Adj+ (and|or) #Adj+ #NN', chunk: 'Noun' },
  // breakfast in bed
  { match: '#Sing in #Det? #Sing', chunk: 'Noun' },
  // Some citizens in this Canadian capital
  { match: '#Plur [in] #Det? #NN', group: 0, chunk: 'Pivot' },
  // indoor and outdoor seating
  { match: '#NN and #Det? #NN', notIf: '(#Poss|#Pron)', chunk: 'Noun' },
  //  boys and girls
  // { match: '#Plural and #Determiner? #Plural', chunk: 'Noun' },
  // tomatoes and cheese
  // { match: '#Noun and #Determiner? #Noun', notIf: '#Pronoun', chunk: 'Noun' },
  // that is why
  // { match: '[that] (is|was)', group: 0, chunk: 'Noun' },
]

// Restore public tag names once before compiling the matcher.
rules.forEach(rule => {
  rule.match = expandTags(rule.match)
  if (rule.notIf) {
    rule.notIf = expandTags(rule.notIf)
  }
})

let net = null
const matcher = function (view, _, world) {
  const { methods } = world
  net ||= methods.one.buildNet(rules, world)
  view.sweep(net)
}
export default matcher
