'use strict';
const genericMethods = require('./generic');
const valueMethods = require('./value');

const methods = {
  value: require('./value'),
  generic: require('./generic'),
};

module.exports = methods;
