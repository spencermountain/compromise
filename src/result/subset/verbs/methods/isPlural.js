'use strict';
//sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
const isPlural = (vb) => {
  if (vb.match('(are|were|does)').found) {
    return true;
  }
  if (vb.match('(is|am|do|was)').found) {
    return false;
  }
  //infinitives are used only in plurals - XYZ look at the store
  // if (vb.match('#Infinitive').found) {
  //   return true;
  // }
  //consider its prior noun
  let noun = vb.getNoun();
  if (noun && noun.found) {
    if (noun.match('#Plural').found) {
      return true;
    }
    if (noun.match('#Singular').found) {
      return false;
    }
  }
  return null;
};
module.exports = isPlural;
