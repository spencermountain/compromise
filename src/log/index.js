'use strict';
const fns = require('./fns');
const chalk = require('chalk');
const pretty_print = require('./pretty_print');

let disable = false;

//dummy function
let dummy = {
  here: function() {},
  change: function() {},
  show: function() {},
  tag: function() {},
  pos: function() {},
  disable: function() {
    disable = true;
  }
};

const shouldPrint = (path) => {
  if (disable) {
    return false;
  }
  let arg = process.argv[2];
  let toPrint = arg.replace(/^--debug=?/, '') || '*';
  if (toPrint === '*' || toPrint === '') {
    return true;
  }
  if (path.indexOf(toPrint) === 0) {
    return true;
  }
  return false;
};

const serverOutput = {
  here: function(path) {
    if (shouldPrint(path)) {
      let indent = fns.findIndent(path) || '';
      console.log(fns.makePath(path, indent));
    }
  },
  warn: function(input, path) {
    if (shouldPrint(path)) {
      console.log('   ' + chalk.red('---' + input));
    }
  },
  change: function(input, path) {
    if (shouldPrint(path)) {
      let indent = fns.findIndent(path) || '';
      console.log(indent + '   ' + chalk.green(input));
    }
  },
  tag: function(t, pos, reason, path) {
    if (shouldPrint(path)) {
      let indent = fns.findIndent(path) || '';
      console.log(indent + '     ' + chalk.green(t.normal) + ' -> ' + chalk.red(pos) + '    (' + reason + ')');
    }
  },
  show: function(input, path) {
    if (shouldPrint(path)) {
      pretty_print(input, path);
    }
  },
  disable: function() {
    disable = true;
  },
  pos: function(tag) {
    const known = {
      Noun: (s) => chalk.green(s),
      Person: (s) => chalk.bgGreen(s),
      Verb: (s) => chalk.red(s),
      Adjective: (s) => chalk.cyan(s),
      Adverb: (s) => chalk.yellow(s),
      Determiner: (s) => chalk.grey(s)
    }
    if (known[tag]) {
      return known[tag](tag)
    }
    return tag
  }
};

//figure out if it should print anything, first
const log = (() => {
  if (!process || !process.argv || !process.argv[2]) {
    return dummy;
  }
  let arg = process.argv[2];
  if (!arg.match(/^--debug/)) {
    return dummy;
  }
  return serverOutput;
})();

module.exports = log;
