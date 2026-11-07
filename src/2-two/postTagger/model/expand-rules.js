import expandTags from './_lib.js'

const keys = { n: 'notIf', u: 'unTag' }

// Expand tuples once: [match, tag, group?, options?]
// A '[capture]' tags group 0 unless given a group; options may sit in slot 2.
const expandRules = rules => rules.map(([match, tag, group, options = {}]) => {
  if (group && typeof group === 'object') {
    options = group
    group = null
  }
  const rule = { match: expandTags(match) }
  if (tag != null) {
    rule.tag = expandTags(tag, true)
  }
  if (typeof group === 'number') {
    rule.group = group
  } else if (/\[/.test(match)) {
    rule.group = 0
  }
  Object.keys(options).forEach(key => {
    rule[keys[key] || key] = expandTags(options[key], key === 'u')
  })
  rule.reason = rule.match
  return rule
})

export default expandRules
