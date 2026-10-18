import tagWords from '../_lib.js'
import adj from './_adj.js'
import tags from '../../tagSet/aliases.js'

const { VBD: past, JJ: jj } = tags

// the boiled egg
// boiled the water

const adjPast = {
  beforeTags: {
    Adverb: past, //quickly detailed
    Pronoun: past, //he detailed
    ProperNoun: past, //toronto closed
    Auxiliary: past,
    Noun: past, //eye closed  -- i guess.
  },
  afterTags: {
    Possessive: past, //hooked him
    Pronoun: past, //hooked me
    Determiner: past, //hooked the
    Adverb: past, //cooked perfectly
    Comparative: past, //closed higher
    Date: past, // alleged thursday
    Gerund: past, //left dancing
  },
  beforeWords: {
    be: past, //be hooked vs be embarrassed
    who: past, //who lost
    get: jj, //get charged
    // being watched; it intoxicated him; as requested
    ...tagWords('had has have been being it as', past),
    for: jj, //for discounted items
    more: jj, //more broken promises
    always: jj,
  },
  afterWords: {
    // damaged by; charged back; charged out; crowded in; heated up; hammered down; settled for; settled the
    // obsessed with; known as; focused on; recorded at; settled between; dedicated to; pumped into
    // charged us; charged us; shared his
    ...tagWords(
      'by back out in up down before after for the with as on at between to into us them his her ' +
      'their our me',
      past
    ),
    about: jj,
  },
}

export default {
  beforeTags: { ...adj.beforeTags, ...adjPast.beforeTags },
  afterTags: { ...adj.afterTags, ...adjPast.afterTags },
  beforeWords: { ...adj.beforeWords, ...adjPast.beforeWords },
  afterWords: { ...adj.afterWords, ...adjPast.afterWords },
}
