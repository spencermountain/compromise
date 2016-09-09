'use strict';
const parseUrl = require('./parseUrl');
const info = {
  parseurl: (t) => {
    return parseUrl(t.text);
  }
};
module.exports = info;
