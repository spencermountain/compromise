//
const fixNouns = function(doc) {
  let noun = doc.if('#Noun')
  if (noun.found === true) {
    //'more' is not always an adverb
    noun.match('more #Noun').tag('Noun', 'more-noun')
    //he quickly foo
    noun.match('#Noun #Adverb [#Noun]').tag('Verb', 'quickly-foo')
    //fix for busted-up phrasalVerbs
    noun.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal')
    //John & Joe's
    noun.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun')
    //Aircraft designer
    noun.match('#Noun #Actor').tag('Actor', 'thing-doer')
    //j.k Rowling
    doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun')
    //king of spain
    doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun')
    // addresses
    doc.match('#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)').tag('Address')
    // schools
    doc.match('#Noun+ (public|private) school').tag('School')
    //the word 'second'
    noun
      .match('[second] #Noun')
      .notIf('#Honorific')
      .unTag('Unit')
      .tag('Ordinal', 'second-noun')
    //linear algebra
    noun
      .match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun')
      .tag('Noun', 'technical-noun')

    //organization
    let org = noun.if('#Organization')
    if (org.found === true) {
      org.match('#Organization of the? @titleCase').tagSafe('Organization', 'org-of-place')
      org.match('#Organization #Country').tag('Organization', 'org-country')
      org.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org')
      org
        .match('#TitleCase #Organization')
        .ifNo('@hasComma')
        .tag('Organization', 'titlecase-org')
    }

    let plural = noun.if('#Plural')
    if (plural.found === true) {
      //some pressing issues
      plural.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6')

      //this rocks
      noun.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs')
    }
  }

  //acronyms
  let acronym = doc.if('#Acronym')
  if (acronym.found === true) {
    acronym
      .match('the [#Acronym]')
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
    //my buddy
    poss.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name')
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
    //her polling
    poss.match('#Possessive [#Gerund]').tag('Noun', 'her-polling')
    //her fines
    poss.match('(his|her|its) [#PresentTense]').tag('Noun', 'her-polling')
    //'her match' vs 'let her match'
    let m = poss.match('#Possessive [#Infinitive]')
    if (!m.lookBehind('(let|made|make|force|ask)').found) {
      m.tag('Noun', 'her-match')
    }
  }
  //let him glue
  doc
    .match('(let|make|made) (him|her|it|#Person|#Place|#Organization)+ #Singular (a|an|the|it)')
    .ifNo('@hasComma')
    .match('[#Singular] (a|an|the|it)')
    .tag('#Infinitive', 'let-him-glue')
  return doc
}
module.exports = fixNouns
