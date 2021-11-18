export default {
  beforeTags: {
    Honorific: true,
    Person: true,
    Preposition: true, //with sue
  },
  afterTags: {
    Person: true,
    ProperNoun: true,
    Verb: true, //bob could
    // Modal:true, //bob could
    // Copula:true, //bob is
    // PresentTense:true, //bob seems
  },
  ownTags: {
    ProperNoun: true, //capital letter
  },
  beforeWords: {
    hi: true,
    hey: true,
    yo: true,
    dear: true,
    hello: true,
  },
  afterWords: {
    // person-usually verbs
    said: true,
    says: true,
    told: true,
    tells: true,
    feels: true,
    felt: true,
    seems: true,
    thinks: true,
    thought: true,
    spends: true,
    spendt: true,
    plays: true,
    played: true,
    sing: true,
    sang: true,
    learn: true,
    learned: true,
    // and:true, //sue and jeff
  },
}
