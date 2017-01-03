'use strict';
//find contractable, expanded-contractions
const find = (r) => {
  // r.check();
  let m = r.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)');
  m.concat(r.match('(they|we|you|i) have'));
  m.concat(r.match('i am'));
  m.concat(r.match('(#Copula|#Modal|do) not'));
  m.not('#Contraction');
  m.list.forEach((ts) => {
    ts.expanded = true;
  });
  return m;
};
module.exports = find;
