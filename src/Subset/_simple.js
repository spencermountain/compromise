let methods = {}

// allow helper methods like .adjectives() and .adverbs()
const arr = [
  ['terms', '.'],
  ['hyphenated', '@hasHyphen .'],
  // ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['emoji', '#Emoji'],
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
    let m = this.match(a[1])
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return m
  }
})
// aliases
methods.emojis = methods.emoji
methods.atmentions = methods.atMentions

/** return anything tagged as a phone number */
methods.phoneNumbers = function(n) {
  let m = this.splitAfter('@hasComma')
  m = m.match('#PhoneNumber+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

module.exports = methods
