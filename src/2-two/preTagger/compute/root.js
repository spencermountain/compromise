const toRoot = {
  // 'drinks' -> 'drink'
  'Plural': (term, world) => {
    let str = term.machine || term.normal || term.text
    return world.methods.two.transform.nounToSingular(str, world.model)
  },
  // 'walked' -> 'walk'
  'PastTense': (term, world) => {
    let str = term.machine || term.normal || term.text
    return world.methods.two.transform.verbToInfinitive(str, world.model, 'PastTense')
  },
  // 'walks' -> 'walk'
  'PresentTense': (term, world) => {
    let str = term.machine || term.normal || term.text
    return world.methods.two.transform.verbToInfinitive(str, world.model, 'PresentTense')
  },
}

const getRoot = function (view) {
  const world = view.world
  const keys = Object.keys(toRoot)
  // console.log(world.methods.two.transform.nounToSingular)
  view.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      for (let k = 0; k < keys.length; k += 1) {
        if (term.tags.has(keys[k])) {
          const fn = toRoot[keys[k]]
          term.root = fn(term, world)
        }
      }
    }
  })
}
export default getRoot