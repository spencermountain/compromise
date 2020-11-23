const tagger = function (doc) {
  doc.match('#Noun').tag('NounPhrase')
  doc.match('#Verb').tag('VerbPhrase')

  // noun-adjective
  doc.match('#Adjective+ #NounPhrase').tagSafe('NounPhrase')
  doc.match('#NounPhrase #Adjective+').tagSafe('NounPhrase')

  // verb-adverb
  doc.match('#VerbPhrase #Adverb+').tagSafe('VerbPhrase')
  doc.match('#Adverb+ #VerbPhrase').tagSafe('VerbPhrase')
}
module.exports = tagger
