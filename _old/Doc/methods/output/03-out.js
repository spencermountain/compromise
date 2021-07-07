const debug = require('./_debug')
const topk = require('./_topk')

/** pretty-print the current document and its tags */
exports.debug = function () {
  debug(this)
  return this
}

/** some named output formats */
exports.out = function (method) {
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
    return this.json({ terms: false })
      .map(obj => obj.text)
      .filter(str => str)
  }
  if (method === 'freq' || method === 'frequency') {
    return topk(this)
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
  if (method === 'tags') {
    return this.list.map(p => {
      return p.terms().reduce((h, t) => {
        h[t.clean || t.implicit] = Object.keys(t.tags)
        return h
      }, {})
    })
  }
  if (method === 'debug') {
    debug(this)
    return this
  }
  return this.text()
}
