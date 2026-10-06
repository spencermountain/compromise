import test from 'tape'
import assertSpec from '../two/_spec.js'
const here = '[hmm/al18ner-tests]'

const spec = `
That was a mistake. {Det,Vb,Det,Noun}
I won't forget this. {Noun,Vb,Negative,Vb,Det}
I wouldn't do that. {Noun,Vb,Negative,Vb,Det}
That was not fair. {Det,Vb,Negative,Adj}
Could you repeat that? {Vb,Noun,Vb,Det}
Does this belong to you? {Vb,Det,Vb,Prep,Noun}
Whose coat is this? {QuestionWord,Noun,Vb,Det}
How did this happen? {QuestionWord,Vb,Det,Vb}
How do you spell that? {QuestionWord,Vb,Noun,Vb,Det}
I do not know when they will arrive. {Noun,Vb,Negative,Vb,Prep,Noun,Vb,Vb}
Do you know what this means? {Vb,Noun,Vb,Prep,Det,Vb}
Don't touch that. {Vb,Negative,Vb,Det}
Wow, that was amazing! {Expr,Det,Vb,Adj}
Even if he apologizes, she will not forgive him. {Conj,Condition,Noun,Vb,Noun,Vb,Negative,Vb,Pron}
Unless you hurry, we will be late. {Condition,Noun,Vb,Noun,Vb,Vb,Adv}
Finish your homework before dinner. {Vb,Noun,Noun,Conj,Noun}
Brush your teeth before bed. {Vb,Noun,Noun,Conj,Noun}
After we arrived, the movie started. {Prep,Noun,Vb,Det,Noun,Vb}
After she graduated, she moved abroad. {Prep,Noun,Vb,Noun,Vb,Adv}
After they left, the house felt quiet. {Prep,Noun,Vb,Det,Noun,Vb,Adj}
Before the show, we grabbed dinner. {Conj,Det,Noun,Noun,Vb,Noun}
The sooner, the better. {Det,Adj,Det,Adj}
As night fell, the city lit up. {Prep,Noun,Vb,Det,Noun,Vb,Vb}
The book that she wrote is long. {Det,Noun,Det,Noun,Vb,Vb,Adj}
The woman that I met was friendly. {Det,Noun,Det,Noun,Vb,Vb,Adj}
The house that they built is huge. {Det,Noun,Det,Noun,Vb,Vb,Adj}
The cake that you baked was delicious. {Det,Noun,Det,Noun,Vb,Vb,Adj}
The song that she sang made me cry. {Det,Noun,Det,Noun,Vb,Vb,Noun,Vb}
This is the town where she grew up. {Det,Vb,Det,Noun,Prep,Noun,Vb,Vb}
I remember the day when we met. {Noun,Vb,Det,Date,Prep,Noun,Vb}
Everyone who came had a good time. {Noun,QuestionWord,Vb,Vb,Det,Adj,Noun}
The neighbors that we invited arrived first. {Det,Noun,Det,Noun,Vb,Vb,Val}
The tools that he borrowed were rusty. {Det,Noun,Det,Noun,Vb,Vb,Adj}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
