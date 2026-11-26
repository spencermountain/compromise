import { passCapital, passOpening, passClosing } from './_agree.js'

// splice an array into an array
const spliceArr = (parent, index, child) => {
  // tag them as dirty
  child.forEach(term => term.dirty = true)
  if (parent) {
    parent.splice(index, 0, ...child)
  }
  return parent
}

// add a space at end, if required
const endSpace = function (terms) {
  const hasSpace = / $/
  const hasDash = /[-–—]/
  const lastTerm = terms.at(-1)
  if (lastTerm && !hasSpace.test(lastTerm.post) && !hasDash.test(lastTerm.post)) {
    lastTerm.post += ' '
  }
}

// put these words before the others
const cleanPrepend = function (home, ptr, needle, document, agree) {
  const [n, start, end] = ptr
  // introduce spaces appropriately
  if (start === 0) {
    // at start - need space in insert
    endSpace(needle)
  } else if (end === document[n].length) {
    // at end - need space in home
    endSpace(needle)
  } else {
    // in middle - need space in home and insert
    endSpace(needle)
    endSpace([home[ptr[1]]])
  }
  if (agree) {
    // '"dogs' -> '"the dogs'
    passOpening(home[start], needle[0])
    // 'Dogs' -> 'The dogs'
    if (start === 0) {
      passCapital(home[start], needle[0], true)
    }
  }
  spliceArr(home, start, needle)
}

const cleanAppend = function (home, ptr, needle, document, agree) {
  const [n, , end] = ptr
  const total = (document[n] || []).length
  // 'bark.' -> 'bark loudly.'
  const moved = agree && home[end - 1] && passClosing(home, end - 1, needle.at(-1))
  if (!moved && end < total) {
    // in the middle - add trailing space on self
    endSpace(needle)
  } else if (!moved) {
    // at the end - add a space to predecessor
    endSpace(home)
    // is there another sentence after?
    if (document[n + 1]) {
      needle.at(-1).post += ' '
    }
  }
  spliceArr(home, ptr[2], needle)
  // set new endId
  ptr[4] = needle.at(-1).id
}

export { cleanPrepend, cleanAppend }
