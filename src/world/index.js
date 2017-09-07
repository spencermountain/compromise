const lexicon = require('../lexicon/init');
const tagset = require('../tagset');
const fns = require('../fns');
const addDownward = require('../tagset/addDownward');
const addWords = require('./addWords');
const addRegex = require('./addRegex');
const regex = require('./rules');

//'class World{}'
let World = function() {
  this.lexicon = lexicon.lexicon;
  this.firstWords = lexicon.firstWords;
  this.tagset = tagset;
  this.regex = regex;
};

World.prototype.addWords = addWords;
World.prototype.addRegex = addRegex;

World.prototype.addTags = function(tags) {
  Object.keys(tags || {}).forEach(k => {
    tags[k].isA = tags[k].isA || [];
    tags[k].notA = tags[k].notA || [];
    this.tagset[k] = tags[k];
  });
  addDownward(this.tagset);
};

World.prototype.clone = function() {
  let w2 = new World();
  w2.lexicon = fns.copy(this.lexicon);
  w2.firstWords = fns.copy(this.firstWords);
  w2.tagset = fns.copy(this.tagset);
  return w2;
};
module.exports = World;
