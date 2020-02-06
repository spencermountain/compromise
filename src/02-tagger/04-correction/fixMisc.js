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

  // Firstname x (dangerous)
  doc
    .match('#FirstName (#Noun|@titleCase)')
    .ifNo('^#Possessive')
    .ifNo('#Pronoun')
    .lastTerm()
    .tag('#LastName', 'firstname-noun')

  //three trains / one train
  let m = doc.match('#Value #PresentTense')
  if (m.found) {
    if (m.has('(one|1)') === true) {
      m.terms(1).tag('Singular', 'one-presentTense')
    } else {
      m.terms(1).tag('Plural', 'value-presentTense')
    }
  }

  // well i've been...
  doc.match('^(well|so|okay)').tag('Expression', 'well-')

  //been walking
  doc
    .match(`(be|been) (#Adverb|not)+? #Gerund`)
    .not('#Verb$')
    .tag('Auxiliary', 'be-walking')

  // directive verb - 'use reverse'
  doc
    .match('(try|use|attempt|build|make) #Verb')
    .ifNo('(@hasComma|#Negative|#Copula|will|be)')
    .lastTerm()
    .tag('#Noun', 'do-verb')

  //possessives
  //'her match' vs 'let her match'
  m = doc.match('#Possessive [#Infinitive]', 0)
  if (!m.lookBehind('(let|made|make|force|ask)').found) {
    m.tag('Noun', 'her-match')
  }

  return doc
}

module.exports = miscCorrection
