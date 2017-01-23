'use strict';
//


//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
const logicalNegate = function(ts) {
  const logic = {
    'everyone': 'no one',
    'everybody': 'nobody',
    'someone': 'no one',
    'somebody': 'nobody',
    // everything:"nothing",
    'always': 'never'
  };
};

// i walk -> i don't walk
const doesNot = function(ts) {
  //they do not walk
  if (ts.match('^#Plural')) {
    ts.insertAt(0, 'do not');
    return ts;
  }
  //he does not walk
  ts.insertAt(0, 'does not');
  return ts;
};

//different rule for i/we/they/you + infinitive
//that is, 'i walk' -> 'i don\'t walk', not 'I not walk'

const toNegative = (ts) => {

  // i walk -> i don't walk
  let tmp = ts.match('#Noun #Adverb+? #Infinitive');
  if (tmp.found) {
    doesNot(tmp.list[0]);
    return ts;
  }

  //simplest-possible
  let vb = ts.mainVerb();
  ts = vb.list[0];
  //have not walked..
  if (ts.terms.length > 1) {
    ts.insertAt(1, 'not');
    return ts;
  }
  if (ts.terms.length === 1) {
    //is not
    if (ts.terms[0].tag.Copula) {
      ts.insertAt(1, 'not');
      return ts;
    }
    //not walk
    ts.insertAt(0, 'not');
    return ts;
  }
  return ts;
};
module.exports = toNegative;
