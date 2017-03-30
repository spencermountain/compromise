'use strict';

//
const conflicts = require('./conflicts');
let nouns = require('./tags/nouns');
let verbs = require('./tags/verbs');
let values = require('./tags/values');
let dates = require('./tags/dates');
let misc = require('./tags/misc');

//used for pretty-printing on the server-side
const colors = {
  Noun: 'blue',
  Value: 'red',
  Verb: 'green',
  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adjective: 'black',
  Adverb: 'black'
};

//extend tagset with new tags
const addIn = function(obj, tags) {
  Object.keys(obj).forEach((k) => {
    tags[k] = obj[k];
  });
};

//add 'downward' tags (that immediately depend on this one)
const addChildren = function(tags) {
  let keys = Object.keys(tags);
  keys.forEach((k) => {
    tags[k].downward = [];
    //look for tags with this as parent
    for(let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].is && tags[keys[i]].is === k) {
        tags[k].downward.push(keys[i]);
      }
    }
  });
};

//add tags to remove when tagging this one
const addConflicts = function(tags) {
  Object.keys(tags).forEach((k) => {
    tags[k].enemy = {};
    for(let i = 0; i < conflicts.length; i++) {
      let arr = conflicts[i];
      if (arr.indexOf(k) !== -1) {
        arr = arr.filter((a) => a !== k);
        arr.forEach((e) => {
          tags[k].enemy[e] = true;
        });
      }
    }
  });
  //get enemies of parents
  // Object.keys(tags).forEach((k) => {
  // let k = 'Gerund';
  // if (tags[k].is) {
  //   let parent = tags[k].is;
  //   let keys = Object.keys(tags[parent].enemy);
  //   console.log(tags[parent]);
  //   for(let i = 0; i < keys.length; i++) {
  //     tags[k][keys[i]] = true;
  //   }
  // }
  // });
  //flatten them
  Object.keys(tags).forEach((k) => {
    tags[k].enemy = Object.keys(tags[k].enemy);
  });
};

const addColors = function(tags) {
  Object.keys(tags).forEach((k) => {
    if (colors[k]) {
      tags[k].color = colors[k];
      return;
    }
    if (tags[k].is && colors[tags[k].is]) {
      tags[k].color = colors[tags[k].is];
      return;
    }
    if (tags[k].is && tags[tags[k].is].color) {
      tags[k].color = tags[tags[k].is].color;
    }
  });
};

const build = () => {
  let tags = {};
  addIn(nouns, tags);
  addIn(verbs, tags);
  addIn(values, tags);
  addIn(dates, tags);
  addIn(misc, tags);
  //downstream
  addChildren(tags);
  //add enemies
  addConflicts(tags);
  //for nice-logging
  addColors(tags);
  return tags;
};
module.exports = build();
// console.log(module.exports.Gerund.enemy);
