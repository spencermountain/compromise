'use strict';
const chalk = require('chalk');
const fns = require('../fns');

let enable = false;

module.exports = {
  enable: () => {
    enable = true;
  },
  here: (msg) => {
    if (enable) {
      console.log('  ' + chalk.yellow(chalk.underline(msg)));
    }
  },
  show: () => {
  },
  tag: (t, pos, reason, path) => {
    if (enable) {
      let title = t.normal || '[' + t.silent_term + ']';
      title = chalk.green(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + chalk.red(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + reason + ')');
    }
  },
  change: () => {
  }
};
