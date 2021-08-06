/** some named output formats */
const out = function (method) {
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
    this.compute('offset')
    return this.json()
  }
  if (method === 'array') {
    return this.docs.map(terms => {
      return terms
        .reduce((str, t) => {
          return str + t.pre + t.text + t.post
        }, '')
        .trim()
    })
  }
  if (method === 'freq' || method === 'frequency') {
    this.compute('freq')
    return this.json()
  }
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
    return this.debug()
  }
  return this.text()
}
export default out
