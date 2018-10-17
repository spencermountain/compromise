const fns = require('./fns');

//
const unTag = function(t, tag, world, reason) {
  if (t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag];
    //log in verbose-mode
    if (world !== undefined && world.isVerbose() === true) {
      fns.logUntag(t, tag, reason);
    }
  }
  //delete downstream tags too
  const tagset = world.tags;
  if (tagset[tag]) {
    let also = tagset[tag].downward;
    for (let i = 0; i < also.length; i++) {
      unTag(t, also[i], world, ' - -   - '); //recursive
    }
  }
  return t;
};

//handle an array of tags
const untagAll = function(tags, world, reason) {
  if (fns.isArray(tags) === true) {
    tags.forEach((tag) => unTag(this, tag, world, reason));
  } else {
    untagOne(this, tags, world, reason);
  }
};
module.exports = untagAll;
