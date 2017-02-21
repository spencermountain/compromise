var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
// nlp = require('../../../builds/compromise');
} else {
  nlp = window.nlp;
  alert('browser');
}
// var nlp = require('../../builds/compromise');
// var nlp = require('../../builds/compromise.min');

module.exports = nlp;
