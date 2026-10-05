import expandTags from './_lib.js'

const keys = { m: 'match', g: 'group', t: 'tag', r: 'reason', n: 'notIf', u: 'unTag' }

// Expand both passes with the same compact keys and tag aliases.
const expandRules = rules => {
  rules.forEach(rule => {
    Object.keys(rule).forEach(key => {
      rule[key] = expandTags(rule[key], key === 't' || key === 'u')
      const name = keys[key]
      if (name) {
        rule[name] = rule[key]
        delete rule[key]
      }
    })
  })
  return rules
}

export default expandRules
