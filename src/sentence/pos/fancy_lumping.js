//fancy combining/chunking of terms
'use strict';
const pos = require('./pos');

const shouldLump = function(a, b) {
  const lump_rules = [
    {
      condition: (a.tag === 'Person' && b.tag === 'Honourific' || a.tag === 'Honourific' && b.tag === 'Person'), //"John sr."
      result: 'Person',
    },
    {
      condition: (a.tag === 'Person' && b.is_capital()), //'Person, Capital -> Person'
      result: 'Person',
    },
    {
      condition: (a.tag === 'Date' && b.tag === 'Value'), //June 4
      result: 'Date',
    },
    // {
    //   condition: (), //
    //   result: '',
    // },
    //


  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};


const lump = function(a, b, tag) {
  let c = pos.classMapping[tag] || pos.Term;
  let t = new c(a.text + ' ' + b.text, tag);
  t.reason = 'lumped(' + t.reason + ')';
  return t;
};

const fancy_lumping = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    let a = terms[i - 1];
    let b = terms[i];

    // Person, Capital -> "Person Capital"
    let l = shouldLump(a, b);
    if (l !== false) {
      terms[i] = lump(a, b, l);
      terms[i - 1] = null;
      continue;
    }

  }
  //remove killed terms
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};


module.exports = fancy_lumping;
