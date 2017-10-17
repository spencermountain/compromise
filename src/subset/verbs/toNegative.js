'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun
const toInfinitive = require('./methods/toInfinitive');

//this methods operate on parentTerms, so return subset
const getVerb = function(ts) {
  ts = ts.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+');
  ts = ts.splitAfter('#Comma');
  return ts.list[0];
};

const toNegative = ts => {
  //would not walk
  let modal = ts.match('#Auxiliary').first(); //.notIf('(is|are|was|will|has|had)').first(); //.first();
  if (modal.found) {
    let index = modal.list[0].index();
    let vb = ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  //words that pair easily with a 'not' - 'is not'
  let copula = ts.match('(#Copula|will|has|had|do)').first();
  if (copula.found) {
    let index = copula.list[0].index();
    let vb = ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  let isPlural = ts.isPlural();

  //walked -> did not walk
  let past = ts.match('#PastTense').last();
  if (past.found) {
    // past.debug();
    let first = past.list[0];
    let index = first.index();
    first.terms[0].text = toInfinitive(first.terms[0], ts.world);
    let vb = ts.parentTerms.insertAt(index, 'did not', 'Verb');
    //add 'do not'?
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  //walks -> does not walk
  let pres = ts.match('#PresentTense').first();
  if (pres.found) {
    let first = pres.list[0];
    let index = first.index();
    first.terms[0].text = toInfinitive(first.terms[0], ts.world);
    //some things use 'do not', everything else is 'does not'
    let noun = ts.getNoun();
    let vb = null;
    if (noun.match('(i|we|they|you)').found) {
      vb = ts.parentTerms.insertAt(index, 'do not', 'Verb');
    } else {
      vb = ts.parentTerms.insertAt(index, 'does not', 'Verb');
    }
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  //not walking
  let gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    let index = gerund.list[0].index();
    let vb = ts.parentTerms.insertAt(index, 'not', 'Verb');
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  //walk -> do not walk
  let verb = ts.match('#Verb').last();
  if (verb.found) {
    let first = verb.list[0];
    let index = first.index();
    first.terms[0].text = toInfinitive(first.terms[0], ts.world);
    let vb = ts;
    if (isPlural) {
      vb = ts.parentTerms.insertAt(index - 1, 'do not', 'Verb');
    } else {
      vb = ts.parentTerms.insertAt(index - 1, 'does not', 'Verb');
    }
    vb.match('not').tag('Negative', 'tag-not');
    return getVerb(vb);
  }

  return ts;
};
module.exports = toNegative;
