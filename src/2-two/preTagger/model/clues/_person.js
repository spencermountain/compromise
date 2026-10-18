import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { Person: p } = tags

export default {
  beforeTags: {
    Honorific: p,
    Person: p,
    // Preposition: p, //with sue
  },
  afterTags: {
    Person: p,
    ProperNoun: p,
    Verb: p, //bob could
    // Modal:true, //bob could
    // Copula:true, //bob is
    // PresentTense:true, //bob seems
  },
  ownTags: {
    ProperNoun: p, //capital letter
  },
  beforeWords: tagWords('hi hey yo dear hello', p),
  afterWords: tagWords(
    // person-usually verbs
    // and:true, //sue and jeff
    'said says told tells feels felt seems thinks thought spends spendt plays played sing sang ' +
      'learn learned wants wanted', p,
  ),
}
