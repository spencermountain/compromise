const fns = require('./fns');

const addTag = function(t, tag, world, reason) {
  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }
  tag = fns.titleCase(tag);
  //if we already got this one
  if (t.tags[tag] === true) {
    return;
  }
  if (world !== undefined && world.isVerbose() === true) {
    fns.logTag(t, tag, reason);
  }
  //add tag
  t.tags[tag] = true; //whee!

  //check tagset for any additional things to do...
  if (world !== undefined && world.tags !== undefined) {

    let tagset = world.tags;
    if (tagset.hasOwnProperty(tag) === true) {
      //add parent Tags
      if (tagset[tag].isA !== undefined) {
        let parentTag = tagset[tag].isA;
        addTag(t, parentTag, world, '→'); //recursive
      }
      //remove any contrary tags
      if (typeof tagset[tag].notA !== 'undefined') {
        t.untag(tagset[tag].notA, world, '←');
      }
    }
  }
// console.log(tagset);
};

//handle an array of tags
const addTags = function(tags, world, reason) {
  // console.log(Object.keys(world));
  if (fns.isArray(tags) === true) {
    tags.forEach((tag) => addTag(this, tag, world, reason));
  } else {
    addTag(this, tags, world, reason);
  }
  return;
};
module.exports = addTags;
