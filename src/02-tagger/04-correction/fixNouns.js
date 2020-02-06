//
const fixNouns = function(doc) {
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
  let m = doc.match('#Possessive [#Infinitive]', 0)
  if (!m.lookBehind('(let|made|make|force|ask)').found) {
    m.tag('Noun', 'her-match')
  }

  return doc
}
module.exports = fixNouns
