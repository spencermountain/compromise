import person from './clues/person.js'
import date from './clues/date.js'
// person-names that can be dates
export default {
  clues: [person, date],
  fallback: 'Month',
  words: ['april', 'august', 'jan', 'january', 'june', 'may', 'sep', 'avril'],
}
