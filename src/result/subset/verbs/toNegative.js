'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun
const toNegative = (ts) => {
  //is not
  let copula = ts.match('#Copula');
  if (copula.found) {
    copula.insertAfter('not');
    return ts;
  }
  //would not walk
  let modal = ts.match('#Auxillary').first();
  if (modal.found) {
    modal.insertAfter('not');
    return ts;
  }
  //not walking
  let gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    gerund.insertBefore('not');
    return ts;
  }
  //didn't/doesn't walk
  let vb = ts.match('(#PresentTense|#Infinitive)').first();
  if (vb.found) {
    vb.insertBefore('did not'); //sentences.toNegative() does this better
    return ts;
  }

  return ts;
};
module.exports = toNegative;
