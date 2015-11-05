
'use strict';

// const places = require('../../data/places');

const is_date = function(str) {
  const months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i;
  const times = /1?[0-9]:[0-9]{2}/;
  const days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i;
  if (this.normal.match(months) || this.normal.match(times) || this.normal.match(days)) {
    return true;
  }
  return false;
};
