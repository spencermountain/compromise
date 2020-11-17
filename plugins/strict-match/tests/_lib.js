if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === "prod") {
    nlp = require("../../../")
    nlp.extend(require(`../`).plugin)
  } else {
    nlp = require("../../../src")
    nlp.extend(require(`../src`).plugin)
  }

  module.exports = nlp
}
