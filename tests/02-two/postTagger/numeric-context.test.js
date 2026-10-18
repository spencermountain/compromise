import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/numeric-context] '

test(here + 'numbers, money and units', t => {
  assertSpec(t, `
# index.js: numbers, money and units
5 rand. {Money,Currency}
A pound. {Value,Unit}
3 pounds. {Value,Unit}
Quarter of a dollar. {Fraction,Prep,Det,Currency}
Two and a half. {Value,Value,Value,Value}
Two-halves. {Value,Value}
Seven fifths. {Fraction,Fraction}
One third of it. {Fraction,Fraction,Prep,Pronoun}
100th of it. {Fraction,Prep,Pronoun}
A twenty fifth of it. {Fraction,Fraction,Fraction,Prep,Pronoun}
A sixteenth. {Fraction,Fraction}
One twenty fifth. {Fraction,Fraction,Fraction}
3 out of 5. {Value,Value,Value,Value}
With a hundred jobs. {Prep,Value,Value,Plural}
With a thousand jobs. {Prep,Value,Value,Plural}
With a million jobs. {Prep,Value,Value,Plural}
With a billion jobs. {Prep,Value,Value,Plural}
With a trillion jobs. {Prep,Value,Value,Plural}
1 800 555-1234. {PhoneNumber,PhoneNumber,PhoneNumber}
(454) 232-9873. {PhoneNumber,PhoneNumber}
Chinese yuan. {Currency,Currency}
5 dollars. {Money,Unit}
5 feet. {Value,Unit}
Kilometers an hour. {Unit,Unit,Unit}
Minus 7. {Value,Value}
Seven point five. {Value,Value,Value}
Thousand and two. {Value,Value,Value}
5 miles per hour. {Value,Unit,Unit,Unit}
Twelve percent. {Value,Unit}
`)
  t.end()
})

test(here + 'short numeric and question contexts', t => {
  assertSpec(t, `
# rule cleanup: short numeric and question contexts
a dozen eggs {Det,Multiple,Plural}
two dozen eggs {Cardinal,Cardinal,Plural}
three dozen roses {Cardinal,Multiple,Plural}
five dollars {Money,Unit}
twenty euros {Money,Unit}
ten yen {Money,Unit}
that is when he left {Pronoun,Copula,Conjunction,Pronoun,Past}
this is when she arrived {Pronoun,Copula,Conjunction,Pronoun,Past}
that was when we left {Pronoun,Copula,Conjunction,Pronoun,Past}
when stolen {Preposition,Past}
where eaten {Preposition,Past}
when eaten {Preposition,Past}
how is she? {QuestionWord,Copula,Pronoun}
how can we help? {QuestionWord,Modal,Pronoun,Inf}
she is well {Pronoun,Copula,Adj}
he is alone {Pronoun,Copula,Adj}
they are just {Pronoun,Copula,Adj}
`)
  t.end()
})

test(here + 'signed and decimal values', t => {
  assertSpec(t, `
# rule cleanup: signed and decimal values
minus seven {Value,Value}
negative three {Value,Value}
minus twenty five {Value,Value,Value}
a negative result {Det,Adj,Noun}
seven point five {Value,Value,Value}
three decimal two {Value,Value,Value}
twenty point six {Value,Value,Value}
a decimal place {Det,Noun|!Value,Noun}
the point is clear {Det,Noun,Copula,Adj}
`)
  t.end()
})

test('rule cleanup: spaced am and pm times', t => {
  assertSpec(t, `
    5 am {Time,Time}
    seven pm {Time,Time}
    10 pm {Time,Time}
    I am ready {Pronoun,Copula,Adjective}
  `, here.trim())
  t.end()
})
