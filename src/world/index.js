const lexicon = require('../lexicon/init');
const tagset = require('../tagset');
const fns = require('../fns');
const addWords = require('./addWords');
const addRegex = require('./addRegex');
const addTags = require('./addTags');
const regex = require('./rules');

//'class World{}'
let World = function() {
  this.lexicon = lexicon.lexicon;
  this.firstWords = lexicon.firstWords;
  this.tagset = tagset;
  this.regex = regex;

  this.conjugations = {};
  this.inflections = {};
};

World.prototype.addWords = addWords;
World.prototype.addRegex = addRegex;
World.prototype.addTags = addTags;

World.prototype.clone = function() {
  let w2 = new World();
  w2.lexicon = fns.copy(this.lexicon);
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
};
module.exports = World;
