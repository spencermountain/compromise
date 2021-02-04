const pennTags = require('./tags')
const mapping = pennTags.reduce((h, a) => {
  h[a[0]] = a[1]
  return h
}, {})

const addMethods = function (Doc) {
  Doc.prototype.pennTags = function (opts = {}) {
    opts.terms = opts.terms || {}
    opts.terms.bestTag = true
    let json = this.json(opts)
    return json.map((obj) => {
      obj.terms = obj.terms.map((o) => {
        let penn = mapping[o.bestTag]
        if (!penn) {
          let found = o.tags.find((tag) => mapping[tag])
          penn = mapping[found]
        }
        return {
          text: o.text,
          penn: penn,
          tags: o.tags,
        }
      })
      return obj
    })
  }
}
module.exports = addMethods
