'use strict';
//a lexicon is a giant object of known words

const data = require('./data');
const fns = require('./fns');
const addArr = fns.addArr;
const addObj = fns.extendObj;

let lexicon = {};


// addArr(data.orgs.organizations, 'Organization');
// addArr(data.orgs.suffixes, 'Noun');



module.exports = lexicon;

console.log(Object.keys(data));
console.log(data);
