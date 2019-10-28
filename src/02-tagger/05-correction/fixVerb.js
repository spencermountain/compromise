const advb = '(#Adverb|not)+?'
//
const fixVerb = function(doc) {
  let vb = doc.if('#Verb')
  if (vb.found) {
    vb.match('[(do|does|will|have|had)] (not|#Adverb)? #Verb').tag('Auxiliary', 'have-had')
    //still make
    vb.match('[still] #Verb').tag('Adverb', 'still-verb')
    //'u' as pronoun
    vb.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1')
    //is no walk
    vb.match('is no [#Verb]').tag('Noun', 'is-no-verb')
    //different views than
    vb.match('[#Verb] than').tag('Noun', 'correction')

    //there are reasons
    vb.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are')
    //jack seems guarded
    vb.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled')
    //fall over
    vb.match('#PhrasalVerb [#PhrasalVerb]').tag('Particle', 'phrasal-particle')
    //went to sleep
    // vb.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
    //been walking
    vb.match(`(be|been) ${advb} #Gerund`)
      .not('#Verb$')
      .tag('Auxiliary', 'be-walking')

    //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');

    let modal = vb.if('(#Modal|did|had|has)')
    if (modal.found === true) {
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
        .match(`#Copula ${advb} #Gerund`)
        .not('#Verb$')
        .tag('Auxiliary', 'copula-walking')
      //is mark hughes
      copula.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun')
      //
      copula.match('[#Infinitive] #Copula').tag('Noun', 'inf-copula')
      //sometimes not-adverbs
      copula.match('#Copula [(just|alone)]$').tag('Adjective', 'not-adverb')
      //jack is guarded
      copula.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled')
      //is eager to go
      copula.match('#Copula [#Adjective to] #Verb').tag('Verb', 'adj-to')

      //sometimes adverbs - 'pretty good','well above'
      copula
        .match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)')
        .ifNo('#Comma')
        .tag('#Copula #Adverb #Adjective', 'sometimes-adverb')
    }

    //Gerund - 'walking'
    let gerund = vb.if('#Gerund')
    if (gerund.found === true) {
      //walking is cool
      gerund.match('[#Gerund] #Adverb? not? #Copula').tag('Activity', 'gerund-copula')
      //walking should be fun
      gerund.match('[#Gerund] #Modal').tag('Activity', 'gerund-modal')
      //running-a-show
      gerund.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show')
      //setting records
      // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
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
    //the word 'how'
    m.match('^how').tag('QuestionWord', 'how-question')
    m.match('[how] (#Determiner|#Copula|#Modal|#PastTense)').tag('QuestionWord', 'how-is')
    // //the word 'which'
    m.match('^which').tag('QuestionWord', 'which-question')
    m.match('[which] . (#Noun)+ #Pronoun').tag('QuestionWord', 'which-question2')
    m.match('which').tag('QuestionWord', 'which-question3')

    //how he is driving
    m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)')
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
