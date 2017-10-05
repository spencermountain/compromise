// const addWords = require('./addWords');
// const fns = require('../fns');
let data = require('./_data');
let tagset = require('../tagset');
let unpack = require('./unpack');

//lazier/faster object-merge
const extend = (main, obj) => {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    main[keys[i]] = obj[keys[i]];
  }
};

//class World{}
let World = function() {
  this.words = {};
  this.firstWords = {};
  this.tagset = tagset;
  this.regex = {};
  this.patterns = {};
  this.conjugations = {};
  this.plurals = {};
};

//add all the things, in all the places
World.prototype.plugin = function(obj) {
  obj = unpack(obj);
  Object.keys(obj).forEach((k) => {
    extend(this[k], obj[k]);
  });
};


let w = new World();
w.plugin(data);
module.exports = w;
