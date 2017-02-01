'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun
const toNegative = (ts, plural) => {
  //would not walk
  let modal = ts.match('#Auxillary').first(); //.notIf('(is|are|was|will|has|had)').first(); //.first();
  if (modal.found) {
    let index = modal.list[0].index();
    return ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
  }

  //is not
  let copula = ts.match('(#Copula|will|has|had)').first();
  if (copula.found) {
    let index = copula.list[0].index();
    return ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
  }

  //walked -> did not walk
  let past = ts.match('#PastTense').last();
  if (past.found) {
    let vb = past.list[0];
    let index = vb.index();
    vb.terms[0].text = vb.terms[0].verb.infinitive();
    return ts.parentTerms.insertAt(index, 'did not', 'Verb');
  }

  //walks -> does not walk
  let pres = ts.match('#PresentTense').last();
  if (pres.found) {
    let vb = pres.list[0];
    let index = vb.index();
    vb.terms[0].text = vb.terms[0].verb.infinitive();
    return ts.parentTerms.insertAt(index, 'does not', 'Verb');
  }

  //not walking
  let gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    let index = gerund.list[0].index();
    return ts.parentTerms.insertAt(index, 'not', 'Verb');
  }

  //walk -> do not walk
  let vb = ts.match('#Verb').last();
  if (vb.found) {
    vb = vb.list[0];
    let index = vb.index();
    vb.terms[0].text = vb.terms[0].verb.infinitive();
    if (plural) {
      return ts.parentTerms.insertAt(index, 'does not', 'Verb');
    }
    return ts.parentTerms.insertAt(index, 'did not', 'Verb');
  }

  return ts;
};
module.exports = toNegative;
