//found a match? it's greedy? keep going!
const getGreedy = function(terms, t, reg) {
  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(reg) === false) {
      return t
    }
  }
  return t
}

//'unspecific greedy' is a weird situation.
const greedyTo = function(terms, t, nextReg) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg) === true) {
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
}

/** tries to match a sequence of terms, starting from here */
const tryHere = function(terms, regs) {
  let captures = []
  let t = 0
  // we must satisfy each rule in 'regs'
  for (let r = 0; r < regs.length; r += 1) {
    let reg = regs[r]
    if (!terms[t]) {
      return false
    }

    //support 'unspecific greedy' properly
    if (reg.anything === true && reg.greedy === true) {
      let goto = greedyTo(terms, t, regs[r + 1])
      if (goto === null) {
        return false //couldn't find it
      }
      t = goto
      continue
    }

    //looks like a match, continue
    if (reg.anything === true || terms[t].doesMatch(reg) === true) {
      let startAt = t
      //advance to the next term!
      t += 1
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (t !== terms.length && reg.greedy !== true) {
          return false
        }
      }
      //try keep it going!
      if (reg.greedy === true) {
        t = getGreedy(terms, t, reg)
      }
      if (reg.capture) {
        captures.push(startAt)
        //add greedy-end to capture
        if (t > 1 && reg.greedy) {
          captures.push(t - 1)
        }
      }
      continue
    }

    //bah, who cares, keep going
    if (reg.optional === true) {
      continue
    }
    // console.log('   ❌\n\n')
    return false
  }
  //we got to the end of the regs, and haven't failed!
  //try to only return our [captured] segment
  if (captures.length > 0) {
    return terms.slice(captures[0], captures[captures.length - 1] + 1)
  }
  //return our result
  return terms.slice(0, t)
}
module.exports = tryHere
