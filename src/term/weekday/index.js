'use strict';
const data = require('./data');
const shortDays = data.shortDays
const longDays = data.longDays

module.exports = {
  index: function () {
    if (this.tag.WeekDay) {
      if (longDays[this.normal] !== undefined) {
        return longDays[this.normal]
      }
      if (shortDays[this.normal] !== undefined) {
        return shortDays[this.normal]
      }
    }
    return null
  },
  toShortForm: function () {
    if (this.tag.WeekDay) {
      if (longDays[this.normal] !== undefined) {
        let shorten = Object.keys(shortDays)
        this.text = shorten[longDays[this.normal]]
      }
    }
    return this
  },
  toLongForm: function () {
    if (this.tag.WeekDay) {
      if (shortDays[this.normal] !== undefined) {
        let longer = Object.keys(longDays)
        this.text = longer[shortDays[this.normal]]
      }
    }
    return this
  }
}
