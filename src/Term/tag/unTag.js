const fns = require('./fns')

/** remove this tag, and its descentents from the term */
const unTag = function(t, tag, reason, world) {
  if (t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag]
    //log in verbose-mode
    if (world !== undefined && world.isVerbose() === true) {
      fns.logUntag(t, tag, reason)
    }
  }
  //delete downstream tags too
  if (world) {
    //TODO: properly support Term calling itself directly
    const tagset = world.tags
    if (tagset[tag]) {
      let also = tagset[tag].downward
      for (let i = 0; i < also.length; i++) {
        unTag(t, also[i], ' - -   - ', world) //recursive
      }
    }
  }
  return t
}

//handle an array of tags
const untagAll = function(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(tag => unTag(term, tag, reason, world))
  } else {
    unTag(term, tags, reason, world)
  }
}
module.exports = untagAll
