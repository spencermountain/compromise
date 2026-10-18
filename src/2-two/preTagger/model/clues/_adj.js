import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { JJ: jj } = tags

export default {
  beforeTags: {
    Determiner: jj, //the detailed
    // Copula: jj, //is detailed
    Possessive: jj, //spencer's detailed
    Hyphenated: jj, //rapidly-changing
  },

  afterTags: {
    // Noun: jj, //detailed plan, overwhelming evidence
    Adjective: jj, //intoxicated little
  },

  beforeWords: {
    // seem prepared; feel prepared; over cooked; too insulting; find it insulting; nothing but frustrating
    // still scared
    ...tagWords(
      'seem seemed seems feel feels felt stay appear appears appeared also over under too it but ' +
      'still',
      jj
    ),
    // adverbs that are adjective-ish
    // really damaged; how slow
    ...tagWords('really quite well very truly how deeply hella', jj),
    // always: jj,
    // never: jj,
    // nothing secret,; something wrong; not swell; called me swell
    ...tagWords(
      'profoundly extremely so badly mostly totally awfully rather nothing something anything not ' +
      'me is',
      jj
    ),

    face: jj, //faces shocking revelations
    faces: jj,
    faced: jj,

    look: jj,
    looks: jj,
    looked: jj,

    reveal: jj,
    reveals: jj,
    revealed: jj,

    // would prove shocking
    ...tagWords('sound sounded sounds remains remained prove proves proved', jj),

    // gets shocking snowfall
    ...tagWords(
      'becomes stays tastes taste smells smell gets grows as rings radiates conveys convey ' +
      'conveyed of',
      jj
    ),
    // 'smacks of': jj,
    // 'reeks of': jj,
  },
  afterWords: tagWords(
    // insulting too; insulting too; insulting or; cool enough; as shocking as
    //about: jj, //cool about
    'too also or enough as', jj,
  ),
}
