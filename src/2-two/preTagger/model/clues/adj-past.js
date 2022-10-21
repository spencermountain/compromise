import adj from './_adj.js'

// the boiled egg
// boiled the water
let past = 'PastTense'

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
    Comparative: past,//closed higher
    Date: past,// alleged thursday
  },
  beforeWords: {
    be: past,//be hooked vs be embarrassed
    who: past,//who lost
    get: 'Adjective',//get charged
    had: past,
    has: past,
    have: past,
    been: past,
    it: past,//it intoxicated him
    as: past,//as requested
    for: 'Adjective',//for discounted items
  },
  afterWords: {
    by: past, //damaged by
    back: past, //charged back
    out: past, //charged out
    in: past, //crowded in
    up: past, //heated up
    down: past, //hammered down
    for: past, //settled for
    the: past, //settled the
    with: past, //obsessed with
    as: past, //known as
    on: past, //focused on
    at: past, //recorded at
  },
}

export default {
  beforeTags: Object.assign({}, adj.beforeTags, adjPast.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, adjPast.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, adjPast.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, adjPast.afterWords),
}