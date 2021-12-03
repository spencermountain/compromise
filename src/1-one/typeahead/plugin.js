import compute from './compute.js'
import allPrefixes from './allPrefixes.js'

const defaults = {
  safe: true,
  min: 3,
}

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const autoFill = function () {
  this.docs.forEach(terms => {
    terms.forEach(term => {
      if (term.typeahead === true && term.machine) {
        term.text = term.machine
        term.normal = term.machine
      }
    })
  })
  return this
}

const prepare = function (words = [], opts = {}) {
  let model = this.model()
  opts = Object.assign({}, defaults, opts)
  if (isObject(words)) {
    Object.assign(model.two.lexicon, words)
    words = Object.keys(words)
  }
  let prefixes = allPrefixes(words, opts, this.world())
  model.one.typeahead = prefixes
  return this
}

export default {
  model: {
    one: {
      typeahead: {}
    }
  },
  api: function (View) {
    View.prototype.autoFill = autoFill
  },
  lib: {
    typeAhead: prepare,
    typeahead: prepare
  },
  compute: { typeahead: compute },
  hooks: ['typeahead']
}

