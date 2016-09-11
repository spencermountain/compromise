'use strict';
const genericMethods = require('./generic');
const valueMethods = require('./value');
const prettyPrint = require('./prettyPrint');

const methods = {
  generic: require('./generic'),
  value: require('./value'),
  prettyPrint: require('./prettyPrint')
};

module.exports = methods;
