'use strict';
//


//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
const logicalNegate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};



//different rule for i/we/they/you + infinitive
//that is, 'i walk' -> 'i don\'t walk', not 'I not walk'

const toNegative = (ts) => {
  let lg = ts.match('(everyone|everybody|someone|somebody|always)').first();
  if (lg.found && logicalNegate[lg.normal()]) {
    let found = lg.normal();
    // ts = ts.replace(found, logicalNegate[found]);
    ts = ts.match(found).replaceWith(logicalNegate[found]);
    return ts.parentTerms;
  }

  //they walk -> they do not walk
  let tmp = ts.match('(#Plural|they|i|we|you) #Adverb+? (#Infinitive|#PresentTense)');
  if (tmp.found) {
    let v = tmp.match('(#Infinitive|#PresentTense)');
    v.insertBefore('do not');
    return ts;
  }
  //toronto walks ->  toronto does not walk
  tmp = ts.match('(#Pronoun|#Organization|#Place|#Person) #Adverb+? #PresentTense');
  if (tmp.found) {
    let v = tmp.match('#PresentTense');
    v.insertBefore('does not');
    v.verbs().toInfinitive();
    return ts;
  }
  //he walked
  tmp = ts.match('#Noun #Adverb+? #PastTense');
  if (tmp.found) {
    let v = tmp.match('#PastTense');
    v.insertBefore('did not');
    v.verbs().toInfinitive();
    return ts;
  }

  //simplest-possible
  let vb = ts.mainVerb().not('#Adverb');
  //have not walked..
  if (vb.terms().length > 1) {
    vb.terms().first().insertAfter('not');
    return ts;
  }
  if (vb.terms().length === 1) {
    //is not
    let copula = vb.match('#Copula');
    if (copula.found) {
      copula.insertAfter('not');
      return vb;
    }
    //not walk
    vb.insertBefore('not');
    return vb;
  }
  return ts;
};
module.exports = toNegative;
