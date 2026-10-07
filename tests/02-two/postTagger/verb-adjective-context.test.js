import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/verb-adjective-context] '

test(here + 'verbs and adjective/verb ambiguity', t => {
  assertSpec(t, `
# index.js: verbs and adjective/verb ambiguity
It is pretty good. {Pronoun,Copula,Adv,Adj}
I better go. {Pronoun,Modal,Inf}
I like it. {Pronoun,Inf,Pronoun}
He left. {Pronoun,Past}
She bit her tongue. {Pronoun,Past,Poss,Noun}
He will be running. {Pronoun,Modal,Aux,Ger}
He will be nice. {Pronoun,Modal,Copula,Adj}
Birds home to their nest. {Plural,Inf,Prep,Poss,Noun}
It is home to birds. {Pronoun,Copula,Noun,Prep,Plural}
It is subject to change. {Pronoun,Copula,Adj,Prep,Noun}
It is home to dogs. {Pronoun,Copula,Noun,Prep,Plural}
They were being run. {Pronoun,Aux,Aux,Past}
It had been broken. {Pronoun,Aux,Aux,Past}
It had been smoked. {Pronoun,Aux,Aux,Past}
It had been eaten. {Pronoun,Aux,Aux,Past}
She had to Google the answer. {Pronoun,Verb,Connector,Inf,Det,Noun}
Does that work? {Verb,Pronoun,Inf}
They have read. {Pronoun,Aux,Participle}
Fuck them. {Inf,Pronoun}
It works for me. {Pronoun,Pres,Prep,Pronoun}
As we please. {Conj,Pronoun,Inf}
They co write. {Pronoun,Verb,Inf}
They out run him. {Pronoun,Verb,Inf,Pronoun}
She dressed and left. {Pronoun,Past,Conj,Past}
Is he stoked? {Copula,Pronoun,Adj}
To dream of home. {Connector,Inf,Prep,Noun}
Developed scalable React architecture. {Past,Adj,Noun,Noun}
He does mean it. {Pronoun,Aux,Inf,Pronoun}
Okay by me. {Adj,Prep,Pronoun}
I mean it. {Pronoun,Inf,Pronoun}
The ship will near the coast. {Det,Noun,Modal,Inf,Det,Noun}
Rude and insulting. {Adj,Conj,Adj}
He got tired of it. {Pronoun,Past,Adj,Prep,Pronoun}
He felt cheated. {Pronoun,Past,Adj}
Do not be embarrassed. {Aux,Negative,Inf,Adj}
He is just tired. {Pronoun,Copula,Adv,Adj}
Failed and oppressive. {Adj,Conj,Adj}
The fear or heightened emotion. {Det,Noun,Conj,Adj,Noun}
He is tired and overworked. {Pronoun,Copula,Adj,Conj,Adj}
Their declared intentions. {Poss,Adj,Plural}
Is he cool? {Copula,Pronoun,Adj}
It is crowded with people. {Pronoun,Copula,Adj,Prep,Noun}
It is empty. {Pronoun,Copula,Adj}
Does the store open? {Verb,Det,Noun,Inf}
`)
  t.end()
})
