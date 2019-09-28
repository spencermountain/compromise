const fns = require('./fns')

/** add a tag, and its descendents, to a term */
const addTag = function(t, tag, reason, world) {
  // process.tagged.push(reason)
  if (!world) {
    console.warn('World not found - ' + reason)
  }
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
  if (world !== undefined && world.isVerbose() === true) {
    fns.logTag(t, tag, reason)
  }
  //add tag
  t.tags[tag] = true //whee!

  //check tagset for any additional things to do...
  if (world !== undefined && world.tags !== undefined) {
    let tagset = world.tags
    if (tagset.hasOwnProperty(tag) === true) {
      //add parent Tags
      if (tagset[tag].isA !== undefined) {
        let parentTag = tagset[tag].isA
        addTag(t, parentTag, '→', world) //recursive
      }
      //add these extra ones, too
      if (tagset[tag].also !== undefined) {
        let alsoTag = tagset[tag].also
        addTag(t, alsoTag, '→', world) //recursive
      }
      //remove any contrary tags
      if (typeof tagset[tag].notA !== 'undefined') {
        t.unTag(tagset[tag].notA, '←', world)
      }
    }
  }
}

/** support an array of tags */
const addTags = function(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(tag => addTag(term, tag, reason, world))
  } else {
    addTag(term, tags, reason, world)
  }
}
module.exports = addTags
