import { phoneNumbers, organizations, entities } from './find.js'

// setup easy helper methods
const selections = [
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
  ['things', 'entities'],
  ['topics', 'entities'],
]

const addMethods = function (View) {
  // add a list of new helper methods
  selections.forEach(a => {
    View.prototype[a[0]] = function (n) {
      let m = this.match(a[1])
      return typeof n === 'number' ? m.get(n) : m
    }
  })
  View.prototype.phoneNumbers = phoneNumbers
  View.prototype.organizations = organizations
  View.prototype.entities = entities
  // add aliases
  aliases.forEach(a => {
    View.prototype[a[0]] = View.prototype[a[1]]
  })
}

export default addMethods
