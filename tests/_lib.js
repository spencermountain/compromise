const plugins = ['entities', 'ngrams', 'nouns', 'numbers', 'sentences', 'syllables', 'verbs']

if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    nlp = require('../builds/compromise')
    plugins.forEach(name => {
      nlp.extend(require(`../plugins/${name}`))
    })
  } else {
    nlp = require('../src')
    plugins.forEach(name => {
      nlp.extend(require(`../plugins/${name}/src/index.js`))
    })
  }

  module.exports = nlp
}
