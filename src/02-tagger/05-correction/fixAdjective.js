//
const fixAdjective = function(doc) {
  let m = doc.if('#Adjective')
  if (m.found) {
    //still good
    m.match('[still] #Adjective').tag('Adverb', 'still-advb')
    //barely even walk
    m.match('(barely|hardly) even').tag('#Adverb', 'barely-even')
    //big dreams, critical thinking
    m.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense')
    //will secure our
    m.match('will [#Adjective]').tag('Verb', 'will-adj')
    //cheering hard - dropped -ly's
    m.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly')
    //his fine
    m.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine')
    //he left
    m.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb')
  }
  return doc
}
module.exports = fixAdjective
