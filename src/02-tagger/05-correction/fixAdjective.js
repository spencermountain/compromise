//
const fixAdjective = function(doc) {
  if (doc.has('#Adjective')) {
    //still good
    doc.match('[still] #Adjective').tag('Adverb', 'still-advb')
    //barely even walk
    doc.match('(barely|hardly) even').tag('#Adverb', 'barely-even')
    //big dreams, critical thinking
    doc.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense')
    //will secure our
    doc.match('will [#Adjective]').tag('Verb', 'will-adj')
    //cheering hard - dropped -ly's
    doc.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly')
    //his fine
    doc.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine')
    //he left
    doc.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb')
  }
  return doc
}
module.exports = fixAdjective
