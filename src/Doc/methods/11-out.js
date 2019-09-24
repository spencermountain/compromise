const debug = require('./_debug')

/** return the document as text */
exports.text = function(options = {}) {
  //are we showing every phrase?
  let showFull = false
  if (this.parents().length === 0) {
    showFull = true
  }
  return this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0
    const trimPost = !showFull && i === this.list.length - 1
    return str + p.text(options, trimPre, trimPost)
  }, '')
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
    return this.json({ terms: false }).map(obj => obj.text)
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
