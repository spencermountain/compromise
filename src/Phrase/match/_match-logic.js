//found a match? it's greedy? keep going!
exports.getGreedy = function (terms, t, reg, until, index, length) {
  let start = t
  for (; t < terms.length; t += 1) {
    //stop for next-reg match
    if (until && terms[t].doesMatch(until, index + t, length)) {
      return t
    }
    let count = t - start + 1
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return t
    }
    //stop here
    if (terms[t].doesMatch(reg, index + t, length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null
      }
      return t
    }
  }
  return t
}

//'unspecific greedy' is a weird situation.
exports.greedyTo = function (terms, t, nextReg, index, length) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg, index + t, length) === true) {
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
}

//we have a special case where an end-anchored greedy match may need to
//start matching before the actual end; we do this by (temporarily!)
//removing the "end" property from the matching token... since this is
//very situation-specific, we *only* do this when we really need to.
exports.isEndGreedy = function (reg, index, t, terms, length) {
  if (reg.end === true && reg.greedy === true) {
    if (index + t < length - 1) {
      let tmpReg = Object.assign({}, reg, { end: false })
      if (terms[t].doesMatch(tmpReg, index + t, length) === true) {
        return true
      }
    }
  }
  if (terms[t].doesMatch(reg, index + t, length) === true) {
    return true
  }
  return false
}

// get or create named group
exports.getOrCreateGroup = function (namedGroups, namedGroupId, terms, startIndex, group) {
  if (namedGroups[namedGroupId]) {
    return namedGroups[namedGroupId]
  }
  const { id } = terms[startIndex]
  namedGroups[namedGroupId] = {
    group: String(group),
    start: id,
    length: 0,
  }
  return namedGroups[namedGroupId]
}

exports.doMultiWord = function (terms, t, reg, length) {
  // do each multiword sequence
  for (let c = 0; c < reg.choices.length; c += 1) {
    let cr = reg.choices[c]
    // try a list of words
    if (cr.sequence) {
      let found = cr.sequence.every((w, w_index) => {
        let tryTerm = t + w_index
        if (terms[tryTerm] === undefined) {
          return false
        }
        if (terms[tryTerm].doesMatch({ word: w }, tryTerm, length)) {
          return true
        }
        return false
      })
      if (found) {
        return cr.sequence.length
      }
    } else if (terms[t].doesMatch(cr, t, length)) {
      // try a normal match in a multiword
      return 1
    }
  }
  return false
}
