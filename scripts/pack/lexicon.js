import { pack } from 'efrt'
import lexicon from '../../data/lexicon/index.js'

// Preserve expansion precedence independently of source-list insertion order.
// Removing an overwritten word must not reorder tag groups and change which
// generated conjugation wins. New tags are appended after these existing groups.
const lexiconTagOrder = [
  'Comparative', 'Superlative', 'PresentTense', 'Condition', 'PastTense', 'Participle',
  'Gerund', 'Expression', 'Negative', 'QuestionWord', 'Reflexive', 'Plural',
  'Unit|Noun', 'Value', 'Imperative', 'Plural|Verb', 'Demonym', 'Organization',
  'Possessive', 'Noun|Verb', 'Actor', 'Adj|Noun', 'Adj|Past', 'Singular',
  'Person|Noun', 'Actor|Verb', 'MaleName', 'Uncountable', 'Infinitive', 'Person',
  'Adjective', 'Pronoun', 'Preposition', 'SportsTeam', 'Unit', 'Noun|Gerund',
  'PhrasalVerb', 'ProperNoun', 'Person|Place', 'LastName', 'Ordinal', 'Cardinal',
  'Multiple', 'City', 'Region', 'Place', 'Country', 'FirstName', 'WeekDay', 'Month',
  'Date', 'Duration', 'FemaleName', 'Honorific', 'Adj|Gerund', 'Comparable',
  'Adverb', 'Conjunction', 'Currency', 'Determiner', 'Adj|Present', 'Person|Adj',
  'Modal', 'Verb', 'Person|Verb', 'Person|Date',
]

const packLexicon = () => {
  const packed = {}
  //turn them into a series of flat-arrays
  Object.keys(lexicon).forEach(word => {
    let tags = lexicon[word]
    if (typeof tags === 'string') {
      tags = [tags]
    }
    tags.forEach(tag => {
      packed[tag] = packed[tag] || []
      packed[tag].push(word)
    })
  })
  // Pack in a stable order, rather than the order words first appeared.
  const result = {}
  const tags = new Set([...lexiconTagOrder, ...Object.keys(packed)])
  tags.forEach(tag => {
    if (packed[tag]) {
      result[tag] = pack(packed[tag], { strict: true, dictionary: true, direction: 'auto' })
    }
  })
  return result
}

export default packLexicon
