import expandTags from './_lib.js'

const keys = { n: 'notIf', u: 'unTag' }

// Expand tuples once; null tag/group placeholders leave those fields absent.
const expandRules = rules => rules.map(([match, tag, group, options = {}]) => {
  const rule = { match: expandTags(match) }
  if (tag != null) {
    rule.tag = expandTags(tag, true)
  }
  if (group != null) {
    rule.group = group
  }
  Object.keys(options).forEach(key => {
    rule[keys[key] || key] = expandTags(options[key], key === 'u')
  })
  rule.reason = rule.match
  return rule
})

export default expandRules
