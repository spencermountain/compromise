const fns = require('./fns')

/** add a tag, and its descendents, to a term */
const addTag = function (t, tag, reason, world) {
  let tagset = world.tags
  //support '.' or '-' notation for skipping the tag
  if (tag === '' || tag === '.' || tag === '-') {
    return
  }
  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '')
  }
  tag = fns.titleCase(tag)
  //if we already got this one
  if (t.tags[tag] === true) {
    return
  }
  // log it?
  const isVerbose = world.isVerbose()
  if (isVerbose === true) {
    fns.logTag(t, tag, reason)
  }
  //add tag
  t.tags[tag] = true //whee!

  //check tagset for any additional things to do...
  if (tagset.hasOwnProperty(tag) === true) {
    //add parent Tags
    tagset[tag].isA.forEach(down => {
      t.tags[down] = true
      if (isVerbose === true) {
        fns.logTag(t, '→ ' + down)
      }
    })
    //remove any contrary tags
    t.unTag(tagset[tag].notA, '←', world)
  }
}

/** support an array of tags */
const addTags = function (term, tags, reason, world) {
  if (typeof tags !== 'string') {
    for (let i = 0; i < tags.length; i++) {
      addTag(term, tags[i], reason, world)
    }
    // tags.forEach(tag => addTag(term, tag, reason, world))
  } else {
    addTag(term, tags, reason, world)
  }
}
module.exports = addTags
