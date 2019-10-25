const fns = require('./fns')

/** remove this tag, and its descentents from the term */
const unTag = function(t, tag, reason, world) {
  const isVerbose = world.isVerbose()
  //support '*' for removing all tags
  if (tag === '*') {
    t.tags = {}
    return t
  }
  // remove the tag
  if (t.tags[tag] === true && t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag]
    //log in verbose-mode
    if (isVerbose === true) {
      fns.logUntag(t, tag, reason)
    }
  }
  //delete downstream tags too
  const tagset = world.tags
  if (tagset[tag]) {
    let lineage = tagset[tag].lineage
    for (let i = 0; i < lineage.length; i++) {
      // unTag(t, also[i], ' - -   - ', world) //recursive
      if (t.tags[lineage[i]] === true) {
        delete t.tags[lineage[i]]
        if (isVerbose === true) {
          fns.logUntag(t, ' - ' + lineage[i])
        }
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
