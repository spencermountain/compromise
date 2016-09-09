'use strict';
const chalk = require('chalk');
const fns = require('../fns');

let enable = false;

module.exports = {
  enable: (str) => {
    enable = str || true;
  },
  here: (path) => {
    if (enable === true || enable === path) {
      console.log('  ' + chalk.yellow(chalk.underline(path)));
    }
  },
  tell: (str, path) => {
    if (enable === true || enable === path) {
      str = '    ' + chalk.magenta(str);
      console.log(str);
    }
  },
  tagAs: (t, pos, reason) => {
    if (enable === true || enable === 'tagger') {
      let title = t.normal || '[' + t.silent_term + ']';
      title = chalk.green(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + chalk.red(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + reason + ')');
    }
  },
  match: (t, reason) => {
    console.log('       ' + chalk.green('-match-') + '  \'' + chalk.red(t.normal) + '\'  -  ' + reason);
  },
  noMatch(t) {
    console.log('               ' + chalk.magenta('-die \'' + t.normal + '\''));
  }
};
