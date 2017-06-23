'use strict';
var efrt = require('efrt');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var fileSize = require('./lib/filesize');
require('shelljs/global');
config.silent = true;

console.log(chalk.yellow('\n 🕑 packing lexicon..'));
let out = path.join(__dirname, '../src/lexicon/_lexicon.js');
//cleanup. remove old builds
// exec('rm ' + out);

//pack it into one string
var lex = require('../src/lexicon/data');
var pckd = efrt.pack(lex);

fs.writeFileSync(out, 'module.exports=' + pckd, 'utf8');

console.log(chalk.blue('\n\n     lexicon is ' + fileSize(out) + 'k\n'));
console.log(chalk.green('  done!\n'));
