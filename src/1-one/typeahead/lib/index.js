import allPrefixes from './allPrefixes.js'

import isObject from '../../../API/_is.js'

const defaults = {
  safe: true,
  min: 3,
}

const prepare = function (words = [], opts = {}) {
  const model = this.model()
  opts = { ...defaults, ...opts }
  if (isObject(words)) {
    Object.assign(model.one.lexicon, words)
    words = Object.keys(words)
  }
  const prefixes = allPrefixes(words, opts, this.world())
  // manually combine these with any existing prefixes
  Object.keys(prefixes).forEach(str => {
    // explode any overlaps
    if (Object.hasOwn(model.one.typeahead, str)) {
      delete model.one.typeahead[str]
      return
    }
    model.one.typeahead[str] = prefixes[str]
  })
  return this
}

export default {
  typeahead: prepare
}