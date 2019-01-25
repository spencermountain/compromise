
//
const fix = function(doc) {
  //still make
  doc.match('[still] #Verb').tag('Adverb', 'still-verb');
  //'u' as pronoun
  doc.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1');
  //is no walk
  doc.match('is no [#Verb]').tag('Noun', 'is-no-verb');
  //different views than
  doc.match('[#Verb] than').tag('Noun', 'correction');
  //her polling
  doc.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive');
  //there are reasons
  doc.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are');
  //jack seems guarded
  doc.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled');

  if (doc.has('(who|what|where|why|how|when)')) {
    //the word 'how'
    doc.match('^how').tag('QuestionWord', 'how-question').tag('QuestionWord', 'how-question');
    doc.match('how (#Determiner|#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-is');
    // //the word 'which'
    doc.match('^which').tag('QuestionWord', 'which-question').tag('QuestionWord', 'which-question');
    doc.match('which . (#Noun)+ #Pronoun').term(0).tag('QuestionWord', 'which-question2');
    doc.match('which').tag('QuestionWord', 'which-question3');
    //where

    //how he is driving
    let word = doc.match('#QuestionWord #Noun #Copula #Adverb? (#Verb|#Adjective)').firstTerm();
    word.unTag('QuestionWord').tag('Conjunction', 'how-he-is-x');
    //when i go fishing
    word = doc.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund').firstTerm();
    word.unTag('QuestionWord').tag('Conjunction', 'when i go fishing');
  }

  if (doc.has('#Copula')) {
    //is eager to go
    doc.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
    //is mark hughes
    doc.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun');

    doc.match('[#Infinitive] #Copula').tag('Noun', 'infinitive-copula');
    //sometimes adverbs - 'pretty good','well above'
    doc.match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)').ifNo('#Comma').tag('#Copula #Adverb #Adjective', 'sometimes-adverb');
    //sometimes not-adverbs
    doc.match('#Copula [(just|alone)$]').tag('Adjective', 'not-adverb');
    //jack is guarded
    doc.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled');
  }
  //went to sleep
  // doc.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
  //support a splattering of auxillaries before a verb
  let advb = '(#Adverb|not)+?';
  if (doc.has(advb)) {
    //had walked
    doc.match(`(has|had) ${advb} #PastTense`).not('#Verb$').tag('Auxiliary', 'had-walked');
    //was walking
    doc.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'copula-walking');
    //been walking
    doc.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking');
    //would walk
    doc.match(`(#Modal|did) ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'modal-verb');
    //would have had
    doc.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-have');
    //would be walking
    doc.match(`(#Modal) ${advb} be ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
    //would been walking
    doc.match(`(#Modal|had|has) ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
  //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
  // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
  }
  //fall over
  doc.match('#PhrasalVerb #PhrasalVerb').lastTerm().tag('Particle', 'phrasal-particle');
  if (doc.has('#Gerund')) {
    //walking is cool
    doc.match('#Gerund #Adverb? not? #Copula').firstTerm().tag('Activity', 'gerund-copula');
    //walking should be fun
    doc.match('#Gerund #Modal').firstTerm().tag('Activity', 'gerund-modal');
    //running-a-show
    doc.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show');
  //setting records
  // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
  }
  //will be cool -> Copula
  if (doc.has('will #Adverb? not? #Adverb? be')) {
    //will be running (not copula
    if (doc.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
      //tag it all
      doc.match('will not? be').tag('Copula', 'will-be-copula');
      //for more complex forms, just tag 'be'
      doc.match('will #Adverb? not? #Adverb? be #Adjective').match('be').tag('Copula', 'be-copula');
    }
  }
  return doc;
};
module.exports = fix;
