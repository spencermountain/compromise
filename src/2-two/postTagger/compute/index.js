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
  // Resolve coordination after the sweep: an ambiguous adjective may have
  // become a participle during that pass ('being watched and recorded').
  view.match('being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)', 0)
    .tag('PastTense', 'coordinated-passive')
  view.match('(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]', 0)
    .tag('Participle', 'coordinated-drunk')
  // This context crosses the comma boundary used by quickSplit above.
  view.match('(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun', 0)
    .tag('Preposition', 'including-list')
  view.unfreeze()
  return view
}

// helper function for compute('tagger')
const tagger = view => view.compute(['freeze', 'lexicon', 'preTagger', 'postTagger', 'unfreeze'])

export default { postTagger, tagger }
