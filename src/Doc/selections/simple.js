// allow helper methods like .adjectives() and .adverbs()
const arr = [
  ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['atMentions', '#AtMention'],
  ['emoji', '#Emoji'],
  ['urls', '#Url'],
  ['adverbs', '#Adverb'],
  ['pronouns', '#Pronoun'],
  ['acronyms', '#Acronym'],
  ['fractions', '#Fraction'],
  ['money', '#Money'],
  ['months', '#Month'],
  ['years', '#Year'],
  ['conjunctions', '#Conjunction'],
  ['prepositions', '#Preposition'],
  ['abbreviations', '#Abbreviation'],
  ['romanNumerals', '#RomanNumeral'],
  ['firstNames', '#FirstName'],
  ['lastNames', '#LastName'],
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
