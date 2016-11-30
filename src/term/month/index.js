'use strict';
const data = require('./data');
const shortMonths = data.shortMonths
const longMonths = data.longMonths

module.exports = {
  index: function () {
    if (this.tag.Month) {
      if (longMonths[this.normal] !== undefined) {
        return longMonths[this.normal]
      }
      if (shortMonths[this.normal] !== undefined) {
        return shortMonths[this.normal]
      }
    }
    return null
  },
  toShortForm: function () {
    if (this.tag.Month !== undefined) {
      if (longMonths[this.normal] !== undefined) {
        let shorten = Object.keys(shortMonths)
        this.text = shorten[longMonths[this.normal]]
      }
    }
    return this
  },
  toLongForm: function () {
    if (this.tag.Month !== undefined) {
      if (shortMonths[this.normal] !== undefined) {
        let longer = Object.keys(longMonths)
        this.text = longer[shortMonths[this.normal]]
      }
    }
    return this
  }

}
