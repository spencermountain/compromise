// allow helper methods like .adjectives() and .adverbs()
const arr = [
  // ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['atMentions', '#AtMention'],
  ['urls', '#Url'],
  ['adverbs', '#Adverb'],
  ['pronouns', '#Pronoun'],
  ['fractions', '#Fraction'],
  ['money', '#Money'],
  ['conjunctions', '#Conjunction'],
  ['prepositions', '#Preposition'],
  ['abbreviations', '#Abbreviation'],
  // ['romanNumerals', '#RomanNumeral'],
]
let methods = {}
arr.forEach(a => {
  methods[a[0]] = function(n) {
    let r = this.match(a[1])
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  }
})
module.exports = methods
