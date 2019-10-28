// if a clause starts with these, it's not a main clause
const subordinate = `^(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)`
const relative = `^(that|which|whichever|who|whoever|whom|whose|whomever)`

const mainClause = function(m) {
  if (m.length === 1) {
    return m
  }
  m = m.ifNo(subordinate)
  m = m.ifNo('^even (if|though)')
  m = m.ifNo('^so that')
  m = m.ifNo('^rather than')
  m = m.ifNo('^provided that')
  m = m.ifNo(relative)
  if (m.length === 1) {
    return m
  }
  // if there's no verb?
  m = m.if('#Verb')

  // choose the first one?
  return m.eq(0)
}
module.exports = mainClause
