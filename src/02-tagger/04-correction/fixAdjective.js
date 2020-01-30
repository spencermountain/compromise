//
const fixAdjective = function(doc) {
  let adj = doc.if('#Adjective')
  if (adj.found) {
    //still goodß
    adj.match('[still] #Adjective', 0).tag('Adverb', 'still-advb')
    //barely even walk
    adj.match('(barely|hardly) even').tag('#Adverb', 'barely-even')
    //big dreams, critical thinking
    adj.match('#Adjective [#PresentTense]', 0).tag('Noun', 'adj-presentTense')
    //will secure our
    adj.match('will [#Adjective]', 0).tag('Verb', 'will-adj')
    //cheering hard - dropped -ly's
    adj.match('#PresentTense [(hard|quick|long|bright|slow)]', 0).tag('Adverb', 'lazy-ly')
    //his fine
    adj.match('(his|her|its) [#Adjective]', 0).tag('Noun', 'his-fine')
    //he left
    adj.match('#Noun #Adverb? [left]', 0).tag('PastTense', 'left-verb')
    //he disguised the thing
    adj.match('#Pronoun [#Adjective] #Determiner #Adjective? #Noun', 0).tag('Verb', 'he-adj-the')
  }
  return doc
}
module.exports = fixAdjective
