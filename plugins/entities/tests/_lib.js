//load compromise and extend it with the plugin
if (typeof process !== undefined && typeof module !== undefined) {
  // const nlp = require('compromise')
  const nlp = require('../../../builds/compromise')
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    nlp.extend(require('../builds/compromise-entities'))
  } else {
    nlp.extend(require('../src'))
  }
  module.exports = nlp
}
