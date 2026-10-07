import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/unit-noun] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# cm
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The gap measures two cm. {Det,Noun,Pres,Value,Unit}

# cup
The recipe needs one cup of flour. {Det,Noun,Pres,Value,Unit,Prep,Noun}
The cup fell from the shelf. {Det,Noun|!Unit,Past,Prep,Det,Noun}

# cups
She added two cups of flour. {Pronoun,Past,Value,Unit,Prep,Noun}
The cups were dirty. {Det,Plural|!Unit,Copula,Adj}

# feet
The wall rises six feet above us. {Det,Noun,Pres,Value,Unit,Prep,Pronoun}
Her feet hurt. {Poss,Plural|!Unit,Inf}

# foot
The shelf is one foot long. {Det,Noun,Copula,Value,Unit,Adj}
His foot was swollen. {Poss,Noun|!Unit,Copula,Adj}

# ft
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The cable measures ten ft. {Det,Noun,Pres,Value,Unit}
The FT published the interview. {Det,Organization,Past,Det,Noun}

# gal
The tank holds ten gal of water. {Det,Noun,Pres,Value,Unit,Prep,Noun}
That gal knows the answer. {Det,Noun|!Unit,Pres,Det,Noun}

# gb
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The drive stores eight gb of data. {Det,Noun,Pres,Value,Unit,Prep,Noun}
The athlete represents GB. {Det,Noun,Pres,Place|!Unit}

# hg
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The sample weighs two hg. {Det,Noun,Pres,Value,Unit}
The symbol Hg denotes mercury. {Det,Noun,Noun|!Unit,Pres,Noun}

# inch
# Non-measurement contrast is verbal; no separate non-unit noun sense supplied.
The gap measures one inch. {Det,Noun,Pres,Value,Unit}
We inch through the traffic. {Pronoun,Inf,Prep,Det,Noun}

# inches
# Non-measurement contrast is verbal; no separate non-unit noun sense supplied.
The board measures ten inches. {Det,Noun,Pres,Value,Unit}
The queue inches forward. {Det,Noun,Pres,Adv}

# k
# Non-unit example names the printed letter itself.
The sample reached ten k. {Det,Noun,Past,Value,Unit}
The printed k was illegible. {Det,Adj,Noun|!Unit,Copula,Adj}

# kelvin
The temperature rose by one kelvin. {Det,Noun,Past,Prep,Value,Unit}
Kelvin handed me the book. {Person,Past,Pronoun,Det,Noun}

# kg
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The package weighs two kg. {Det,Noun,Pres,Value,Unit}

# kb
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The file occupies ten kb. {Det,Noun,Pres,Value,Unit}

# km
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The road extends five km. {Det,Noun,Pres,Value,Unit}

# lb
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The parcel weighs one lb. {Det,Noun,Pres,Value,Unit}

# m
# Non-unit example names the printed letter itself.
The cable measures three m. {Det,Noun,Pres,Value,Unit}
The handwritten m looked like a wave. {Det,Adj,Noun|!Unit,Past,Prep,Det,Noun}

# mb
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The file occupies two mb. {Det,Noun,Pres,Value,Unit}

# mg
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The tablet contains ten mg of medicine. {Det,Noun,Pres,Value,Unit,Prep,Noun}
She drove an MG to the coast. {Pronoun,Past,Det,Noun|!Unit,Prep,Det,Noun}

# mi
The trail extends two mi. {Det,Noun,Pres,Value,Unit}
The choir sang mi softly. {Det,Noun,Past,Noun|!Unit,Adv}

# hz
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The tone oscillates at sixty hz. {Det,Noun,Pres,Prep,Value,Unit}

# mps
The vehicle travels at ten mps. {Det,Noun,Pres,Prep,Value,Unit}
The MPs debated the bill. {Det,Noun|!Unit,Past,Det,Noun}

# miles
The road extends five miles. {Det,Noun,Pres,Value,Unit}
Miles arrived early. {Person,Past,Adv}

# ml
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The vial holds ten ml. {Det,Noun,Pres,Value,Unit}
She studies ML at university. {Pronoun,Pres,Noun|!Unit,Prep,Noun}

# mm
# Non-unit contrast is an interjection, not a noun.
The gap measures three mm. {Det,Noun,Pres,Value,Unit}
Mm, that tastes good. {Expression,Pronoun,Pres,Adj}

# mph
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The car travels at thirty mph. {Det,Noun,Pres,Prep,Value,Unit}
She earned an MPH in public health. {Pronoun,Past,Det,Noun|!Unit,Prep,Adj,Noun}

# newton
The force increased by one newton. {Det,Noun,Past,Prep,Value,Unit}
Newton called his sister. {Person,Past,Poss,Noun}

# newtons
The spring exerts five newtons. {Det,Noun,Pres,Value,Unit}
The Newtons invited us to dinner. {Det,Person,Past,Pronoun,Prep,Noun}

# oz
The package weighs two oz. {Det,Noun,Pres,Value,Unit}
The travelers reached Oz. {Det,Noun,Past,Place|!Unit}

# pa
The pressure rose by ten pa. {Det,Noun,Past,Prep,Value,Unit}
My pa repaired the gate. {Poss,Noun|!Unit,Past,Det,Noun}

# pt
The jug holds one pt. {Det,Noun,Pres,Value,Unit}
The patient began PT after surgery. {Det,Noun,Past,Noun|!Unit,Prep,Noun}

# px
The border measures two px. {Det,Noun,Pres,Value,Unit}
The soldier shopped at the PX. {Det,Noun,Past,Prep,Det,Noun|!Unit}

# qt
# Capitalization distinguishes the non-unit name, symbol, or abbreviation.
The bottle holds one qt. {Det,Noun,Pres,Value,Unit}
She develops software with Qt. {Pronoun,Pres,Noun,Prep,Noun|!Unit}

# tablespoon
She added one tablespoon of oil. {Pronoun,Past,Value,Unit,Prep,Noun}
The tablespoon fell into the sink. {Det,Noun|!Unit,Past,Prep,Det,Noun}

# tablespoons
The recipe requires two tablespoons of sugar. {Det,Noun,Pres,Value,Unit,Prep,Noun}
The tablespoons need washing. {Det,Plural|!Unit,Inf,Noun}

# tb
The server stores two tb of data. {Det,Noun,Pres,Value,Unit,Prep,Noun}
The doctor diagnosed TB. {Det,Noun,Past,Noun|!Unit}

# tbl
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The recipe requires one tbl of oil. {Det,Noun,Pres,Value,Unit,Prep,Noun}

# tbsp
# No distinct ordinary non-unit noun sense supplied; measurement use only.
She added one tbsp of oil. {Pronoun,Past,Value,Unit,Prep,Noun}

# teaspoon
She measured one teaspoon of salt. {Pronoun,Past,Value,Unit,Prep,Noun}
She polished the silver teaspoon. {Pronoun,Past,Det,Adj,Noun|!Unit}

# teaspoons
The recipe requires two teaspoons of sugar. {Det,Noun,Pres,Value,Unit,Prep,Noun}
The teaspoons lay beside the cups. {Det,Plural|!Unit,Past,Prep,Det,Plural}

# tsp
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The recipe needs one tsp of salt. {Det,Noun,Pres,Value,Unit,Prep,Noun}

# yard
The ribbon measures one yard. {Det,Noun,Pres,Value,Unit}
The dog played in the yard. {Det,Noun,Past,Prep,Det,Noun|!Unit}

# yards
The fence extends ten yards. {Det,Noun,Pres,Value,Unit}
The yards behind the houses were small. {Det,Plural|!Unit,Prep,Det,Noun,Copula,Adj}

# yd
# No distinct ordinary non-unit noun sense supplied; measurement use only.
The cloth measures one yd. {Det,Noun,Pres,Value,Unit}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
