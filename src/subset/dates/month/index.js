'use strict';
const data = require('./data');
const shortMonths = data.shortMonths;
const longMonths = data.longMonths;
const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
module.exports = {
  index: function (t) {
    if (t.tags.Month) {
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
    if (t.tags.Month !== undefined) {
      if (longMonths[t.normal] !== undefined) {
        let shorten = Object.keys(shortMonths);
        let punct = t.getPunctuation() || '';
        t.text = shorten[longMonths[t.normal]] + punct;
        if (t.tags.TitleCase) {
          t.text = titleCase(t.text);
        }
      }
    }
    t.dirty = true;
    return t;
  },
  toLongForm: function (t) {
    if (t.tags.Month !== undefined) {
      if (shortMonths[t.normal] !== undefined) {
        let longer = Object.keys(longMonths);
        let punct = t.getPunctuation() || '';
        t.text = longer[shortMonths[t.normal]] + punct;
        if (t.tags.TitleCase) {
          t.text = titleCase(t.text);
        }
      }
    }
    t.dirty = true;
    return t;
  }

};
