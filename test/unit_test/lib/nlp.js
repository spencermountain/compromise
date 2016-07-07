var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
} else {
  nlp = window.nlp_compromise;
  alert('browser');
}
// var nlp = require('../../builds/nlp_compromise');
// var nlp = require('../../builds/nlp_compromise.min');

module.exports = nlp;
