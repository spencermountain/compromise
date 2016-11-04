'use strict';
const toAdjective = require('./to_adjective');
const adverb = {
  adjectiveForm: function() {
    return toAdjective(this.normal);
  },
};
module.exports = adverb;
