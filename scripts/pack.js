'use strict';
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var nlpPlugin = require('compromise-plugin');
var fileSize = require('./lib/filesize');

console.log(chalk.yellow('\n 🕑 packing lexicon..'));
var out = path.join(__dirname, '../src/world/_data.js');
//cleanup. remove old builds
// exec('rm ' + out);

//pack it into one string
var data = require('../data');
var pckd = nlpPlugin.pack(data);

fs.writeFileSync(out, 'module.exports=`' + pckd + '`', 'utf8');

// console.log(chalk.blue('\n\n      ' + Object.keys(data.words).length + ' words'));
console.log(chalk.blue('       - packed into -    ' + fileSize(out) + 'k\n'));
console.log(chalk.green('  done!\n'));
