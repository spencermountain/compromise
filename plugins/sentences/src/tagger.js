const tagger = function (doc) {
  doc.match('#Noun').tag('NounPhrase')
  doc.match('#Verb').tag('VerbPhrase')
  doc.match('#Adjective').tag('AdjectivePhrase')

  // noun-adjective
  doc.match('#Adjective+ #NounPhrase').tagSafe('NounPhrase')
  doc.match('#NounPhrase #Adjective+').tagSafe('NounPhrase')
  // determiner-noun
  doc.match('#Determiner #NounPhrase').tag('NounPhrase')
  doc.match('#Determiner #Adverb+? #Adjective+ #NounPhrase').tag('NounPhrase')

  // adverb-adjective
  doc.match('#Adverb+ #Adjective').tag('AdjectivePhrase')

  // verb-adverb
  doc.match('#VerbPhrase #Adverb+').tagSafe('VerbPhrase')
  doc.match('#Adverb+ #VerbPhrase').tagSafe('VerbPhrase')
}
module.exports = tagger
