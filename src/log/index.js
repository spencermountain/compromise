'use strict';
const fns = require('../fns');
let enable = false;

module.exports = {
  enable: (str) => {
    if (str === undefined) {
      str = true;
    }
    enable = str;
  },
  here: (path) => {
    if (enable === true || enable === path) {
      console.log('  ' + path);
    }
  },
  tell: (str, path) => {
    if (enable === true || enable === path) {
      if (typeof str === 'object') {
        str = JSON.stringify(str);
      }
      str = '    ' + str;
      console.log(str);
    }
  },
  tagAs: (t, pos, reason) => {
    if (enable === true || enable === 'tagger') {
      let title = t.normal || '[' + t.silent_term + ']';
      title = fns.yellow(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + fns.printTag(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + fns.cyan(reason || '') + ')');
    }
  }
};
