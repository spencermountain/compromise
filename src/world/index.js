const addWords = require('./addWords');
const addRegex = require('./addRegex');
const addTags = require('./addTags');
const addPlurals = require('./addPlurals');
const fns = require('../fns');
let lexicon = require('../lexicon/init');
let tagset = require('../tagset');
let regex = require('./rules');
let plurals = require('../lexicon/uncompressed/irregularPlurals').toPlural;

//'class World{}'
let World = function() {
  this.words = lexicon.lexicon;
  this.firstWords = lexicon.firstWords;
  this.tagset = tagset;
  this.regex = regex;

  this.conjugations = {};
  this.plurals = plurals;
};

World.prototype.addWords = addWords;
World.prototype.addRegex = addRegex;
World.prototype.addTags = addTags;
World.prototype.addPlurals = addPlurals;

World.prototype.clone = function() {
  let w2 = new World();
  w2.words = fns.copy(this.lexicon);
  w2.firstWords = fns.copy(this.firstWords);
  w2.tagset = fns.copy(this.tagset);
  return w2;
};

//add all the things, in all the places
World.prototype.plugin = function(obj) {
  if (obj.words) {
    this.addWords(obj.words);
  }
  if (obj.tags) {
    this.addTags(obj.tags);
  }
  if (obj.regex) {
    this.addRegex(obj.regex);
  }
  if (obj.plurals) {
    this.addPlurals(obj.plurals);
  }
};
module.exports = World;
