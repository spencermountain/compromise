'use strict';
const assign = require('../assign');

//clear-up ambiguous interjections "ok"[Int], "thats ok"[Adj]
const interjection_fixes = function(terms) {
  const interjections = {
    ok: true,
    so: true,
    please: true,
    alright: true,
    well: true,
    now: true
  };
  for(let i = 0; i < terms.length; i++) {
    if (i > 3) {
      break;
    }
    if (interjections[terms[i].normal]) {
      terms[i] = assign(terms[i], 'Expression', 'interjection_fixes');
    } else {
      break;
    }
  }
  return terms;
};

module.exports = interjection_fixes;
