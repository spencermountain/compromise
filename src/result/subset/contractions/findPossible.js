'use strict';
//find contractable, expanded-contractions
const find = (r) => {
  let m = r.match('#Noun (is|are|will|would)');
  m.concat(r.match('(they|we) have'));
  m.concat(r.match('i am'));
  m.concat(r.match('(#Copula|#Modal|do) not'));
  m.not('#Contraction #Contraction');
  m.list.forEach((ts) => {
    ts.expanded = true;
  });
  return m;
};
module.exports = find;
