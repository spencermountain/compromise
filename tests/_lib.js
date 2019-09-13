const addPlugins = function(nlp) {
  let names = ['nouns', 'numbers', 'sentences', 'verbs']
  names.forEach(name => {
    nlp.extend(require(`../plugins/${name}/src/index.js`))
  })
}

if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    // module.exports = require('../../builds/efrt');
    nlp = require('../builds/compromise')
  } else {
    nlp = require('../src')
  }
  addPlugins(nlp)
  module.exports = nlp
}
