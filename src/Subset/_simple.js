let methods = {}

// allow helper methods like .adjectives() and .adverbs()
const arr = [
  ['terms', '.'],
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
arr.forEach(a => {
  methods[a[0]] = function (n) {
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
methods.words = methods.terms

/** return anything tagged as a phone number */
methods.phoneNumbers = function (n) {
  let m = this.splitAfter('@hasComma')
  m = m.match('#PhoneNumber+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

/** Deprecated: please use compromise-numbers plugin */
methods.money = function (n) {
  let m = this.match('#Money #Currency?')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

/** return all cities, countries, addresses, and regions */
methods.places = function (n) {
  // don't split 'paris, france'
  let keep = this.match('(#City && @hasComma) (#Region|#Country)')
  // but split the other commas
  let m = this.not(keep).splitAfter('@hasComma')
  // combine them back together
  m = m.concat(keep)
  m.sort('index')
  m = m.match('#Place+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

/** return all schools, businesses and institutions */
methods.organizations = function (n) {
  let m = this.clauses()
  m = m.match('#Organization+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

//combine them with .topics() method
methods.entities = function (n) {
  let r = this.clauses()
  // Find people, places, and organizations
  let yup = r.people()
  yup = yup.concat(r.places())
  yup = yup.concat(r.organizations())
  let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
  yup = yup.not(ignore)
  //return them to normal ordering
  yup.sort('sequence')
  // yup.unique() //? not sure
  if (typeof n === 'number') {
    yup = yup.get(n)
  }
  return yup
}
//aliases
methods.things = methods.entities
methods.topics = methods.entities

module.exports = methods
