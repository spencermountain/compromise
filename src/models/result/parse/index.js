'use strict';
//
const methods = {
  numbers: (m) => {
    return m.match('#Value').clone().toNumber().render('array').map((str) => {
      return parseInt(str, 10);
    });
  },
  people: (m) => {
    return m.match('#Person+').render('array');
  },
  places: (m) => {
    return m.match('#Place+').render('array');
  },
  organizations: (m) => {
    return m.match('#Organization+').render('array');
  },
  conjugations: (m) => {
    m = m.clone();
    let original = m;
    let vbs = m.match('#VerbPhrase+');
    let main = vbs.match('!#Auxillary').match('!#Negative').match('!#Particle');
    let t = main.list[0].terms[0];
    let conj = t.verb.conjugations();
    let obj = {};
    Object.keys(conj).forEach((k) => {
      if (conj[k]) {
        vbs = vbs.replace(conj[k] || '');
        obj[k] = original.plaintext();
      }
    });
    return obj;
  }
};

const parse = function(obj) {
  let result = this;
  let all = {};
  obj = obj || methods;
  Object.keys(obj).forEach((k) => {
    if (obj[k] && methods[k]) {
      all[k] = methods[k](result);
    }
  });
  return all;
};

module.exports = parse;
