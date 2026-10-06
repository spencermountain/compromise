import test from 'tape'
import assertSpec from '../../_spec.js'

test('two/tagger/imperatives: anchored commands and predicate contrasts', t => {
  assertSpec(t, `
#migrated anchored tagging rules
Go home. {Imperative,Noun}
Stay cool. {Imperative,Adj}
Stay away. {Imperative,Adv}
Tell him the story. {Imperative,Pronoun,Det,Noun}
Keep playing. {Imperative,Ger}
Work-saving appliances. {Adj|!Imperative,Adj,Plural}
Pay attention. {Imperative,Noun}
I will go home. {Pronoun,Modal,Inf|!Imperative,Noun}
He read the book. {Pronoun,Past,Det,Noun}
She is alone. {Pronoun,Copula,Adj}
It is well. {Pronoun,Copula,Adj}
The meeting came to a close. {Det,Noun,Past,Prep,Det,Noun}
Shoot! {Expression}
Shoot the ball. {Imperative|!Expression,Det,Noun}
Dude we should leave. {Expression,Pronoun,Modal,Inf}
`)
  t.end()
})

test('two/tagger/imperatives: early imperative commands', t => {
  assertSpec(t, `
# early imperative commands
Go to Toronto. {Imperative,Prep,City}
Go to the store. {Imperative,Prep,Det,Noun}
Keep it quiet. {Imperative,Pronoun,Adj}
Keep it cool. {Imperative,Pronoun,Adj}
Keep it simple. {Imperative,Pronoun,Adj}
I go to Toronto. {Pronoun,Inf|!Imperative,Prep,City}
They wait for the bus. {Pronoun,Inf|!Imperative,Prep,Det,Noun}
We keep it quiet. {Pronoun,Inf|!Imperative,Pronoun,Adj}
The stop was nearby. {Det,Noun|!Imperative,Copula,Adj}
`)
  t.end()
})

test('two/tagger/imperatives: coordinated imperatives', t => {
  assertSpec(t, `
# rule cleanup: coordinated imperatives
come and eat {Imperative,Conj,Imperative}
they stay or leave {Pronoun,Inf|!Imperative,Conj,Inf}
`)
  t.end()
})

test('two/tagger/imperatives: commands before quantities', t => {
  assertSpec(t, `
# ^[#Infinitive] #Value #Noun
Add two eggs. {Imp,Val,Noun}
Buy three books. {Imp,Val,Noun}
`)
  t.end()
})
