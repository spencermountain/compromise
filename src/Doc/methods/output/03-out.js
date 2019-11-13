const debug = require('../_debug')

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
  if (method === 'offset' || method === 'offsets') {
    return this.json({ offset: true })
  }
  if (method === 'array') {
    return this.json({ terms: false }).map(obj => obj.text)
  }
  if (method === 'freq') {
    return this.json({ count: true, terms: false, reduced: true })
  }
  if (method === 'terms') {
    let list = []
    this.json({ text: false, terms: { text: true } }).forEach(obj => {
      let terms = obj.terms.map(t => t.text)
      terms = terms.filter(t => t)
      list = list.concat(terms)
    })
    return list
  }
  if (method === 'debug') {
    debug(this)
    return this
  }
  return this.text()
}
