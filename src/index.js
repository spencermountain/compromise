'use strict';

const buildResult = require('./result/build');
const pkg = require('../package.json');

const nlp = function (str, context) {
  return buildResult(str, context);
};
nlp.version = pkg.version;

//export to window or a webworker
if (typeof window === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  const self = typeof self === 'undefined' ? this : self; // eslint-disable-line no-use-before-define
  self.nlp = nlp;
}
//export to amd
if (typeof define === 'function' && define.amd) {
  define(nlp);
}
//export to commonjs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = nlp;
}
