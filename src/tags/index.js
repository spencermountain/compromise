'use strict';
const conflicts = require('./conflicts');
const tree = require('./tree');

const extra = {
  Month: 'Singular',
  // Year: 'Noun',
  Time: 'Noun',
  WeekDay: 'Noun',
  Duration: 'Noun',
  NumberRange: 'Contraction'
};


const all_children = (obj) => {
  if (obj === true) {
    return [];
  }
  let children = Object.keys(obj || {});
  //two levels deep
  children.forEach((str) => {
    if (typeof obj[str] === 'object') {
      let kids = Object.keys(obj[str]);
      kids.forEach((gc) => {
        if (typeof obj[str][gc] === 'object') {
          let grandkids = Object.keys(obj[str][gc]);
          children = children.concat(grandkids);
        }
      });
      children = children.concat(kids);
    }
  });
  return children;
};
  
//make tags
var all = {};

const addTags = function (obj, is) {
    
    if(is==undefined) is = [];

    if(Object.keys(all).length === 0 && all.constructor === Object && obj != tree)
    {
      build();
    }

    Object.keys(obj).forEach((k) => {
      is = is.slice(0); //clone it
      all[k] = {
        parents: is,
        children: all_children(obj[k])
      };
      if (obj[k] !== true) {
        addTags(obj[k], is.concat([k])); //recursive
      }
    });
  };

const build = function() {

  //recursively add them
  addTags(tree);

  //add extras
  Object.keys(all).forEach((tag) => {
    if (extra[tag]) {
      all[tag].parents.push(extra[tag]);
    }
  });

  //add conflicts
  Object.keys(all).forEach((tag) => {
    all[tag].not = conflicts(tag);
    let parents = all[tag].parents;
    for(let i = 0; i < parents.length; i++) {
      let alsoNot = conflicts(parents[i]);
      all[tag].not = all[tag].not.concat(alsoNot);
    }
  });

  //addTags({ParentLegal:{ Legal: true}});

  return all;
};

const allTags = function() {

  if(Object.keys(all).length === 0 && all.constructor === Object)
  {
    build();
  }

  return all;
};

module.exports = {addTags, allTags};