const vowel = /[aeiouy]/

// Ignore the character at match.index + offset. Rules may veto a whole word.
const ignored = [
  { match: /[^aeiou]e$/g, offset: 1, except: /[^aeiouy]le$/ }, // silent e
  { match: /[^td]ed$/g, offset: 1 }, // walked, played
  { match: /es$/g, offset: 0, except: /([sxzcg]|ch|sh|[^aeiouy]l)es$/ },
  { match: /e(?=ment$|thing$|s?man$)/g, offset: 0 }, // movement, salesman
  { match: /qu(?=[aeiouy])/g, offset: 1 }, // consonantal u
  { match: /y(?=[aeiouy])/g, offset: 0 }, // consonantal y
]

// Keep a boundary after these matched prefixes, even inside a vowel group.
const separate = [
  /^cre(?=at[eio])/, // create, creating (but not creature)
  /^re(?=act)/,
  /^flu(?=id)/,
  /^ru(?=in)/,
]

// Match a bounded window around the current vowel: [i - before, i + after).
const joined = [
  { before: 1, after: 1, match: /^(ai|au|ay|ea|ee|ei|eu|ey|ie|oa|oe|oi|oo|ou|oy|ue|ui)$/ },
  { before: 3, after: 2, match: /^llion/ },
  { before: 2, after: 3, match: /^[cst]i(?:on|an|al|ous)/ },
  { before: 2, after: 1, match: /^eau$/ },
]

export { vowel, ignored, separate, joined }
