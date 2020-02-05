const advb = '(#Adverb|not)+?'
//
const fixVerb = function(doc) {
  let vb = doc.if('#Verb')
  if (vb.found) {
    //'foo-up'
    vb.match('#Verb (up|off|over|out)')
      .match('@hasHyphen .')
      .tag('#PhrasalVerb')

    //went to sleep
    // vb.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
    //been walking
    vb.match(`(be|been) ${advb} #Gerund`)
      .not('#Verb$')
      .tag('Auxiliary', 'be-walking')

    // directive verb - 'use reverse'
    vb.match('(try|use|attempt|build|make) #Verb')
      .ifNo('(@hasComma|#Negative|#Copula|will|be)')
      .lastTerm()
      .tag('#Noun', 'do-verb')
    //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');

    let modal = vb.if('(#Modal|did|had|has)')
    if (modal.found === true) {
      if (!modal.has('#Modal #Verb')) {
        //'he can'
        modal.match('(can|will|may|must|should|could)').untag('Modal', 'he can')
      }
      //support a splattering of auxillaries before a verb
      modal
        .match(`(has|had) ${advb} #PastTense`)
        .not('#Verb$')
        .tag('Auxiliary', 'had-walked')
      //would walk
      modal
        .match(`(#Modal|did) ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'modal-verb')
      //would have had
      modal
        .match(`#Modal ${advb} have ${advb} had ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-have')
      //would be walking
      modal
        .match(`#Modal ${advb} be ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-be')
      //would been walking
      modal
        .match(`(#Modal|had|has) ${advb} been ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-be')
    }

    let copula = vb.if('#Copula')
    if (copula.found === true) {
      //was walking
      copula
        .match(`#Copula ${advb} (#Gerund|#PastTense)`)
        .not('#Verb$')
        .tag('Auxiliary', 'copula-walking')

      //sometimes adverbs - 'pretty good','well above'
      copula
        .match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)')
        .ifNo('@hasComma')
        .tag('#Copula #Adverb #Adjective', 'sometimes-adverb')
    }

    //'will be'
    let willBe = vb.if('will #Adverb? not? #Adverb? be')
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
