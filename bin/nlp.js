#!/usr/bin/env node
'use strict';
var nlp = require('../index');

var method = process.argv[2];
var txt = process.argv.slice(3, process.argv.length).join(" ");
if(!nlp[method] || process.argv.length < 4){
   console.log('Usage: nlp pos Toronto is in Canada');
   process.exit(1);
}
console.log(nlp[method](txt));