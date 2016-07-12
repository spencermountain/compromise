'use strict';
const chalk = require('chalk');
const debug = function(str, bool) {
  if (bool) {
    console.log(chalk.green(str))
  }
}

module.exports = debug
