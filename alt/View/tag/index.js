/* eslint no-console: 0 */

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const fns = {
  /** add a given tag, to all these terms */
  tag: function (input, reason = '', isSafe) {
    if (!this.found || !input) {
      return this
    }
    let terms = this.termList()
    if (terms.length === 0) {
      return this
    }
    const { methods, verbose, model } = this
    // logger
    if (verbose === true) {
      console.log(' +  ', input, reason || '')
    }
    let tagSet = model.tags
    if (isArray(input)) {
      input.forEach(tag => methods.setTag(terms, tag, tagSet, isSafe))
    } else {
      methods.setTag(terms, input, tagSet, isSafe)
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
    const { methods, verbose, model } = this
    // logger
    if (verbose === true) {
      console.log(' -  ', input, reason || '')
    }
    let tagSet = model.tags
    if (isArray(input)) {
      input.forEach(tag => methods.unTag(terms, tag, tagSet))
    } else {
      methods.unTag(terms, input, tagSet)
    }
    return this
  },

  /** return only the terms that can be this tag  */
  // canBe: function (tag) {
  //   let pointers = []
  //   return this
  // },
}
module.exports = fns
