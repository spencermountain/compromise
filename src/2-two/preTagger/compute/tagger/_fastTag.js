import debug from '../../../../API/debug.js'

// a faster version than the user-facing one in ./methods
const fastTag = function (term, tag, reason) {
  if (!tag || tag.length === 0) {
    return
  }
  if (term.frozen === true) {
    return
  }
  term.tags ||= new Set()
  const previous = debug.tags ? debug.before(term) : null
  if (typeof tag === 'string') {
    term.tags.add(tag)
  } else {
    tag.forEach(tg => term.tags.add(tg))
  }
  if (previous) {
    debug.log(term, previous, reason)
  }
}

export default fastTag
