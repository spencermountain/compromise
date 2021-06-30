// sort words by frequency
const topk = function (view) {
  let obj = {}
  view.docs.forEach(o => {
    if (!obj[o.normal]) {
      o.count = 0
      obj[o.normal] = o
    }
    obj[o.normal].count += 1
  })
  let arr = Object.keys(obj).map(k => obj[k])
  // sort them
  arr.sort((a, b) => (a.count > b.count ? -1 : 1))
  return arr
}
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
    return this.json({ offset: true })
  }
  if (method === 'array') {
    return this.docs.map(terms => terms.map(t => t.text))
  }
  if (method === 'freq' || method === 'frequency') {
    return topk(this)
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
        h[t.normal || t.implicit] = Object.keys(t.tags)
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
