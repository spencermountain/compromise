const jsonDefaults = { text: true, terms: true, trim: true }

// get all character startings in doc
const termOffsets = function(doc) {
  let elapsed = 0
  let index = 0
  let offsets = {}
  doc.termList().forEach(term => {
    offsets[term.id] = {
      index: index,
      start: elapsed + term.pre.length,
      length: term.text.length,
    }
    elapsed += term.pre.length + term.text.length + term.post.length
    index += 1
  })
  return offsets
}

/** pull out desired metadata from the document */
exports.json = function(options = {}) {
  //support json(3) format
  if (typeof options === 'number' && this.list[options]) {
    return this.list[options].json(jsonDefaults)
  }
  options = Object.assign({}, jsonDefaults, options)

  // cache roots, if necessary
  if (options === 'root' || (typeof options === 'object' && options.root)) {
    this.list.forEach(p => {
      p.terms().forEach(t => {
        if (t.root === null) {
          t.setRoot(this.world)
        }
      })
    })
  }

  if (options.unique) {
    options.reduced = true
  }
  if (options.offset) {
    options.terms = options.terms || {}
    options.terms.offset = true
  }
  if (options.index || options.terms.index) {
    options.terms = options.terms === true ? {} : options.terms
    options.terms.id = true
  }
  let result = this.list.map(p => {
    return p.json(options, this.world)
  })
  // add offset and index data for each term
  if (options.terms.offset || options.offset || options.terms.index || options.index) {
    // calculate them, (from beginning of doc)
    let offsets = termOffsets(this.all())
    // add index values
    if (options.terms.index || options.index) {
      result.forEach(o => {
        o.terms.forEach(t => {
          t.index = offsets[t.id].index
        })
        o.index = o.terms[0].index
      })
    }
    // add offset values
    if (options.terms.offset || options.offset) {
      result.forEach(o => {
        o.terms.forEach(t => {
          t.offset = offsets[t.id] || {}
        })
        let len = o.terms.reduce((n, t) => {
          n += t.offset.length || 0
          return n
        }, 0)
        o.offset = o.terms[0].offset
        o.offset.length = len
      })
    }
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
