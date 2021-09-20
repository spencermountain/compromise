const p = 'Person'

export default {
  before: {
    Honorific: p,
    Person: p,
  },
  after: {
    Person: p,
    ProperNoun: p,
  },
  beforeWords: {},
  afterWords: {
    // person-usually verbs
    said: p,
    says: p,
    told: p,
    tells: p,
    feels: p,
    felt: p,
    thinks: p,
    thought: p,
    spends: p,
    spendt: p,
    plays: p,
    played: p,
    sing: p,
    sang: p,
    learn: p,
    learned: p,
  },
}
