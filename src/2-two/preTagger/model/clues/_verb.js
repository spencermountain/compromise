import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { Inf: v } = tags

export default {
  beforeTags: {
    Modal: v, //would date
    Adverb: v, //quickly date
    Negative: v, //not date
    Plural: v, //characters drink
    // ProperNoun: vb,//google thought
  },
  afterTags: {
    Determiner: v, //flash the
    Adverb: v, //date quickly
    Possessive: v, //date his
    Reflexive: v, //resolve yourself
    // Noun:true, //date spencer
    Preposition: v, //date around, dump onto, grumble about
    // Conjunction: v, // dip to, dip through
    Cardinal: v, //cut 3 squares
    Comparative: v, //feel greater
    Superlative: v, //feel greatest
  },
  beforeWords: {
    // i date; we date; you date; they date; to date; please check; will check; help combat
    ...tagWords(
      'i we you they to please will have had would could come should do did does can must us me ' +
      'let even when help',
      v
    ),
    // them: v,
    ...tagWords('he she it being', v),
    // prefixes
    ...tagWords('bi co contra de inter intra mis pre out counter nobody somebody anybody everybody', v),
    // un: v,
    // over: v,
    // under: v,
    // now dance; go dance; he said run; simon says run; they say run; who runs faster; what runs faster
    ...tagWords('now go said says say who what', v),
    // most: v, //most run faster
    // some: v, //some run faster
  },
  afterWords: {
    // echo the; date me; date you; loves him; cost us; hope it
    ...tagWords(
      'the me you him us her his them they it himself herself itself myself ourselves themselves ' +
      'something anything',
      v
    ),

    a: v, //covers a
    an: v, //covers an
    // from: v, //ranges from
    up: v, //serves up
    down: v, //serves up
    by: v,
    // in: v, //bob in
    out: v,
    // on: v,
    off: v,
    under: v,
    what: v, //look what
    // when: v,//starts when
    // for:true, //settled for
    all: v, //shiver all night
    // conjunctions
    to: v, //dip to
    because: v, //
    although: v, //
    // after: v,
    // before: v,//
    // fit together; kill more; look here; float away; dance now
    ...tagWords('how otherwise together though into yet more here there away now', v),
  },
}
