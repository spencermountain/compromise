const tagger = function (doc) {
  doc.match('#Noun').tag('NounPhrase')
  doc.match('#Verb').tag('VerbPhrase')

  // NounPhrase
  doc.match('(this|that|those|these)').tag('NounPhrase')
  doc.match('#Adjective+ #NounPhrase').tagSafe('NounPhrase')
  doc.match('#NounPhrase #Adjective+').tagSafe('NounPhrase')
  // numbers
  doc.match('#Value #NounPhrase').tag('NounPhrase')
  // (determiners)
  doc.match('#Determiner #NounPhrase').tag('NounPhrase')
  doc.match('#Determiner #Adverb+? #Adjective+ #NounPhrase').tag('NounPhrase')
  doc.match('(many|most|all|one|some|plenty) of #NounPhrase').tag('NounPhrase')
  doc.match('such a #NounPhrase').tag('NounPhrase')

  // VerbPhrase
  doc.match('#VerbPhrase #Adverb+').tagSafe('VerbPhrase')
  doc.match('#Adverb+ #VerbPhrase').tagSafe('VerbPhrase')
  doc.match('#Auxiliary+ #VerbPhrase').tagSafe('VerbPhrase')
  doc.match('#VerbPhrase no').tagSafe('VerbPhrase')
  doc.match('not #VerbPhrase').tagSafe('VerbPhrase')

  // claiming that
  doc.match('#VerbPhrase [that]', 0).unTag('NounPhrase')
  // (conjunctions)
  doc.match('#VerbPhrase #Conjunction #VerbPhrase').tagSafe('VerbPhrase')

  // nouns
  doc.match('(who|what|which)').tag('NounPhrase')

  // Adjective
  doc.match('#Adverb+ #Adjective').tagSafe('AdjectivePhrase')
  doc.match('#Adjective').tagSafe('AdjectivePhrase')

  // missing
  doc.match('#Value').tagSafe('NounPhrase')
  doc.match('#Date').tagSafe('NounPhrase')
  doc.match('#Date at #Date').tagSafe('NounPhrase')
}
module.exports = tagger
