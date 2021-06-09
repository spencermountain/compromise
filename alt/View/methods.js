const debug = require('./out/debug')

const methods = {
  /** return data */
  json: function () {
    return this.doc.map(terms => {
      return terms.map(t => {
        t.tags = Array.from(t.tags)
        return t
      })
    })
  },
  text: function () {
    return this.doc.reduce((txt, terms) => {
      terms.forEach(t => (txt += t.pre + t.text + t.post))
      return txt
    }, '')
  },
  fork: function () {
    this.document = JSON.parse(JSON.stringify(this.document))
    return this
  },
  debug: function () {
    return debug(this)
  },
}

module.exports = function (View) {
  Object.assign(View.prototype, methods)
}
