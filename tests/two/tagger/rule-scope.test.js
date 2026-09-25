import test from 'tape'
import nlp from '../_lib.js'

const spec = `
# Fractions leave the following preposition outside the number phrase.
He finished one third of the race. {Noun,Past,Fraction,Fraction,Prep,Det,Noun}
a twenty fifth of it {Fraction,Fraction,Fraction,Prep,Noun}

# Government names include the head, but not the leading article.
the government of India {Det,Organization,Organization,Organization}

# Comparisons preserve plural objects; ordinary verb uses still work.
The planet has moons a lot like ours. {Det,Noun,Pres,Plural,Adv,Adv,Prep,Poss}
He studies a lot. {Noun,Pres,Adv,Adv}
He studies a lot today. {Noun,Pres,Adv,Adv,Date}

# Articles and coordinated first names alone do not imply organizations.
They saw the DNA. {Noun,Past,Det,Acronym}
They measured the CPU. {Noun,Past,Det,Acronym}
John & Mary went home. {Person,Conj,Person,Past,Noun}

# Company suffixes, surname pairs, and known organizations remain recognized.
the John & Mary Ltd {Det,Organization,Organization,Organization,Organization}
the Smith & Rogers {Det,Organization,Organization,Organization}
the XYZ corporation {Det,Organization,Organization}
the FBI {Det,Organization}
`

test('rule scope', t => {
  const failing = nlp.testSpec(spec, false, false)
  t.deepEqual(failing.out('array'), [], 'tagging matches the rule-scope spec')
  t.end()
})
