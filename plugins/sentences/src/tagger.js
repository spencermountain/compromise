const tagger = function (doc) {
  doc.match('#Noun').tag('NounPhrase')
  doc.match('#Verb').tag('VerbPhrase')
  doc.match('#Adjective').tag('AdjectivePhrase')

  // NounPhrase
  doc.match('(this|that|those|these)').tag('NounPhrase')
  doc.match('#Adjective+ #NounPhrase').tagSafe('NounPhrase')
  doc.match('#NounPhrase #Adjective+').tagSafe('NounPhrase')
  // (determiners)
  doc.match('#Determiner #NounPhrase').tag('NounPhrase')
  doc.match('#Determiner #Adverb+? #Adjective+ #NounPhrase').tag('NounPhrase')

  // Adjective
  doc.match('#Adverb+ #Adjective').tag('AdjectivePhrase')

  // VerbPhrase
  doc.match('#VerbPhrase #Adverb+').tagSafe('VerbPhrase')
  doc.match('#Adverb+ #VerbPhrase').tagSafe('VerbPhrase')
  doc.match('#Auxiliary+ #VerbPhrase').tagSafe('VerbPhrase')
}
module.exports = tagger
