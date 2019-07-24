//
const fixAdjective = function(doc) {
  let adj = doc.if('#Adjective')
  if (adj.found) {
    //still good
    adj.match('[still] #Adjective').tag('Adverb', 'still-advb')
    //barely even walk
    adj.match('(barely|hardly) even').tag('#Adverb', 'barely-even')
    //big dreams, critical thinking
    adj.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense')
    //will secure our
    adj.match('will [#Adjective]').tag('Verb', 'will-adj')
    //cheering hard - dropped -ly's
    adj.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly')
    //his fine
    adj.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine')
    //he left
    adj.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb')
  }
  return doc
}
module.exports = fixAdjective
