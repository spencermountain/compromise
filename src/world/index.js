const addWords = require('./addWords');
const fns = require('../fns');
let lexicon = require('../lexicon/init');
let tagset = require('../tagset');
let regex = require('./rules');
let defaultPlurals = require('../lexicon/uncompressed/irregularPlurals').toPlural;

//'class World{}'
let World = function() {
  this.words = lexicon.lexicon;
  this.firstWords = lexicon.firstWords;
  this.tagset = tagset;
  this.regex = regex;

  this.conjugations = {};
  this.plurals = defaultPlurals;
};

World.prototype.addWords = addWords;

World.prototype.addRegex = function(obj) {
  obj = obj || {};
  let keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    let reg = new RegExp(keys[i], 'i');
    this.regex.push({
      reg: reg,
      tag: obj[keys[i]]
    });
  }
};
World.prototype.addTags = function(tags) {
  Object.keys(tags || {}).forEach(k => {
    tags[k].isA = tags[k].isA || [];
    tags[k].notA = tags[k].notA || [];
    this.tagset[k] = tags[k];
  });
  addDownward(this.tagset);
};

World.prototype.addPlurals = function(plurals) {
  Object.keys(plurals || {}).forEach(k => {
    this.plurals[k] = plurals[k];
    //add them both to the lexicon, too
    let plural = plurals[k];
    this.words[k] = this.words[k] || 'Singular';
    this.words[plural] = this.words[plural] || 'Plural';
  });
};
World.prototype.addConjugations = function(conjugations) {
  Object.keys(conjugations || {}).forEach(k => {
    this.conjugations[k] = conjugations[k];
    //add them both to the lexicon, too
    // let plural = plurals[k];
    this.words[k] = this.words[k] || 'Infinitive';
  // this.words[plural] = this.words[plural] || 'Plural';
  });
};

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
