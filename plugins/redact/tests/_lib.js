if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    nlp = require('../../../')
    nlp.extend(require(`../../numbers/`))
    nlp.extend(require(`../../dates/`))
    nlp.extend(require(`../`))
  } else {
    nlp = require('../../../src')
    nlp.extend(require(`../../numbers/src`))
    nlp.extend(require(`../../dates/src`))
    nlp.extend(require(`../src`))
  }

  module.exports = nlp
}
