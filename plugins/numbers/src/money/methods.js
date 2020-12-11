const makeNumber = require('../numbers/convert/makeNumber')
const parseMoney = require('./parse')

const moneyMethods = {
  /** which currency is this money in? */
  currency: function (n) {
    let arr = []
    this.forEach((doc) => {
      let found = parseMoney(doc)
      if (found) {
        arr.push(found)
      }
    })
    if (typeof n === 'number') {
      return arr[n]
    }
    return arr
  },

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
      json.number = obj.num
      if (obj.iso) {
        json.currency = obj.iso.toUpperCase()
      }
      json.textCardinal = makeNumber(obj, true, false)
      res.push(json)
    })
    if (n !== null) {
      return res[n] || {}
    }
    return res
  },
}

module.exports = moneyMethods
