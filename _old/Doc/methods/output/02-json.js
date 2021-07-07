const offsets = require('./_offset')
const jsonDefaults = { text: true, terms: true, trim: true }

//some options have dependents
const setOptions = function (options) {
  options = Object.assign({}, jsonDefaults, options)

  if (options.unique) {
    options.reduced = true
  }
  //offset calculation requires these options to be on
  if (options.offset) {
    options.text = true
    if (!options.terms || options.terms === true) {
      options.terms = {}
    }
    options.terms.offset = true
  }
  if (options.index || options.terms.index) {
    options.terms = options.terms === true ? {} : options.terms
    options.terms.id = true
  }
  return options
}

/** pull out desired metadata from the document */
exports.json = function (options = {}) {
  //support json(3) format
  if (typeof options === 'number' && this.list[options]) {
    return this.list[options].json(jsonDefaults)
  }

  options = setOptions(options)

  // cache root strings beforehand, if necessary
  if (options.root === true) {
    this.list.forEach(p => {
      p.terms().forEach(t => {
        if (t.root === null) {
          t.setRoot(this.world)
        }
      })
    })
  }

  let result = this.list.map(p => {
    return p.json(options, this.world)
  })
  // add offset and index data for each term
  if (options.terms.offset || options.offset || options.terms.index || options.index) {
    offsets(this, result, options)
  }
  // add frequency #s
  if (options.frequency || options.freq || options.count) {
    let obj = {}
    this.list.forEach(p => {
      let str = p.text('reduced')
      obj[str] = obj[str] || 0
      obj[str] += 1
    })
    this.list.forEach((p, i) => {
      result[i].count = obj[p.text('reduced')]
    })
  }
  // remove duplicates
  if (options.unique) {
    let already = {}
    result = result.filter(o => {
      if (already[o.reduced] === true) {
        return false
      }
      already[o.reduced] = true
      return true
    })
  }
  return result
}

//aliases
exports.data = exports.json
