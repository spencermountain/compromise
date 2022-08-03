const addVerbs = function (token, world) {
  let { verbConjugate } = world.methods.two.transform
  if (!verbConjugate) {
    return []
  }
  let res = verbConjugate(token.root, world.model)
  delete res.FutureTense
  return Object.values(res).filter(str => str)
}

const addNoun = function (token, world) {
  let { nounToPlural } = world.methods.two.transform
  let res = [token.root]
  if (!nounToPlural) {
    return res
  }
  res.push(nounToPlural(token.root, world.model))
  return res
}

const addAdjective = function (token, world) {
  let { adjToSuperlative, adjToComparative, adjToAdverb } = world.methods.two.transform
  let res = [token.root]
  if (!adjToSuperlative || !adjToComparative || !adjToAdverb) {
    return res
  }
  res.push(adjToSuperlative(token.root, world.model))
  res.push(adjToComparative(token.root, world.model))
  res.push(adjToAdverb(token.root, world.model))
  return res
}

// turn '{walk}' into 'walking', 'walked', etc
const inflectRoot = function (regs, world) {
  // do we have compromise/two?
  regs = regs.map(token => {
    // a reg to convert '{foo}'
    if (token.root) {
      // check if compromise/two is loaded
      if (world.methods.two && world.methods.two.transform && world.methods.two.transform.verbConjugate) {
        let choices = []
        if (!token.pos || token.pos === 'Verb') {
          choices = choices.concat(addVerbs(token, world))
        }
        if (!token.pos || token.pos === 'Noun') {
          choices = choices.concat(addNoun(token, world))
        }
        // don't run these by default
        if (!token.pos || token.pos === 'Adjective') {
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