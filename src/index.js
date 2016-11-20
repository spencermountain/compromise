'use strict';

const buildResult = require('./result/build');
const pkg = require('../package.json');

const nlp = function (str, context) {
  return buildResult(str, context);
};
nlp.version = pkg.version;

module.exports = nlp;
