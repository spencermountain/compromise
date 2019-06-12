const debug = require('./debug')

// output
exports.text = function(options = {}) {
  return this.list.reduce((str, p) => str + p.out(options), '')
}
exports.normal = function(options = {}) {
  options.normal = true
  return this.list.map(p => p.out(options)).join(' ')
}
exports.json = function(options = {}) {
  return this.list.map(p => p.json(options))
}
exports.array = function(options = {}) {
  return this.list.map(p => p.out(options).trim())
}
exports.debug = function() {
  debug(this)
  return this
}
//in v7-style - doc.out('text')
exports.out = function(method) {
  if (method === 'text') {
    return this.text()
  }
  if (method === 'normal') {
    return this.normal()
  }
  if (method === 'json') {
    return this.json()
  }
  if (method === 'array') {
    return this.array()
  }
  if (method === 'debug') {
    debug(this)
    return this
  }
  return this.text()
}
