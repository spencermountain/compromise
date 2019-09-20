//load compromise and extend it with the plugin
if (typeof process !== undefined && typeof module !== undefined) {
  // const nlp = require('compromise')
  let nlp = require('../../../src')
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    nlp = require('../../../builds/compromise')
    nlp.extend(require('../builds/compromise-syllables'))
  } else {
    nlp.extend(require('../src'))
  }
  module.exports = nlp
}
