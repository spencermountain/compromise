'use strict';
const conflicts = require('./conflicts');
const tree = require('./tree');

const extra = {
  Month: 'Singular',
  Year: 'Noun',
  Time: 'Noun',
  WeekDay: 'Noun',
  Duration: 'Noun',
};

//make tags
let all = {};

const all_children = (obj) => {
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

//recursively add them, with is
const add_tags = (obj, is) => {
  Object.keys(obj).forEach((k) => {
    is = is.slice(0); //clone it
    if (extra[k]) {
      is.push(extra[k]);
    }
    all[k] = {
      parents: is,
      children: all_children(obj[k])
    };
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//add conflicts
Object.keys(all).forEach((tag) => {
  all[tag].not = conflicts(tag);
  let parents = all[tag].parents;
  for(let i = 0; i < parents.length; i++) {
    let alsoNot = conflicts(parents[i]);
    all[tag].not = all[tag].not.concat(alsoNot);
  }
});

module.exports = all;
// console.log(all.Month);
// console.log(all_children(tree['NounPhrase']));
