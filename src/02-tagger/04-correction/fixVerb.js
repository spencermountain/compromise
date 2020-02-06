const advb = '(#Adverb|not)+?'
//
const fixVerb = function(doc) {
  //been walking
  doc
    .match(`(be|been) ${advb} #Gerund`)
    .not('#Verb$')
    .tag('Auxiliary', 'be-walking')

  // directive verb - 'use reverse'
  doc
    .match('(try|use|attempt|build|make) #Verb')
    .ifNo('(@hasComma|#Negative|#Copula|will|be)')
    .lastTerm()
    .tag('#Noun', 'do-verb')

  //'will be'
  let willBe = doc.if('will #Adverb? not? #Adverb? be')
  if (willBe.found === true) {
    //will be running (not copula
    if (willBe.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
      //tag it all
      willBe.match('will not? be').tag('Copula', 'will-be-copula')
      //for more complex forms, just tag 'be'
      willBe
        .match('will #Adverb? not? #Adverb? be #Adjective')
        .match('be')
        .tag('Copula', 'be-copula')
    }
  }

  //question words
  let m = doc.if('(who|what|where|why|how|when)')
  if (m.found) {
    //how he is driving
    m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)', 0)
      .unTag('QuestionWord')
      .tag('Conjunction', 'how-he-is-x')

    //when i go fishing
    m.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund')
      .unTag('QuestionWord')
      .tag('Conjunction', 'when i go fishing')
  }

  return doc
}
module.exports = fixVerb
