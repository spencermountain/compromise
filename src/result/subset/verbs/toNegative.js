'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun
const toNegative = (ts) => {
  //is not
  let copula = ts.match('#Copula');
  if (copula.found) {
    return copula.list[0].insertAfter('not');
  }
  //would not walk
  let modal = ts.match('#Auxillary'); //.first();
  if (modal.found) {
    modal.list[0].insertAfter('not');
    return ts;
  }
  //not walking
  let gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    return gerund.list[0].insertBefore('not');
  }
  //didn't/doesn't walk
  let vb = ts.match('(#PresentTense|#Infinitive)').first();
  if (vb.found) {
    return vb.list[0].insertBefore('did not'); //sentences.toNegative() does this better
  }

  return ts;
};
module.exports = toNegative;
