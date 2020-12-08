const makeNumber = require('../numbers/convert/makeNumber')
const parseMoney = require('./parse')

module.exports = {
  // /** split-apart suffix and number */
  // normalize: function () {
  //   this.forEach((val) => {
  //     let obj = parseNumber(val)
  //     if (obj.num !== null && obj.suffix) {
  //       let prefix = obj.prefix || ''
  //       val = val.replaceWith(prefix + obj.num + ' ' + obj.suffix)
  //       return
  //     }
  //   })
  //   return this
  // },

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
      let obj = parseMoney(doc)
      json.prefix = obj.prefix
      json.number = obj.num
      json.suffix = obj.suffix
      json.textCardinal = makeNumber(obj, true, false)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
}
