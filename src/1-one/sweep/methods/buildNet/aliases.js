// Resolve actions and index hints once, alongside the match expression.
const resolveAliases = (rule, aliases) => {
  const tag = value => {
    if (Array.isArray(value)) {
      return value.map(tag)
    }
    if (typeof value !== 'string') {
      return value
    }
    return value.trim().split(/ +/).map(name => {
      name = name.replace(/^#/, '')
      return aliases[name] || name
    }).join(' ')
  }
  const hook = value => {
    if (typeof value === 'string' && value.startsWith('#')) {
      return '#' + tag(value)
    }
    return value
  }
  if (rule.tag !== undefined) {
    rule.tag = tag(rule.tag)
  }
  if (rule.unTag !== undefined) {
    rule.unTag = tag(rule.unTag)
  }
  if (rule.hook !== undefined) {
    rule.hook = hook(rule.hook)
  }
  if (rule.ifNo !== undefined) {
    rule.ifNo = [rule.ifNo].flat().map(hook)
  }
}

export default resolveAliases
