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

# Reviewed noun/verb rules: preserve predicates and ordinary modifiers.
some eat apples {Pronoun,Pres,Plural}
your dog smiles {Poss,Noun,Pres}
your guild colors {Poss,Noun,Plural}
the poor eat rice {Det,Adj,Pres,Noun}
a good read {Det,Adj,Noun}
a refreshing swim {Det,Adj,Noun}
she had put it there {Noun,Auxiliary,Participle,Noun,Adv}
she had time {Noun,Vb,Noun}
the western coast {Det,Adj,Noun}
near the lake we rested {Prep,Det,Noun,Noun,Past}
quiet the room {Inf,Det,Noun}
a kind teacher {Det,Adj,Noun}
some kind of teacher {Det,Noun,Prep,Noun}
a new kind {Det,Adj,Noun}
I do so well {Noun,Pres,Adv,Adv}
the doors close {Det,Plural,Pres}

# Passive evidence, honorific capitalization, and musical compounds.
he walked by the house {Noun,Past,Prep,Det,Noun}
the dog was walked by the man {Det,Noun,Copula,Past|Passive,Prep,Det,Noun}
I miss John {Noun,Pres,Person}
Miss John arrived {Honorific,Person,Past}
general John arrived {Honorific,Person,Past}
she can read music {Noun,Modal,Inf,Noun}
dance music {Noun,Noun}
we had been tired {Noun,Auxiliary,Copula,Adj}
we had been walking {Noun,Auxiliary,Auxiliary,Ger}
we had been tired by the journey {Noun,Auxiliary,Auxiliary,Past|Passive,Prep,Det,Noun}

# Adjective predicates and tense disambiguation.
he grew slowly impatient {Noun,Past,Adv,Adj}
quickly warm the room {Adv,Inf,Det,Noun}
she is free to leave {Noun,Copula,Adj,Conj,Inf}
his left hand hurts {Poss,Adj,Noun,Pres}
he left {Noun,Past}
can she read this? {Modal,Noun,Inf,Noun}
she read this {Noun,Past,Noun}
we have read this {Noun,Auxiliary,Participle,Noun}
we have running water {Noun,Vb,Adj,Noun}
she is happy and dancing {Noun,Copula,Adj,Conj,Ger}
rude and insulting {Adj,Conj,Adj}

# Retained rules have bounded, useful contexts.
the dog barks {Det,Noun,Pres}
the dog treats {Det,Noun,Plural}
would you please walk {Modal,Noun,Expr,Imperative}
can you swim? {Modal,Noun,Inf}
to the store {Prep,Det,Noun}
I want to walk {Noun,Pres,Conj,Inf}
dogs like bones {Plural,Pres,Plural}
he treated them like sons {Noun,Past,Noun,Prep,Plural}
veggies, like kale {Plural,Prep,Noun}
be late {Vb,Adj}
do not be late {Vb,Negative,Vb,Adj}
the wall is off white {Det,Noun,Copula,Adj,Adj}

`

test('rule scope', t => {
  const failing = nlp.testSpec(spec, false, false)
  t.deepEqual(failing.out('array'), [], 'tagging matches the rule-scope spec')
  t.end()
})
