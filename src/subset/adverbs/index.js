'use strict';
const Text = require('../../text');
const toAdjective = require('./toAdjective');

//the () subset class

const methods = {
  data: function() {
    return this.terms().list.map(ts => {
      let t = ts.terms[0];
      return {
        adjectiveForm: toAdjective(t.normal),
        normal: t.normal,
        text: t.text
      };
    });
  }
};

const find = function(r, n) {
  r = r.splitAfter('#Comma');
  r = r.match('#Adverb+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
