const n = 'Singular'
export default {
  beforeTags: {
    Determiner: n, //the date
    Possessive: n, //his date
    Acronym: n,//u.s. state
    // ProperNoun:n,
    Noun: n, //nasa funding
    Adjective: n, //whole bottles
    // Verb:true, //save storm victims
    PresentTense: n, //loves hiking
    Gerund: n, //uplifting victims
    PastTense: n, //saved storm victims
    Infinitive: n, //profess love
    Date: n,//9pm show
  },
  afterTags: {
    Value: n, //date nine  -?
    Modal: n, //date would
    Copula: n, //fear is
    PresentTense: n, //babysitting sucks
    PastTense: n, //babysitting sucked
    // Noun:n, //talking therapy, planning process
    Demonym: n//american touch
  },
  // ownTags: { ProperNoun: n },
  beforeWords: {
    the: n,//the brands
    with: n,//with cakes
    without: n,//
    // was:n, //was time  -- was working
    // is:n, //
    of: n, //of power
    for: n, //for rats
    any: n, //any rats
    all: n, //all tips
    on: n, //on time
    // thing-ish verbs
    cut: n,//cut spending
    cuts: n,//cut spending
    save: n,//
    saved: n,//
    saves: n,//
    make: n,//
    makes: n,//
    made: n,//
    minus: n,//minus laughing
    plus: n,//
    than: n,//more than age
    another: n,//
    versus: n,//
    neither: n,//
    // strong adjectives
    favorite: n,//
    best: n,//
    daily: n,//
    weekly: n,//
  },
  afterWords: {
    of: n, //date of birth (preposition)
    system: n,
    aid: n,
    method: n,
    utility: n,
    tool: n,
    reform: n,
    therapy: n,
    philosophy: n,
    room: n,
    authority: n,
    says: n,
    said: n,
    wants: n,
    wanted: n,
  },
}
