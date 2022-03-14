import debug from './debug/index.js'
import wrap from './wrap.js'


const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}


/** some named output formats */
const out = function (method) {
  // support custom outputs
  if (isObject(method)) {
    return wrap(this, method)
  }
  // text out formats
  if (method === 'text') {
    return this.text()
  }
  if (method === 'normal') {
    return this.text('normal')
  }
  if (method === 'machine' || method === 'reduced') {
    return this.text('machine')
  }

  // json data formats
  if (method === 'json') {
    return this.json()
  }
  if (method === 'offset' || method === 'offsets') {
    this.compute('offset')
    return this.json({ offset: true })
  }
  if (method === 'array') {
    let arr = this.docs.map(terms => {
      return terms
        .reduce((str, t) => {
          return str + t.pre + t.text + t.post
        }, '')
        .trim()
    })
    return arr.filter(str => str)
  }
  // return terms sorted by frequency
  if (method === 'freq' || method === 'frequency' || method === 'topk') {
    let terms = this.compute('freq').terms().unique().termList()
    return terms.sort((a, b) => (a.freq > b.freq ? -1 : 0))
  }

  // some handy ad-hoc outputs
  if (method === 'terms') {
    let list = []
    this.docs.forEach(s => {
      let terms = s.terms.map(t => t.text)
      terms = terms.filter(t => t)
      list = list.concat(terms)
    })
    return list
  }
  if (method === 'tags') {
    return this.docs.map(terms => {
      return terms.reduce((h, t) => {
        h[t.implicit || t.normal] = Array.from(t.tags)
        return h
      }, {})
    })
  }
  if (method === 'debug') {
    return this.debug() //allow
  }
  return this.text()
}

const methods = {
  /** */
  debug: debug,
  /** */
  out: out,
}

export default methods
