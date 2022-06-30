const addVerbs = function (token, world) {
  let { verbConjugate } = world.methods.two.transform
  let res = verbConjugate(token.root, world.model)
  delete res.FutureTense
  return Object.values(res).filter(str => str)
}

const addNoun = function (token, world) {
  let { nounToPlural } = world.methods.two.transform
  let res = [token.root]
  res.push(nounToPlural(token.root, world.model))
  return res
}

const addAdjective = function (token, world) {
  let { adjToSuperlative, adjToComparative } = world.methods.two.transform
  let res = [token.root]
  res.push(adjToSuperlative(token.root, world.model))
  res.push(adjToComparative(token.root, world.model))
  return res
}

// turn '{walk}' into 'walking', 'walked', etc
const conjugateRoot = function (regs, world) {
  // do we have compromise/two?
  if (world.methods.two && world.methods.two.transform) {
    regs = regs.map(token => {
      // a reg to convert '{foo}'
      if (token.root) {
        let choices = []
        if (!token.pos || token.pos === 'verb') {
          choices = choices.concat(addVerbs(token, world))
        }
        if (!token.pos || token.pos === 'noun') {
          choices = choices.concat(addNoun(token, world))
        }
        if (!token.pos || token.pos === 'adjective') {
          choices = choices.concat(addAdjective(token, world))
        }
        choices = choices.filter(str => str)
        if (choices.length > 0) {
          token.operator = 'or'
          token.fastOr = new Set(choices)
        }
      }
      return token
    })
  }
  return regs
}
export default conjugateRoot