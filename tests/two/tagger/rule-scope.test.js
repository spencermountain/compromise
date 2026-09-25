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


# Adjective/adverb review: verbal complements and comparative adverbs.
she does better {Noun,Pres,Adv}
she does worse {Noun,Pres,Adv}
she does mean it {Noun,Vb,Inf,Noun}
she got accused of theft {Noun,Vb,Past|Passive,Prep,Noun}
she got tired of waiting {Noun,Vb,Adj,Prep,Noun}
she laughed or played music {Noun,Past,Conj,Past,Noun}
the fear or heightened emotion {Det,Noun,Conj,Adj,Noun}
display of fear or heightened emotion {Noun,Prep,Noun,Conj,Adj,Noun}
it feels hard {Noun,Pres,Adj}
she runs fast {Noun,Pres,Adv}
she came to a close {Noun,Past,Prep,Det,Noun}
a close friend {Det,Adj,Noun}
she was happy and smiled {Noun,Copula,Adj,Conj,Past}
she was tired and overworked {Noun,Copula,Adj,Conj,Adj}
the meal was bland and overcooked {Det,Noun,Copula,Adj,Conj,Adj}

# Useful adjective rules retained.
he felt cheated {Noun,Past,Adj}
a bit confused {Det,Noun,Adj}
as fit as a fiddle {Prep,Adj,Prep,Det,Noun}
their declared intentions {Poss,Adj,Plural}


# Commands must occur in command context, not embedded statements.
you should help yourself {Noun,Modal,Inf,Noun}
help yourself {Imperative,Noun}
and then allow yourself a time {Conj,Adv,Imperative,Noun,Det,Noun}
I know what happened {Noun,Inf,QuestionWord,Past}
look what happened {Imperative,QuestionWord,Past}
they do not forget to eat {Noun,Auxiliary,Negative,Inf,Conj,Inf}
do not forget to clean {Vb,Negative,Inf,Conj,Imperative}
she went out dancing {Noun,Past,Prep,Ger}
we will out run the monster {Noun,Modal,Prefix,Inf,Det,Noun}

# Evaluative adjectives versus actions; purpose infinitives versus destinations.
we found it attacking birds {Noun,Past,Noun,Ger,Plural}
we found it interesting {Noun,Past,Noun,Adj}
they are considering buying houses {Noun,Auxiliary,Ger,Ger,Plural}
we are repairing crumbling roads {Noun,Auxiliary,Ger,Adj,Plural}
she goes to eat {Noun,Pres,Conj,Inf}
she goes to sleep {Noun,Pres,Prep,Noun}
we go to watch birds {Noun,Inf,Conj,Inf,Plural}
we go to market {Noun,Inf,Prep,Noun}
they make do {Noun,PhrasalVerb,Particle}
they make sense {Noun,Inf,Noun}
is it me? {Copula,Pronoun,Pronoun}
Google me {Vb,Pronoun}
the fact that dogs bark {Det,Noun,Conj,Plural,Inf}
the thing that runs {Det,Noun,Conj,Pres}
take a walk or sing {Imperative,Det,Noun,Conj,Inf}
work or prepare {Inf,Conj,Inf}
his fine clothes {Poss,Adj,Noun}
his fine {Poss,Noun}
the rights of man {Det,Plural,Prep,Noun}

# Name ambiguity retains lexical names while respecting ordinary verbs.
we rob John {Noun,Inf,Person}
we rob London {Noun,Inf,City}
rob smith {Person,Person}
Ollie Faroo {Person,Person}
jack the ripper {Person,Person,Person}
only Mark arrived {Adv,Person,Past}
really wade {Adv,Vb}
Will walked home {Person,Past,Noun}
we will walk home {Noun,Modal,Inf,Noun}
she is watching Smith {Noun,Auxiliary,Ger,Person}

# Abbreviations, food, and dates need distinguishing context.
Portland or Seattle {City,Conj,City}
Portland OR {City,Region}
we negotiated with Turkey {Noun,Past,Prep,Country}
a sandwich with turkey {Det,Noun,Prep,Uncountable}
at about noon {Prep,Adv,Noun}
long live the king {Adv,Inf,Det,Noun}
shoot the ball {Imperative,Det,Noun}
shoot! {Expr}
shoot, I forgot {Expr,Noun,Past}
we sat yesterday {Noun,Past,Date}
sat november {WeekDay,Month}
early May {Adj,Month}
late March {Adj,Month}
quickly march {Adv,Vb}

# Negation does not turn liking into resemblance.
I never like spinach {Noun,Negative,Inf,Noun}
I do not like spinach {Noun,Auxiliary,Negative,Inf,Noun}
she is not like me {Noun,Copula,Negative,Prep,Noun}
nothing like it {Noun,Prep,Noun}
some sort of problem {Det,Noun,Prep,Noun}
a dog of some sort {Det,Noun,Prep,Det,Noun}
the dog is walked {Det,Noun,Auxiliary,Past|Passive}
the door is closed {Det,Noun,Copula,Adj}

`

test('rule scope', t => {
  const failing = nlp.testSpec(spec, false, false)
  t.deepEqual(failing.out('array'), [], 'tagging matches the rule-scope spec')
  t.end()
})
