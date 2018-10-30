const fns = require('./fns');

//
const unTag = function(t, tag, reason, world) {
  if (t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag];
    //log in verbose-mode
    if (world !== undefined && world.isVerbose() === true) {
      fns.logUntag(t, tag, reason);
    }
  }
  //delete downstream tags too
  if (!world) {
    console.log(reason);
  }
  if (world) {
    const tagset = world.tags;
    if (tagset[tag]) {
      let also = tagset[tag].downward;
      for (let i = 0; i < also.length; i++) {
        unTag(t, also[i], ' - -   - ', world); //recursive
      }
    }
  }
  return t;
};

//handle an array of tags
const untagAll = function(tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach((tag) => unTag(this, tag, reason, world));
  } else {
    unTag(this, tags, reason, world);
  }
};
module.exports = untagAll;
