const addDownward = require('../tagset/addDownward');

const addTags = function(tags) {
  Object.keys(tags || {}).forEach(k => {
    tags[k].isA = tags[k].isA || [];
    tags[k].notA = tags[k].notA || [];
    this.tagset[k] = tags[k];
  });
  addDownward(this.tagset);
};
module.exports = addTags;
