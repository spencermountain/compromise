// add all inflections of this verb/noun/adjective
const inflect = function (token, world, kind, fallback) {
  const { all } = world.methods.two.transform[kind] || {}
  if (!all) {
    return fallback
  }
  return all(token.root, world.model)
}

// explicitly-set POS - '{sweet/adjective}'
const byPos = { Verb: 'verb', Noun: 'noun', Adjective: 'adjective' }

// turn '{walk}' into 'walking', 'walked', etc
const inflectRoot = function (regs, world) {
  // do we have compromise/two?
  regs = regs.map(token => {
    // a reg to convert '{foo}'
    if (token.root) {
      // check if compromise/two is loaded
      if (world.methods.two && world.methods.two.transform) {
        let choices = []
        if (token.pos) {
          if (Object.hasOwn(byPos, token.pos)) {
            const kind = byPos[token.pos]
            choices = inflect(token, world, kind, kind === 'verb' ? [] : [token.root])
          }
        } else {
          // do verb/noun/adj by default
          choices = [
            ...inflect(token, world, 'verb', []),
            ...inflect(token, world, 'noun', [token.root]),
            ...inflect(token, world, 'adjective', [token.root]),
          ]
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
