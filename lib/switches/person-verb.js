import person from './clues/person.js'
import verb from './clues/verb.js'

// words that can be a verb or a person's name
export default {
  clues: [person, verb],
  fallback: 'Person', //maybe?
  words: ['drew', 'pat', 'wade', 'ollie', 'will', 'rob', 'buck', 'sue', 'bob', 'mark', 'jack', 'chuck', 'mack'],
}
