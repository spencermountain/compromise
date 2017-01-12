var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
} else {
  nlp = window.nlp;
  alert('browser');
}
// var nlp = require('../../builds/compromise');
// var nlp = require('../../builds/compromise.min');

module.exports = nlp;
