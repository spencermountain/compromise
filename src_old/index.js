'use strict';

const Text = require('./text/text');

const nlp = function(str, context) {
  return new Text(str, context);
};

module.exports = nlp;
