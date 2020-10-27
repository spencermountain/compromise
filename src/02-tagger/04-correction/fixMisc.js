const hasWord = function (doc, word) {
  let arr = doc._cache.words[word] || []
  arr = arr.map(i => doc.list[i])
  return doc.buildFrom(arr)
}
const hasTag = function (doc, tag) {
  let arr = doc._cache.tags[tag] || []
  arr = arr.map(i => doc.list[i])
  return doc.buildFrom(arr)
}

//mostly pos-corections here
const miscCorrection = function (doc) {
  //exactly like
  let m = hasWord(doc, 'like')
  m.match('#Adverb like')
    .notIf('(really|generally|typically|usually|sometimes|often|just) [like]')
    .tag('Adverb', 'adverb-like')

  //the orange.
  m = hasTag(doc, 'Adjective')
  m.match('#Determiner #Adjective$').notIf('(#Comparative|#Superlative)').terms(1).tag('Noun', 'the-adj-1')

  // Firstname x (dangerous)
  m = hasTag(doc, 'FirstName')
  m.match('#FirstName (#Noun|@titleCase)')
    .ifNo('^#Possessive')
    .ifNo('(#Pronoun|#Plural)')
    .ifNo('@hasComma .')
    .lastTerm()
    .tag('#LastName', 'firstname-noun')

  //three trains / one train
  m = hasTag(doc, 'Value')
  m = m.match('#Value #PresentTense').ifNo('#Copula')
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
  m = hasTag(doc, 'Gerund')
  m.match(`(be|been) (#Adverb|not)+? #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking')

  // directive verb - 'use reverse'
  doc
    .match('(try|use|attempt|build|make) #Verb')
    .ifNo('(@hasComma|#Negative|#PhrasalVerb|#Copula|will|be)')
    .lastTerm()
    .tag('#Noun', 'do-verb')

  //possessives
  //'her match' vs 'let her match'
  m = hasTag(doc, 'Possessive')
  m = m.match('#Possessive [#Infinitive]', 0)
  if (!m.lookBehind('(let|made|make|force|ask)').found) {
    m.tag('Noun', 'her-match')
  }

  return doc
}

module.exports = miscCorrection
