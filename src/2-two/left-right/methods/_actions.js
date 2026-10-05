const apply = (term, rule, world) => {
  const { setTag, unTag } = world.methods.one
  const terms = [term]
    const reason = '2-left-right: ' + (rule.reason || '')
  // Object rules retain their original single-action format.
  const actions = rule.actions || [rule]
  for (let i = 0; i < actions.length; i += 1) {
    const action = actions[i]
    if (action.unTag) {
      unTag(terms, action.unTag, world.model.one.tagSet)
      continue
    }
    setTag(terms, action.tag, world, rule.safe, reason)
    // Preserve the noun number that the sweep's tagger supplies.
    if (action.tag === 'Noun') {
      const tag = world.methods.two.looksPlural(term.text) ? 'Plural' : 'Singular'
      setTag(terms, tag, world, rule.safe, reason)
    }
  }
}

export default apply
