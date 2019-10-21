const jsonDefaults = { text: true, terms: true, trim: true }

// get all character startings in doc
const termOffsets = function(doc) {
  let elapsed = 0
  let offsets = {}
  doc.termList().forEach(term => {
    offsets[term.id] = {
      start: elapsed + term.pre.length,
      length: term.text.length,
    }
    elapsed += term.pre.length + term.text.length + term.post.length
  })
  return offsets
}

/** pull out desired metadata from the document */
exports.json = function(options = {}) {
  //support json(3) format
  if (typeof options === 'number') {
    return this.list[options].json(jsonDefaults)
  }
  options = Object.assign({}, jsonDefaults, options)
  if (options.offset) {
    options.terms = options.terms === true ? {} : options.terms
    options.terms.offset = true
  }
  let result = this.list.map(p => {
    return p.json(options, this.world)
  })
  // add offset data for each term
  if (options.terms.offset || options.offset) {
    let offsets = termOffsets(this.all())
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
  return result
}

//aliases
exports.data = exports.json
