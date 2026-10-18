import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { VBG: g } = tags

// Adj|Gerund
// Noun|Gerund

export default {
  beforeTags: {
    // Verb: g, // loves shocking
    Adverb: g, //quickly shocking
    Connector: g, //by insulting, if swimming
  },
  afterTags: {
    Adverb: g, //shocking quickly
    Possessive: g, //shocking spencer's
    Person: g, //telling spencer
    Pronoun: g, //shocking him
    Determiner: g, //shocking the
    Copula: g, //shocking is
    Connector: g, //swimming in, swimming and running
    Comparative: g, //growing shorter
  },
  beforeWords: {
    // keep going; am watching; be timing; got me thinking
    ...tagWords('been keep continue stop am be me', g),
    // action-words
    // love painting
    ...tagWords(
      'began start starts started stops stopped help helps avoid avoids love loves loved hate ' +
      'hates hated',
      g
    ),
    // was:g,//was working
    // is:g,
    // be:g,
  },
  afterWords: tagWords(
    // telling you; fighting their; dumping it; running this; swimming there; landing on; talking about
    // paying for; speeding up
    'you me her him his them their it this there on about for up down', g,
  ),
}
