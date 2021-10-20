if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    nlp = require('../../../')
    nlp.extend(require(`../`))
    nlp.extend(require(`../../numbers/`))
  } else {
    nlp = require('../../../src')
    nlp.extend(require(`../src`))
    nlp.extend(require(`../../numbers/src`))
  }

  module.exports = nlp
}
