let methods = {}

// allow helper methods like .adjectives() and .adverbs()
const arr = [
  ['terms', '.'],
  ['hyphenated', '@hasHyphen .'],
  // ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['emojis', '#Emoji'],
  ['emoticons', '#Emoticon'],
  ['atMentions', '#AtMention'],
  ['urls', '#Url'],
  ['adverbs', '#Adverb'],
  ['pronouns', '#Pronoun'],
  ['money', '#Money'],
  ['conjunctions', '#Conjunction'],
  ['prepositions', '#Preposition'],
  ['abbreviations', '#Abbreviation'],
]
arr.forEach(a => {
  methods[a[0]] = function(n) {
    let r = this.match(a[1])
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  }
})

/** return anything tagged as a phone number */
methods.phoneNumbers = function(n) {
  let r = this.splitAfter('@hasComma')
  r = r.match('#PhoneNumber+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}

module.exports = methods
