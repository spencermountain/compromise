const jj = 'Adjective'

export default {
  beforeTags: {
    Determiner: jj, //the detailed
    // Copula: jj, //is detailed
    Possessive: jj, //spencer's detailed
  },

  afterTags: {
    // Noun: jj, //detailed plan, overwhelming evidence
    Adjective: jj, //intoxicated little
  },

  beforeWords: {
    seem: jj, //seem prepared
    seemed: jj,
    seems: jj,
    feel: jj, //feel prepared
    feels: jj,
    felt: jj,
    appear: jj,
    appears: jj,
    appeared: jj,
    also: jj,
    over: jj, //over cooked
    under: jj,
    too: jj, //too insulting
    it: jj, //find it insulting
    but: jj, //nothing but frustrating
    still: jj, //still scared
    // adverbs that are adjective-ish
    really: jj, //really damaged
    quite: jj,
    well: jj,
    very: jj,
    deeply: jj,
    // always: jj,
    // never: jj,
    profoundly: jj,
    extremely: jj,
    so: jj,
    badly: jj,
    mostly: jj,
    totally: jj,
    awfully: jj,
    rather: jj,
    nothing: jj, //nothing secret, 
    something: jj,//something wrong
    anything: jj,
  },
  afterWords: {
    too: jj, //insulting too
    also: jj, //insulting too
    or: jj, //insulting or
  },
}
