const chalk = require('chalk');
const enable = false;
module.exports = {
  enable: () => {
    enable = true;
  },
  here: () => {
  },
  show: () => {
  },
  tag: (t, pos, reason, path) => {
    if (true) {
      console.log('       ' + chalk.green(t.normal) + ' -> ' + chalk.red(pos) + '    (' + reason + ')');
    }
  },
  change: () => {
  }
};
