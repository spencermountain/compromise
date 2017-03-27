var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
// nlp = require('../../../builds/compromise');
// nlp = require('../../../builds/compromise.min');
} else {
  nlp = window.nlp;
  alert('browser');
}

module.exports = nlp;
