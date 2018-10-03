'use strict';
//add 'downward' tags (that immediately depend on this one)
const addDownword = require('../tags/addDownward');

//extend our known tagset with these new ones
const addTags = function(tags) {
  Object.keys(tags).forEach((tag) => {
    let obj = tags[tag];
    obj.notA = obj.notA || [];
    obj.downward = obj.downward || [];
    this.tags[tag] = obj;
  });
  addDownword(this.tags);
  return tags;
};
module.exports = addTags;
