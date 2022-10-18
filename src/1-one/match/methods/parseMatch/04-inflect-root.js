
// add all conjugations of this verb
const addVerbs = function (token, world) {
  let { conjugate, toInfinitive } = world.methods.two.transform.verb || {}
  if (!conjugate || !toInfinitive) {
    return []
  }
  let str = toInfinitive(token.root, world.model)
  let res = conjugate(str, world.model)
  delete res.FutureTense
  return Object.values(res).filter(s => s)
}

// add all inflections of this noun
const addNoun = function (token, world) {
  let { toPlural } = world.methods.two.transform.noun || {}
  let res = [token.root]
  if (!toPlural) {
    return res
  }
  res.push(toPlural(token.root, world.model))
  return res
}

// add all inflections of this adjective
const addAdjective = function (token, world) {
  let { toSuperlative, toComparative, toAdverb } = world.methods.two.transform.adjective || {}
  let res = [token.root]
  if (!toSuperlative || !toComparative || !toAdverb) {
    return res
  }
  res.push(toSuperlative(token.root, world.model))
  res.push(toComparative(token.root, world.model))
  res.push(toAdverb(token.root, world.model))
  return res
}

// turn '{walk}' into 'walking', 'walked', etc
const inflectRoot = function (regs, world) {
  // do we have compromise/two?
  regs = regs.map(token => {
    // a reg to convert '{foo}'
    if (token.root) {
      // check if compromise/two is loaded
      if (world.methods.two && world.methods.two.transform) {
        let choices = []
        // have explicitly set from POS - '{sweet/adjective}'
        if (token.pos) {
          if (token.pos === 'Verb') {
            choices = choices.concat(addVerbs(token, world))
          } else if (token.pos === 'Noun') {
            choices = choices.concat(addNoun(token, world))
          } else if (token.pos === 'Adjective') {
            choices = choices.concat(addAdjective(token, world))
          }
        } else {
          // do verb/noun/adj by default
          choices = choices.concat(addVerbs(token, world))
          choices = choices.concat(addNoun(token, world))
          choices = choices.concat(addAdjective(token, world))
        }
        choices = choices.filter(str => str)
        if (choices.length > 0) {
          token.operator = 'or'
          token.fastOr = new Set(choices)
        }
      } else {
        // if no compromise/two, drop down into 'machine' lookup
        token.machine = token.root
        delete token.id
        delete token.root
      }
    }
    return token
  })

  return regs
}
export default inflectRoot