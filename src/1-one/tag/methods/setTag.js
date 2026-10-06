import debug from '../../../API/debug.js'
import getConflicts from './_lib.js'
const isMulti = / /

const addChunk = function (term, tag) {
  if (tag === 'Noun') {
    term.chunk = tag
  }
  if (tag === 'Verb') {
    term.chunk = tag
  }
}

// eslint-disable-next-line max-params
const tagTerm = function (term, tag, tagSet, isSafe, validated, reason) {
  // does it already have this tag?
  if (term.tags.has(tag) === true) {
    return null
  }
  // allow this shorthand in multiple-tag strings
  if (tag === '.') {
    return null
  }
  // don't overwrite any tags, if term is frozen
  if (term.frozen === true) {
    isSafe = true
  }
  const previous = debug.tags ? debug.before(term) : null
  // for known tags, do logical dependencies first
  const known = tagSet[tag]
  if (known) {
    // first, we remove any conflicting tags
    if (known !== validated && known.not && known.not.length > 0) {
      const conflicts = getConflicts(known.not)
      for (const existing of term.tags) {
        if (conflicts.has(existing)) {
          // Safe and frozen terms cannot lose conflicting tags.
          if (isSafe === true) {
            return null
          }
          term.tags.delete(existing)
        }
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
  // now it's dirty?
  term.dirty = true
  // add a chunk too, if it's easy
  addChunk(term, tag)
  if (previous) {
    debug.log(term, previous, reason)
  }
  return true
}

// support '#Noun . #Adjective' syntax
const multiTag = function (terms, tagString, tagSet, isSafe, reason) {
  const tags = tagString.split(isMulti)
  terms.forEach((term, i) => {
    let tag = tags[i]
    if (tag) {
      tag = tag.replace(/^#/, '')
      tagTerm(term, tag, tagSet, isSafe, undefined, reason)
    }
  })
}

// add a tag to all these terms
// Whole-match validation is separate from per-term safety.
// eslint-disable-next-line max-params
const setTag = function (terms, tag, world = {}, isSafe, reason, validated) {
  const tagSet = world.model.one.tagSet || {}
  if (!tag) {
    return
  }
  if (Array.isArray(tag) === true) {
    tag.forEach(tg => setTag(terms, tg, world, isSafe, reason))
    return
  }
  if (typeof tag !== 'string') {
    console.warn(`compromise: Invalid tag '${tag}'`) // eslint-disable-line
    return
  }
  tag = tag.trim()
  // support '#Noun . #Adjective' syntax
  if (isMulti.test(tag)) {
    multiTag(terms, tag, tagSet, isSafe, reason)
    return
  }
  tag = tag.replace(/^#/, '')
  // let set = false
  for (let i = 0; i < terms.length; i += 1) {
    tagTerm(terms[i], tag, tagSet, isSafe, validated, reason)
  }
}
export default setTag
