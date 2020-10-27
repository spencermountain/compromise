const fns = require('./fns')
const lowerCase = /^[a-z]/

const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

/** remove this tag, and its descentents from the term */
const unTag = function (t, tag, reason, world) {
  const isVerbose = world.isVerbose()
  //support '*' for removing all tags
  if (tag === '*') {
    t.tags = {}
    return t
  }
  tag = tag.replace(/^#/, '')
  if (lowerCase.test(tag) === true) {
    tag = titleCase(tag)
  }
  // remove the tag
  if (t.tags[tag] === true) {
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
const untagAll = function (term, tags, reason, world) {
  if (typeof tags !== 'string' && tags) {
    for (let i = 0; i < tags.length; i++) {
      unTag(term, tags[i], reason, world)
    }
    return
  }
  unTag(term, tags, reason, world)
}
module.exports = untagAll
