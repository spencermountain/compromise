'use strict';

const irregular = {
  will: 'won\'t',
  can: 'can\'t'
};
const contractable = {
  can: true,
  have: true,
  had: true,
  do: true,
  did: true
};

//turn 'have not' into 'haven't', etc.
const contract = function(t) {
  let after = t.next();
  //not -> n't contractions
  if (after && after.normal === 'not') {
    //try an irregular form
    if (irregular[t.normal]) {
      t.silent_term = t.text;
      t.text = irregular[t.normal];
      after.silent_term = after.text;
      after.text = '';
      return t;
    }
    //try a standard n't rule
    if (t.tag.Modal || t.tag.Copula || contractable[t.normal]) {
      t.silent_term = t.text;
      t.text = t.text + 'n\'t';
      after.silent_term = after.text;
      after.text = '';
      return t;
    }
  }
  return t;
};

module.exports = contract;
