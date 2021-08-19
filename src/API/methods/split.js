const getSplits = function (str, view) {
  let matches = []
  // were we given a
  if (typeof str === 'object' && str.isView === true) {
    matches = str.pointer || []
  } else {
    matches = view.match(str).pointer
  }
  let splitsByN = {}
  matches.forEach(a => {
    splitsByN[a[0]] = splitsByN[a[0]] || []
    splitsByN[a[0]].push(a)
  })
  return splitsByN
}

// break a pointer into [before, match, after], each match
const _splitOn = function (ptr, matches) {
  let toAdd = []
  // add anything before our first match
  if (matches[0][1] > ptr[1]) {
    toAdd.push([ptr[0], ptr[1], matches[0][1]])
  }
  for (let i = 0; i < matches.length; i += 1) {
    let match = matches[i]
    // add our match
    toAdd.push(match)
    // add anything after our match, but before the next one
    let nextMatch = matches[i + 1]
    if (nextMatch && nextMatch[1] > match[2]) {
      toAdd.push([ptr[0], match[2], nextMatch[1]])
    }
  }
  // add anything after our last match
  let lastMatch = matches[matches.length - 1]
  if (lastMatch[2] < ptr[2]) {
    toAdd.push([ptr[0], lastMatch[2], ptr[2]])
  }
  return toAdd
}

// break a pointer into [before, match after], each match
const _splitBefore = function (ptr, matches) {
  let toAdd = []
  // add anything before our first match
  if (matches[0][1] > ptr[1]) {
    toAdd.push([ptr[0], ptr[1], matches[0][1]])
  }
  for (let i = 0; i < matches.length; i += 1) {
    let match = matches[i]
    // add anything after our match, but before the next one
    let nextMatch = matches[i + 1]
    if (nextMatch) {
      toAdd.push([ptr[0], match[1], nextMatch[1]])
    } else {
      toAdd.push([ptr[0], match[1], ptr[2]])
    }
  }
  return toAdd
}

// break a pointer into [before match, after], each match
const _splitAfter = function (ptr, matches) {
  let toAdd = []
  let nowAt = ptr[1]
  for (let i = 0; i < matches.length; i += 1) {
    let match = matches[i]
    // add anything before and including our match
    if (match[2] > nowAt) {
      toAdd.push([ptr[0], nowAt, match[2]])
    }
    nowAt = match[2]
  }
  // add anything after our last match
  let lastMatch = matches[matches.length - 1]
  if (lastMatch[2] < ptr[2]) {
    let start = lastMatch[2]
    if (start < ptr[1]) {
      start = ptr[1]
    }
    toAdd.push([ptr[0], start, ptr[2]])
  }
  return toAdd
}

const splitOn = function (str) {
  let ptrs = this.fullPointer
  let splitsByN = getSplits(str, this)
  for (let i = ptrs.length - 1; i >= 0; i -= 1) {
    let ptr = ptrs[i]
    if (splitsByN[ptr[0]]) {
      let toAdd = _splitOn(ptr, splitsByN[ptr[0]])
      ptrs.splice(i, 1, ...toAdd) //splice in array as replacement
    }
  }
  return this.update(ptrs)
}

const splitBefore = function (str) {
  let ptrs = this.fullPointer
  let splitsByN = getSplits(str, this)
  for (let i = ptrs.length - 1; i >= 0; i -= 1) {
    let ptr = ptrs[i]
    if (splitsByN[ptr[0]]) {
      let toAdd = _splitBefore(ptr, splitsByN[ptr[0]])
      ptrs.splice(i, 1, ...toAdd) //splice in array as replacement
    }
  }
  return this.update(ptrs)
}

const splitAfter = function (str) {
  let ptrs = this.fullPointer
  let splitsByN = getSplits(str, this)
  for (let i = ptrs.length - 1; i >= 0; i -= 1) {
    let ptr = ptrs[i]
    if (splitsByN[ptr[0]]) {
      let toAdd = _splitAfter(ptr, splitsByN[ptr[0]])
      ptrs.splice(i, 1, ...toAdd) //splice in array as replacement
    }
  }
  return this.update(ptrs)
}

export default { splitOn, splitBefore, splitAfter }
