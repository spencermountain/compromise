
const isArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

const logIt = function(t, tag, reason) {
  let log = '\x1b[32m' + t.normal + '\x1b[0m ' + reason;
  console.log(log);
};

const addTag = function(t, tag, world, reason) {
  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }
  //if we already got this one
  if (t.tags[tag] === true) {
    return;
  }
  if (reason !== undefined && world !== undefined && world.verbose === true) {
    logIt(t, tag, reason);
  }
  //add tag
  t.tags[tag] = true; //whee!

  //check tagset for any additional things to do...
  if (world !== undefined && world.tags !== undefined) {
    let tagset = world.tags;
    //add parent Tags
    if (tagset.hasOwnProperty(tag) === true && tagset[tag].isA !== undefined) {
      let parentTag = tagset[tag].isA;
      addTag(t, parentTag, world, '   ->'); //recursive
    }
    //remove any contrary tags
    if (typeof tagset[tag].notA !== 'undefined') {
      // console.log(tagset[tag].notA);
    }
  }
// console.log(tagset);
};

//handle an array of tags
const addTags = function(tags, world, reason) {
  if (isArray(tags) === true) {
    tags.forEach((tag) => addTag(this, tag, world, reason));
  } else {
    addTag(this, tags, world, reason);
  }
  return tags;
};
module.exports = addTags;
