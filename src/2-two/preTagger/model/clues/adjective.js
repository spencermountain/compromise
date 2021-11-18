
// adjPresent.beforeTags.Adverb = 'Adjective'
// adjPresent.beforeTags.Negative = 'Adjective'
// adjPresent.beforeTags.Plural = 'Adjective'
// // adjPresent.afterTags.Determiner = 'Adjective'
// // adjPresent.afterTags.Adverb = 'Adjective'
// // adjPresent.afterTags.Conjunction = 'Adjective'
// // adjPresent.afterTags.Possessive = 'Adjective'
// adjPresent.afterTags = {}
// adjPresent.beforeWords.have = 'Adjective'
// adjPresent.beforeWords.had = 'Adjective'
// adjPresent.beforeWords.do = 'Adjective'
// adjPresent.beforeWords.does = 'Adjective'
// adjPresent.afterWords.from = 'Adjective'

// adjGerund.beforeWords.is = 'Adjective'
// adjGerund.beforeWords.was = 'Adjective'
// adjGerund.beforeWords.be = 'Adjective'

export default {
  beforeTags: {
    Determiner: true, //the detailed
    Copula: true, //is detailed
    Possessive: true, //spencer's detailed
  },

  afterTags: {
    Noun: true, //detailed plan, overwhelming evidence
    Adjective: true, //intoxicated little
  },

  beforeWords: {
    seem: true, //seem prepared
    seemed: true,
    seems: true,
    feel: true, //feel prepared
    feels: true,
    felt: true,
    appear: true,
    appears: true,
    appeared: true,
    really: true, //really damaged
    quite: true,
    well: true,
    very: true,
    deeply: true,
    profoundly: true,
    extremely: true,
    so: true,
    badly: true,
    mostly: true,
    totally: true,
    also: true,
    over: true, //over cooked
    under: true,
    too: true, //too insulting
    it: true, //find it insulting
    but: true, //nothing but frustrating
    still: true, //still scared
  },
  afterWords: {
    too: true, //insulting too
    also: true, //insulting too
    or: true, //insulting or
  },
}
