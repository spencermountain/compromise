import {
  Poss, Pron, Org, SportsTeam, Date, Unit, Conj, Cop, Past, Pres, Abbr, Comp, Sup,
  Mod, Ger,
} from '../../tagSet/_lib.js'

const prp = [Poss, Pron]
// Unpacked spellings and explicit multi-tag entries, plus conjugation exceptions.
// Ordinary words supplied by data/lexicon must not be repeated here.
const misc = {
  // numbers
  '20th century fox': Org,
  '7 eleven': Org,
  'motel 6': Org,
  '23andme': Org,
  '4chan': Org,
  'yahoo!': Org,

  u2: Org,
  g8: Org,
  vh1: Org,
  '76ers': SportsTeam,
  '49ers': SportsTeam,

  q1: Date,
  q2: Date,
  q3: Date,
  q4: Date,

  km2: Unit,
  m2: Unit,
  dm2: Unit,
  cm2: Unit,
  mm2: Unit,
  mile2: Unit,
  in2: Unit,
  yd2: Unit,
  ft2: Unit,
  m3: Unit,
  dm3: Unit,
  cm3: Unit,
  in3: Unit,
  ft3: Unit,
  yd3: Unit,

  // ampersands
  'at&t': Org,
  'black & decker': Org,
  'h & m': Org,
  'johnson & johnson': Org,
  'procter & gamble': Org,
  "ben & jerry's": Org,
  '&': Conj,

  // copulas
  was: [Cop, Past],
  is: [Cop, Pres],
  are: [Cop, Pres],
  am: [Cop, Pres],
  were: [Cop, Past],

  // possessive pronouns
  her: prp,
  his: prp,
  hers: prp,
  their: prp,
  theirs: prp,
  your: prp,

  // misc
  vs: [Conj, Abbr],
  closer: Comp,
  closest: Sup,
  may: Mod,

  // irregular conjugations with two forms
  babysat: Past,
  blew: Past,
  drank: Past,
  drove: Past,
  forgave: Past,
  skiied: Past,
  stung: Past,
  swam: Past,
  swung: Past,
  guaranteed: Past,

  // support 'near', 'nears', 'nearing'
  nears: Pres,
  nearing: Ger,
  neared: Past,

}
export default misc
