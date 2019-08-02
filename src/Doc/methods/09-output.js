const debug = require('./_debug')
const jsonDefaults = { text: true, terms: { text: true, tags: true, whitespace: true, implicit: true } }

/** return the document as text */
exports.text = function(options = {}) {
  if (typeof options === 'string') {
    if (options === 'normal') {
      options = {
        punctuation: true,
        whitespace: true,
        unicode: true,
      }
    }
    options = {}
  }
  return this.list.reduce((str, p) => str + p.text(options), '')
}

/** pull out desired metadata from the document */
exports.json = function(options = {}) {
  //support json(3) format
  if (typeof options === 'number') {
    return this.list[options].json(jsonDefaults)
  }
  options = Object.assign({}, jsonDefaults, options)
  return this.list.map(p => p.json(options))
}

/** pretty-print the current document and its tags */
exports.debug = function() {
  debug(this)
  return this
}

/** some named output formats */
exports.out = function(method) {
  if (method === 'text') {
    return this.text()
  }
  if (method === 'normal') {
    return this.text('normal')
  }
  if (method === 'json') {
    return this.json()
  }
  if (method === 'array') {
    return this.json({ text: true, terms: false }).map(obj => obj.text)
  }
  if (method === 'debug') {
    debug(this)
    return this
  }
  return this.text()
}

//aliases
exports.data = exports.json
