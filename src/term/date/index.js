'use strict';

const longMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]
const shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'nov',
  'dec',
]
const longDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
const shortDays = [
  'mon',
  'tues',
  'wed',
  'thurs',
  'fri',
  'sat',
  'sun',
]

module.exports = {

  toShortForm: function () {
    if (this.tag.Month) {
      let index = longMonths.indexOf(this.normal)
      if (index !== -1 && shortMonths[index]) {
        this.text = shortMonths[index]
      }
    }
    if (this.tag.WeekDay) {
      let index = longDays.indexOf(this.normal)
      if (index !== -1 && shortDays[index]) {
        this.text = shortDays[index]
      }
    }
    return this
  },

  toLongForm: function () {
    if (this.tag.Month) {
      let index = shortMonths.indexOf(this.normal)
      if (index !== -1 && longMonths[index]) {
        this.text = longMonths[index]
      }
    }
    if (this.tag.WeekDay) {
      let index = shortDays.indexOf(this.normal)
      if (index !== -1 && longDays[index]) {
        this.text = longDays[index]
      }
    }
    return this
  },


}
