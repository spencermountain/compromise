// if a clause starts with these, it's not a main clause
const subordinate = `(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)`
const relative = `(that|which|whichever|who|whoever|whom|whose|whomever)`

// a subordinator or relative pronoun only makes the clause secondary when it
// introduces the clause - after the verb it belongs to a nested clause instead
const dropIntroducedBy = function (m, pattern) {
  // parse the pattern once here, instead of once per clause
  const reg = m.world.methods.one.parseMatch(pattern, {}, m.world)
  return m.filter(c => {
    const found = c.matchOne(reg)
    if (!found.found) {
      return true
    }
    const verb = c.matchOne('#Verb')
    return verb.found && verb.fullPointer[0][1] <= found.fullPointer[0][1]
  })
}

//try to remove secondary clauses
const mainClause = function (s) {
  let m = s
  if (m.length === 1) {
    return m
  }
  // if there's no verb, it's dependent
  m = m.if('#Verb')
  if (m.length === 1) {
    return m
  }
  // this is a signal for subordinate-clauses
  m = dropIntroducedBy(m, subordinate)
  m = m.ifNo('^even (if|though)')
  m = m.ifNo('^so that')
  m = m.ifNo('^rather than')
  m = m.ifNo('^provided that')
  if (m.length === 1) {
    return m
  }
  // relative clauses
  m = dropIntroducedBy(m, relative)
  if (m.length === 1) {
    return m
  }

  // check for subordinating conjunctions -- must be at the beginning of the clause
  m = m.ifNo('(^despite|^during|^before|^through|^throughout)')
  if (m.length === 1) {
    return m
  }

  // check for clauses beginning with Gerund ("Taking ..., ...")
  m = m.ifNo('^#Gerund')
  if (m.length === 1) {
    return m
  }

  // did we go too far?
  if (m.length === 0) {
    m = s
  }
  // choose the first one?
  return m.eq(0)
}
export default mainClause
