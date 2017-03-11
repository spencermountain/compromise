'use strict';
const unpack = require('./efrt-unpack');
let path = './_packed/';
const files = {
  adjectives: require(path + '_adjectives'),
  superlatives: require(path + '_superlatives'),
};

Object.keys(files).forEach((k) => {
  files[k] = unpack(files[k]);
});

module.exports = unpack;
// console.log(files.adjectives.has('aloof'));
