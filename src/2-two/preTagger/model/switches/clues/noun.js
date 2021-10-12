const nn = 'Singular'

export default {
  before: {
    Determiner: nn, //the date
    Possessive: nn, //his date
    Noun: nn, //nasa funding
  },
  after: {
    Value: nn, //date nine  -?
    Modal: nn, //date would
    Copula: nn, //fear is
  },
  ownTags: { ProperNoun: nn },
  beforeWords: {
    was: nn, //was time
    is: nn, //
  },
  afterWords: {
    of: nn, //date of birth (preposition)
  },
}
