import aliases from './aliases.js'
import { lexicon, abbreviations } from './lexicon.js'

export default {
  one: {
    aliases,
    abbreviations,
  },
  two: {
    lexicon, //give this one forward
  },
}
