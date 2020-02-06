//mostly pos-corections here
const miscCorrection = function(doc) {
  //exactly like
  doc
    .match('#Adverb like')
    .notIf('(really|generally|typically|usually|sometimes|often) [like]')
    .tag('Adverb', 'adverb-like')

  //the orange.
  doc
    .match('#Determiner #Adjective$')
    .notIf('(#Comparative|#Superlative)')
    .terms(1)
    .tag('Noun', 'the-adj-1')

  //'a/an' can mean 1 - "a hour"
  doc
    .match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)', 0)
    .ifNo('#Plural')
    .tag('Value', 'a-is-one')

  //three trains / one train
  let m = doc.match('#Value #PresentTense')
  if (m.found) {
    if (m.has('(one|1)') === true) {
      m.terms(1).tag('Singular', 'one-presentTense')
    } else {
      m.terms(1).tag('Plural', 'value-presentTense')
    }
  }

  return doc
}

module.exports = miscCorrection
