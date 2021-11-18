
// more-effort clues used in Adjective|PresentTense
export default {
  beforeTags: {
    Adverb: true,
    Negative: true,
    Plural: true,
  },

  afterTags: {
    Determiner: true,
    Adverb: true,
    Conjunction: true,
    Possessive: true,
  },

  beforeWords: {
    have: true,
    had: true,
    do: true,
    does: true,
    is: true,
    was: true,
    be: true,
  },
  afterWords: {
    from: true
  },
}