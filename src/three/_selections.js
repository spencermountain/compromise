// allow helper methods like .adjectives() and .adverbs()
const selections = [
  // ['terms', '.'],
  ['hyphenated', '@hasHyphen .'],
  ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['emoji', '#Emoji'],
  ['emoticons', '#Emoticon'],
  ['atMentions', '#AtMention'],
  ['urls', '#Url'],
  ['adverbs', '#Adverb'],
  ['pronouns', '#Pronoun'],
  ['conjunctions', '#Conjunction'],
  ['prepositions', '#Preposition'],
]

// aliases
let aliases = [
  ['emojis', 'emoji'],
  ['atmentions', 'atMentions'],
  ['words', 'terms'],
]
const addSelections = function (world, View) {
  selections.forEach(a => {
    View.prototype[a[0]] = function () {
      return this.match(a[1])
    }
  })
  aliases.forEach(a => {
    View.prototype[a[0]] = View.prototype[a[1]]
  })
}

export default addSelections
