import test from 'tape'
import assertSpec from '../lib/spec.js'
const here = '[hmm/adverb-past] '

// Past-tense verbs that still read as adjectives, mostly after an adverb.
// Expected tags come from the language, not the tagger, so these lines fail today.
// '.' skips a word this line is not about.
const spec = `
# --- a noun subject, after an earlier verb in the clause
she said the walls really needed paint {Pronoun,Past,Det,Plural,Adv,Past,Noun}
I think it really needed work {Pronoun,Pres,Pronoun,Adv,Past,Noun}
when he arrived the walls really needed paint {.,Pronoun,Past,Det,Plural,Adv,Past,Noun}
that is what the walls really needed {.,Copula,.,Det,Plural,Adv,Past}

# --- 'who' as the subject
people who really needed help {Plural,.,Adv,Past,Noun}
the man who truly loved music {Det,Noun,.,Adv,Past,Noun}

# --- degree adverbs, and 'all', before a verb
he so loved that view {Pronoun,Adv,Past,Det,Noun}
I so needed a break {Pronoun,Adv,Past,Det,Noun}
they too failed {Pronoun,Adv,Past}
I much preferred tea {Pronoun,Adv,Past,Noun}
we all needed sleep {Pronoun,.,Past,Noun}

# --- no adverb at all
he worried about it {Pronoun,Past,Prep,Pronoun}
the campaign also produced and released the album {Det,Noun,Adv,Past,.,Past,Det,Noun}

# --- past forms that match their infinitive
he really hurt his knee {Pronoun,Adv,Past,Poss,Noun}
they really let him down {Pronoun,Adv,Past,Pronoun,.}
she really put him off {Pronoun,Adv,Past,Pronoun,.}
he really quit drinking {Pronoun,Adv,Past,.}

# --- the same adverb clue, on present-tense verbs
they really clean houses {Pronoun,Adv,Pres,Plural}
we really open early {Pronoun,Adv,Pres,.}

# --- the reverse: an adjective after a noun, read as a verb
with the kids excited we left {Prep,Det,Plural,Adj,Pronoun,Past}
with the walls damaged we left {Prep,Det,Plural,Adj,Pronoun,Past}
everyone interested should apply {.,Adj,.,Inf}
anyone interested may apply {.,Adj,.,Inf}
people affected will be paid {Plural,Adj,.,.,.}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
