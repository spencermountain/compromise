'use strict';
const chalk = require('chalk');

const render = {
  /** a nicer console.log version */
  pretty: (s) => {
    s._terms.forEach((t) => {
      t.render('pretty');
    });
    console.log(chalk.cyan('            ---'));
  }
};
module.exports = render;
