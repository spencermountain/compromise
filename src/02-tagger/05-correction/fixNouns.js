//
const fixNouns = function(doc) {
  //'more' is not always an adverb
  doc.match('more #Noun').tag('Noun', 'more-noun')
  //the word 'second'
  doc
    .match('[second] #Noun')
    .notIf('#Honorific')
    .unTag('Unit')
    .tag('Ordinal', 'second-noun')
  //he quickly foo
  doc.match('#Noun #Adverb [#Noun]').tag('Verb', 'correction')
  //fix for busted-up phrasalVerbs
  doc.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal')
  //John & Joe's
  doc.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun')
  //Aircraft designer
  doc.match('#Noun #Actor').tag('Actor', 'thing-doer')
  //this rocks
  doc.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs')
  //by a bear.
  doc
    .match('#Determiner #Infinitive$')
    .lastTerm()
    .tag('Noun', 'a-inf')
  //the western line
  doc.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line')
  doc
    .match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun')
    .tag('Noun', 'technical-noun')
  //organization
  if (doc.has('#Organization')) {
    doc.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place')
    doc.match('#Organization #Country').tag('Organization', 'org-country')
    doc.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org')
  }
  if (doc.has('#Possessive')) {
    //my buddy
    doc.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name')
    //spencer kelly's
    doc
      .match('#FirstName #Acronym? #Possessive')
      .ifNo('#Comma')
      .match('#FirstName #Acronym? #LastName')
      .tag('Possessive')
    //Super Corp's fundraiser
    doc
      .match('#Organization+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive')
    //Los Angeles's fundraiser
    doc
      .match('#Place+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive')
  }
  return doc
}
module.exports = fixNouns
