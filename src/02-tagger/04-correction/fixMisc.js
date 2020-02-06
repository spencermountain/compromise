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

  //pope francis
  doc
    .match('(lady|queen|sister) @titleCase')
    .ifNo('#Date')
    .ifNo('#Honorific')
    .tag('#FemaleName', 'lady-titlecase')
  doc
    .match('(king|pope|father) @titleCase')
    .ifNo('#Date')
    .tag('#MaleName', 'poe')

  // Firstname x (dangerous)
  let tmp = doc
    .match('#FirstName (#Noun|@titleCase)')
    .ifNo('^#Possessive')
    .ifNo('#Pronoun')
  tmp.lastTerm().tag('#LastName', 'firstname-noun')

  //three trains / one train
  let m = doc.match('#Value #PresentTense')
  if (m.found) {
    if (m.has('(one|1)') === true) {
      m.terms(1).tag('Singular', 'one-presentTense')
    } else {
      m.terms(1).tag('Plural', 'value-presentTense')
    }
  }

  //the word 'second'
  doc
    .match('[second] #Noun', 0)
    .notIf('#Honorific')
    .unTag('Unit')
    .tag('Ordinal', 'second-noun')

  //organization
  doc
    .match('@titleCase #Organization')
    .ifNo('@hasComma')
    .tag('Organization', 'titlecase-org')

  //acronyms
  doc
    .match('the [#Acronym]', 0)
    .notIf('(iou|fomo|yolo|diy|dui|nimby)')
    .tag('Organization', 'the-acronym')

  //possessives
  //'her match' vs 'let her match'
  m = doc.match('#Possessive [#Infinitive]', 0)
  if (!m.lookBehind('(let|made|make|force|ask)').found) {
    m.tag('Noun', 'her-match')
  }

  return doc
}

module.exports = miscCorrection
