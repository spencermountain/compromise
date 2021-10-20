if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    nlp = require('../../../')
    nlp.extend(require(`../`))
  } else {
    nlp = require('../../../src')
    nlp.extend(require(`../src`))
  }

  module.exports = nlp
}
