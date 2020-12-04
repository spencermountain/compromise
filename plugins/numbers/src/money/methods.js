const makeNumber = require('./numbers/convert/makeNumber')
const parseNumber = require('../numbers/parse')

module.exports = {
  /** overloaded json method with additional number information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach((doc) => {
      let json = doc.json(options)[0]
      let obj = parseNumber(doc)
      json.prefix = obj.prefix
      json.number = obj.num
      json.suffix = obj.suffix
      json.cardinal = makeNumber(obj, false, false)
      json.ordinal = makeNumber(obj, false, true)
      json.textCardinal = makeNumber(obj, true, false)
      json.textOrdinal = makeNumber(obj, true, true)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
}
