//fancy combining/chunking of terms
'use strict';
const pos = require('./pos');

const lump = function(a, b, tag) {
  let c = pos.classMapping[tag] || pos.Term;
  let t = new c(a.text + ' ' + b.text);
  t.reason = 'lumped(' + t.reason + ')';
  return t;
};


const fancy_lumping = function(terms) {
  for(var i = 1; i < terms.length; i++) {
    let a = terms[i - 1];
    let b = terms[i];

    //John Foobar
    if (a.tag === 'Person' && b.is_capital()) {
      terms[i] = lump(a, b, 'Person');
      terms[i - 1] = null;
      continue;
    }

    console.log(a.tag + '    ' + b.tag);
  }
  //remove killed terms
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};


module.exports = fancy_lumping;
