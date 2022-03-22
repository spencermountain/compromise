import aliases from './aliases.js'
import { lexicon, abbreviations } from './lexicon.js'
import prefixes from './prefixes.js'
import suffixes from './suffixes.js'
import unicode from './unicode.js'

export default {
  one: {
    aliases,
    abbreviations,
    prefixes,
    suffixes,
    lexicon, //give this one forward
    unicode,
  },
}
