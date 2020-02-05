//
const fixNouns = function(doc) {
  let noun = doc.if('#Noun')
  if (noun.found === true) {
    //the word 'second'
    noun
      .match('[second] #Noun', 0)
      .notIf('#Honorific')
      .unTag('Unit')
      .tag('Ordinal', 'second-noun')

    //organization
    let org = noun.if('#Organization')
    if (org.found === true) {
      org
        .match('@titleCase #Organization')
        .ifNo('@hasComma')
        .tag('Organization', 'titlecase-org')
    }

    let plural = noun.if('#Plural')
    if (plural.found === true) {
    }
  }

  //acronyms
  let acronym = doc.if('#Acronym')
  if (acronym.found === true) {
    acronym
      .match('the [#Acronym]', 0)
      .notIf('(iou|fomo|yolo|diy|dui|nimby)')
      .tag('Organization', 'the-acronym')
    acronym
      .match('#Acronym')
      .match('#Possessive')
      .tag('Organization', 'possessive-acronym')
  }

  //possessives
  let poss = doc.if('#Possessive')
  if (poss.found === true) {
    //spencer kelly's
    poss
      .match('#FirstName #Acronym? #Possessive')
      .ifNo('@hasComma')
      .match('#FirstName #Acronym? #LastName')
      .tag('Possessive')
    //Super Corp's fundraiser
    poss
      .match('#Organization+ #Possessive')
      .ifNo('@hasComma')
      .tag('Possessive')
    //Los Angeles's fundraiser
    poss
      .match('#Place+ #Possessive')
      .ifNo('@hasComma')
      .tag('Possessive')

    //'her match' vs 'let her match'
    let m = poss.match('#Possessive [#Infinitive]', 0)
    if (!m.lookBehind('(let|made|make|force|ask)').found) {
      m.tag('Noun', 'her-match')
    }
  }
  //let him glue
  doc
    .match('(let|make|made) (him|her|it|#Person|#Place|#Organization)+ #Singular (a|an|the|it)')
    .ifNo('@hasComma')
    .match('[#Singular] (a|an|the|it)', 0)
    .tag('#Infinitive', 'let-him-glue')
  return doc
}
module.exports = fixNouns
