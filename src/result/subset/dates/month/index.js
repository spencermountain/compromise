'use strict';
const data = require('./data');
const shortMonths = data.shortMonths;
const longMonths = data.longMonths;

module.exports = {
  index: function (t) {
    if (t.tag.Month) {
      if (longMonths[t.normal] !== undefined) {
        return longMonths[t.normal];
      }
      if (shortMonths[t.normal] !== undefined) {
        return shortMonths[t.normal];
      }
    }
    return null;
  },
  toShortForm: function (t) {
    if (t.tag.Month !== undefined) {
      if (longMonths[t.normal] !== undefined) {
        let shorten = Object.keys(shortMonths);
        t.text = shorten[longMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  },
  toLongForm: function (t) {
    if (t.tag.Month !== undefined) {
      if (shortMonths[t.normal] !== undefined) {
        let longer = Object.keys(longMonths);
        t.text = longer[shortMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  }

};
