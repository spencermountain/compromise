/* eslint no-console: 0 */
const setTag = require('./setTag')
const unTag = require('./unTag')

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const methods = {
  /** add a given tag, to all these terms */
  tag: function (input, reason = '', isSafe) {
    if (!this.found || !input) {
      return this
    }
    let terms = this.termList()
    if (terms.length === 0) {
      return this
    }
    // logger
    if (this.verbose === true) {
      console.log(' +  ', input, reason || '')
    }
    let tagSet = this.model.tags
    if (isArray(input)) {
      input.forEach(tag => setTag(terms, tag, tagSet, isSafe))
    } else {
      setTag(terms, input, tagSet, isSafe)
    }
    return this
  },

  /** add a given tag, only if it is consistent */
  tagSafe: function (input, reason = '') {
    return this.tag(input, reason, true)
  },

  /** remove a given tag from all these terms */
  unTag: function (input, reason) {
    if (!this.found || !input) {
      return this
    }
    let terms = this.termList()
    if (terms.length === 0) {
      return this
    }
    // logger
    if (this.verbose === true) {
      console.log(' -  ', input, reason || '')
    }
    let tagSet = this.model.tags
    if (isArray(input)) {
      input.forEach(tag => unTag(terms, tag, tagSet))
    } else {
      unTag(terms, input, tagSet)
    }
    return this
  },

  /** return only the terms that can be this tag  */
  // canBe: function (tag) {
  //   let pointers = []
  //   return this
  // },
}
module.exports = methods
