const tryPrefix = require('./tryPrefix')
const getPrefixes = require('./getPrefixes')

const isObject = function (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

const defaults = {
  safe: true,
  min: 3,
}

/** add words that can be predicted from their prefix */
const typeahead = function (arr = [], opts = {}) {
  let lex = {}
  opts = Object.assign({}, defaults, opts)
  // wiggle-out our params
  if (isObject(arr)) {
    lex = arr
    arr = Object.keys(lex)
  }
  // pre-compute all prefixes
  let prefixes = getPrefixes(arr, opts, this.world)
  console.log(prefixes)
  // each keypress, try the end
  tryPrefix(this.doc, lex)
}

//assume the typeahead as a full-word
const autoFill = function () {
  this.docs.forEach(terms => {
    terms.forEach(term => {
      if (term.typeAhead === true && term.implicit) {
        term.set(term.implicit)
        term.implicit = null
        term.typeAhead = undefined
      }
    })
  })
  return this
}

const plugin = {
  api: {
    autoFill,
    autofill: autoFill,
  },
  compute: { typeahead },
  model: {
    one: {
      typeahead: {}
    }
  }
}

module.exports = plugin
