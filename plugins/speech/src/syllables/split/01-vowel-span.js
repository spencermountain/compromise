// Find vowel spans in lowercase spelling; return character offsets, not syllables.
// Candidate vowel letters; ignored rules handle consonantal uses of u and y.
const isVowel = /[aeiouy]/

// Ignore the character at match.index + offset. Rules may veto a whole word.
// Global patterns visit every occurrence; except prevents that rule from applying.
const ignored = [
  { match: /[^aeiou]e(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 1, except: /[^aeiouy]le(?:['’](?:s|d|ll|re|ve))?$/ }, // silent e
  { match: /[^td]ed(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 1 }, // walked, played
  { match: /es(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 0, except: /([sxzcg]|ch|sh|[^aeiouy]l)es(?:['’](?:s|d|ll|re|ve))?$/ }, // cakes vs boxes/tables
  { match: /e(?=ment$|thing$|s?man$)/g, offset: 0 }, // movement, salesman
  { match: /['’][rv]e$/g, offset: 2 }, // we're, they've: suffix e adds no syllable
  { match: /qu(?=[aeiouy])/g, offset: 1 }, // consonantal u
  { match: /y(?=[aeiouy])/g, offset: 0 }, // consonantal y
]

// Possessive s represents an extra syllable after sibilants: horse's, church's.
const syllabicPossessive = /(?:[sxz]e?|[cs]h|[cg]e)['’]s$/

// Keep a boundary after these matched prefixes, even inside a vowel group.
const separate = [
  /^cre(?=at[eio])/, // create, creating (but not creature)
  /^re(?=act)/, // re-act and re-action
  /^flu(?=id)/, // flu-id, unlike fruit
  /^ru(?=in)/, // ru-in and ru-ined
]

// Match a bounded window around the current vowel: [i - before, i + after).
const joined = [
  // Common vowel pairs share a span unless a separate rule overrides them.
  { before: 1, after: 1, match: /^(ai|au|ay|ea|ee|ei|eu|ey|ie|oa|oe|oi|oo|ou|oy|ue|ui)$/ },
  { before: 3, after: 2, match: /^llion/ }, // million, unlike lion
  { before: 2, after: 3, match: /^[cst]i(?:on|an|al|ous)/ }, // nation, special, musician
  { before: 2, after: 1, match: /^eau$/ }, // extend ea to eau in beautiful
]

// Mark pronounced vowel groups before choosing any consonant boundaries.
const vowelSpan = word => {
  // Record ignored positions without deleting letters or shifting offsets.
  const silent = new Set()
  ignored.forEach(rule => {
    if (!rule.except || !rule.except.test(word)) {
      for (const match of word.matchAll(rule.match)) {
        silent.add(match.index + rule.offset)
      }
    }
  })
  // Forced separations take precedence over the joined-vowel rules below.
  const breaks = new Set()
  separate.forEach(pattern => {
    const match = pattern.exec(word)
    if (match) {
      breaks.add(match.index + match[0].length)
    }
  })
  // Spans use slice-compatible offsets: start is inclusive, end is exclusive.
  const groups = []
  const voicedPossessive = syllabicPossessive.test(word)
  for (let i = 0; i < word.length; i += 1) {
    const voiced = voicedPossessive && i === word.length - 1
    if ((!isVowel.test(word[i]) && !voiced) || silent.has(i)) {
      continue
    }
    const previous = groups[groups.length - 1]
    // Only adjacent pronounced vowels may extend an existing span.
    const blended =
      previous &&
      previous.end === i &&
      !breaks.has(i) &&
      joined.some(rule => rule.match.test(word.slice(Math.max(0, i - rule.before), i + rule.after)))
    if (blended) {
      previous.end = i + 1
    } else {
      groups.push({ start: i, end: i + 1 })
    }
  }
  return groups
}

export default vowelSpan
