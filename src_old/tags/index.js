'use strict';
const conflicts = require('./conflicts');
const tree = require('./tree');

//make tags
let all = {};
//recursively add them, with is
const add_tags = (obj, is) => {
  Object.keys(obj).forEach((k) => {
    all[k] = is;
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//add conflicts
Object.keys(all).forEach((tag) => {
  all[tag] = {
    is: all[tag],
    not: conflicts(tag)
  };
});

module.exports = all;
