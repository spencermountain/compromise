import {
  Poss, PRP, Organization, SportsTeam, Date, Unit, Conj, Cop, VBD, Pres, Abbreviation, JJR, JJS,
  MD, VBG,
} from '../../tagSet/_lib.js'

const prp = [Poss, PRP]
// Unpacked spellings and explicit multi-tag entries, plus conjugation exceptions.
// Ordinary words supplied by data/lexicon must not be repeated here.
const misc = {
  // numbers
  '20th century fox': Organization,
  '7 eleven': Organization,
  'motel 6': Organization,
  '23andme': Organization,
  '4chan': Organization,
  'yahoo!': Organization,

  u2: Organization,
  g8: Organization,
  vh1: Organization,
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
  'at&t': Organization,
  'black & decker': Organization,
  'h & m': Organization,
  'johnson & johnson': Organization,
  'procter & gamble': Organization,
  "ben & jerry's": Organization,
  '&': Conj,

  // copulas
  was: [Cop, VBD],
  is: [Cop, Pres],
  are: [Cop, Pres],
  am: [Cop, Pres],
  were: [Cop, VBD],

  // possessive pronouns
  her: prp,
  his: prp,
  hers: prp,
  their: prp,
  theirs: prp,
  your: prp,

  // misc
  vs: [Conj, Abbreviation],
  closer: JJR,
  closest: JJS,
  may: MD,

  // irregular conjugations with two forms
  babysat: VBD,
  blew: VBD,
  drank: VBD,
  drove: VBD,
  forgave: VBD,
  skiied: VBD,
  stung: VBD,
  swam: VBD,
  swung: VBD,
  guaranteed: VBD,

  // support 'near', 'nears', 'nearing'
  nears: Pres,
  nearing: VBG,
  neared: VBD,

}
export default misc
