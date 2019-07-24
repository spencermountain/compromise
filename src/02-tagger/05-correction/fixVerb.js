//
const fixVerb = function(doc) {
  let vb = doc.if('#Verb')
  if (vb.found) {
    //still make
    vb.match('[still] #Verb').tag('Adverb', 'still-verb')
    //'u' as pronoun
    vb.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1')
    //is no walk
    vb.match('is no [#Verb]').tag('Noun', 'is-no-verb')
    //different views than
    vb.match('[#Verb] than').tag('Noun', 'correction')
    //her polling
    vb.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive')
    //there are reasons
    vb.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are')
    //jack seems guarded
    vb.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled')
    //fall over
    vb.match('#PhrasalVerb [#PhrasalVerb]').tag('Particle', 'phrasal-particle')
  }

  let m = doc.if('(who|what|where|why|how|when)')
  if (m.found) {
    //the word 'how'
    m.match('^how')
      .tag('QuestionWord', 'how-question')
      .tag('QuestionWord', 'how-question')
    m.match('how (#Determiner|#Copula|#Modal|#PastTense)')
      .term(0)
      .tag('QuestionWord', 'how-is')
    // //the word 'which'
    m.match('^which')
      .tag('QuestionWord', 'which-question')
      .tag('QuestionWord', 'which-question')
    m.match('which . (#Noun)+ #Pronoun')
      .term(0)
      .tag('QuestionWord', 'which-question2')
    m.match('which').tag('QuestionWord', 'which-question3')
    //where

    //how he is driving
    let word = m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)')
    word.unTag('QuestionWord').tag('Conjunction', 'how-he-is-x')
    //when i go fishing
    word = m.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund')
    word.unTag('QuestionWord').tag('Conjunction', 'when i go fishing')
  }

  let cop = doc.if('#Copula')
  if (cop.found === true) {
    //is eager to go
    cop
      .match('#Copula #Adjective to #Verb')
      .match('#Adjective to')
      .tag('Verb', 'correction')

    //is mark hughes
    cop.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun')

    cop.match('[#Infinitive] #Copula').tag('Noun', 'infinitive-copula')

    //sometimes adverbs - 'pretty good','well above'
    cop
      .match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)')
      .ifNo('#Comma')
      .tag('#Copula #Adverb #Adjective', 'sometimes-adverb')

    //sometimes not-adverbs
    cop.match('#Copula [(just|alone)$]').tag('Adjective', 'not-adverb')
    //jack is guarded
    cop.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled')
  }

  //went to sleep
  // doc.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');

  //support a splattering of auxillaries before a verb
  let advb = doc.if('(#Adverb|not)+?')
  if (advb.found === true) {
    //had walked
    advb
      .match(`(has|had) ${advb} #PastTense`)
      .not('#Verb$')
      .tag('Auxiliary', 'had-walked')
    //was walking
    advb
      .match(`#Copula ${advb} #Gerund`)
      .not('#Verb$')
      .tag('Auxiliary', 'copula-walking')
    //been walking
    advb
      .match(`(be|been) ${advb} #Gerund`)
      .not('#Verb$')
      .tag('Auxiliary', 'be-walking')
    //would walk
    advb
      .match(`(#Modal|did) ${advb} #Verb`)
      .not('#Verb$')
      .tag('Auxiliary', 'modal-verb')
    //would have had
    advb
      .match(`#Modal ${advb} have ${advb} had ${advb} #Verb`)
      .not('#Verb$')
      .tag('Auxiliary', 'would-have')
    //would be walking
    advb
      .match(`(#Modal) ${advb} be ${advb} #Verb`)
      .not('#Verb$')
      .tag('Auxiliary', 'would-be')
    //would been walking
    advb
      .match(`(#Modal|had|has) ${advb} been ${advb} #Verb`)
      .not('#Verb$')
      .tag('Auxiliary', 'would-be')
    //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
  }

  let gerund = doc.if('#Gerund')
  if (gerund.found === true) {
    //walking is cool
    gerund
      .match('#Gerund #Adverb? not? #Copula')
      .firstTerm()
      .tag('Activity', 'gerund-copula')
    //walking should be fun
    gerund
      .match('#Gerund #Modal')
      .firstTerm()
      .tag('Activity', 'gerund-modal')
    //running-a-show
    gerund.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show')
    //setting records
    // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
  }

  //will be cool -> Copula
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
  return doc
}
module.exports = fixVerb
