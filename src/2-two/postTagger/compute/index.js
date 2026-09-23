let net = null

// runs all match/tag patterns in model.two.matches
const postTagger = function (view) {
  const { world } = view
  const { model, methods } = world
  net = net || methods.one.buildNet(model.two.matches, world)
  // perform these matches on a comma-seperated document
  const document = methods.two.quickSplit(view.docs)
  const ptrs = document.map(terms => {
    const t = terms[0]
    return [t.index[0], t.index[1], t.index[1] + terms.length]
  })
  const m = view.update(ptrs)
  m.sweep(net)
  view.uncache()
  // Resolve subjects after date rules distinguish modal 'may' from the month.
  m.match('^[(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)', 0)
    .tag('Pronoun', 'demonstrative-subject')
  m.match('(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive', 0)
    .tag('Pronoun', 'demonstrative-question')
  // Embedded clauses after verbs of belief/knowledge: 'I know that works'.
  // Singular demonstratives disambiguate a final plural/verb switch; plural
  // objects such as 'I know those works' must keep their noun reading.
  const embedding = '(know|knows|knew|hope|hopes|hoped|think|thinks|thought|believe|believes|believed|expect|expects|expected)'
  m.match(`${embedding} (this|that) [%Plural|Verb%] #Adverb+?$`, 0)
    .tag('PresentTense', 'embedded-demonstrative-verb')
  m.match(`${embedding} [(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)`, 0)
    .tag('Pronoun', 'embedded-demonstrative-subject')
  // The spelling of 'read' does not distinguish infinitive from participle.
  view.match('(has|have|had) (#Adverb|not)+? [read]', 0)
    .tag('Participle', 'perfect-read')
  // An object wh-noun precedes a new subject in an embedded question; it is
  // not another predicate ('which books he had read').
  view.match('(which|what|whose) [%Noun|Verb%] #Pronoun', 0)
    .tag('Noun', 'embedded-wh-object')
  view.match('(which|what|whose) [%Plural|Verb%] #Pronoun', 0)
    .tag('Plural', 'embedded-wh-plural')
  // A lowercase ambiguous word after two named subjects is a predicate, not
  // another surname ('Alice and Bob walk'). Preserve title-cased surnames.
  view.match('#Person and #Person [%Noun|Verb%]$', 0)
    .filter(term => /^[a-z]/.test(term.text()))
    .tag('Infinitive', 'coordinated-subject-verb')
  // Recover a predicate after a locative subject modifier. 'near' can otherwise
  // remain an adjective and absorb the final verb into the noun phrase.
  const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'
  view.match(locative, 0).tag('Preposition', 'subject-locative')
  view.match(locative, 1).tag('Infinitive', 'subject-locative-verb')
  // Resolve coordination after the sweep: an ambiguous adjective may have
  // become a participle during that pass ('being watched and recorded').
  view.match('being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)', 0)
    .tag('PastTense', 'coordinated-passive')
  view.match('(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]', 0)
    .tag('Participle', 'coordinated-drunk')
  // This context crosses the comma boundary used by quickSplit above.
  view.match('(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun', 0)
    .tag('Preposition', 'including-list')
  // A trailing polite request marker can sit beyond the comma split.
  view.if('@hasComma please$')
    .match('^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] .+? please$', 0)
    .tag('Imperative', 'would-you-comma-please')
  view.unfreeze()
  return view
}

// helper function for compute('tagger')
const tagger = view => view.compute(['freeze', 'lexicon', 'preTagger', 'postTagger', 'unfreeze'])

export default { postTagger, tagger }
