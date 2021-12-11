const isMulti = / /

const addChunk = function (term, tag) {
  if (tag === 'Noun') {
    term.chunk = tag
  }
  if (tag === 'Verb') {
    term.chunk = tag
  }
}

const tagTerm = function (term, tag, tagSet, isSafe) {
  // does it already have this tag?
  if (term.tags.has(tag) === true) {
    return null
  }
  // allow this shorthand in multiple-tag strings
  if (tag === '.') {
    return null
  }
  // for known tags, do logical dependencies first
  let known = tagSet[tag]
  if (known) {
    // first, we remove any conflicting tags
    if (known.not && known.not.length > 0) {
      for (let o = 0; o < known.not.length; o += 1) {
        // if we're in tagSafe, skip this term.
        if (isSafe === true && term.tags.has(known.not[o])) {
          return null
        }
        term.tags.delete(known.not[o])
      }
    }
    // add parent tags
    if (known.parents && known.parents.length > 0) {
      for (let o = 0; o < known.parents.length; o += 1) {
        term.tags.add(known.parents[o])
        addChunk(term, known.parents[o])
      }
    }
  }
  // finally, add our tag
  term.tags.add(tag)
  // now it's dirty
  term.dirty = true
  // add a chunk too, if it's easy
  addChunk(term, tag)
  return true
}

// support '#Noun . #Adjective' syntax
const multiTag = function (terms, tagString, tagSet, isSafe) {
  let tags = tagString.split(isMulti)
  terms.forEach((term, i) => {
    let tag = tags[i]
    if (tag) {
      tag = tag.replace(/^#/, '')
      tagTerm(term, tag, tagSet, isSafe)
    }
  })
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

// add a tag to all these terms
const setTag = function (terms, tag, world = {}, isSafe) {
  const tagSet = world.model.one.tagSet || {}
  if (!tag) {
    return
  }
  if (isArray(tag) === true) {
    tag.forEach(tg => setTag(terms, tg, world, isSafe))
    return
  }
  tag = tag.trim()
  // support '#Noun . #Adjective' syntax
  if (isMulti.test(tag)) {
    multiTag(terms, tag, tagSet, isSafe)
    return
  }
  tag = tag.replace(/^#/, '')
  // let set = false
  for (let i = 0; i < terms.length; i += 1) {
    tagTerm(terms[i], tag, tagSet, isSafe)
  }
}
export default setTag
