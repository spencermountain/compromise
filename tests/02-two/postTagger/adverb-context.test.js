import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/adverb-context] '

test(here + 'adverbs and adjective contrasts', t => {
  assertSpec(t, `
# index.js: adverbs and adjective contrasts
Way too hot. {Adv,Adv,Adj}
They sing like an angel. {Pronoun,Inf,Prep,Det,Noun}
They barely even walk. {Pronoun,Adv,Adv,Inf}
They are cheering hard. {Pronoun,Aux,Ger,Adv}
He is well. {Pronoun,Copula,Adj}
A bit cold. {Det,Adv,Adj}
They become overly weakened. {Pronoun,Inf,Adv,Adj}
A completely beaten man. {Det,Adv,Adj,Noun}
A close friend. {Det,Adj,Noun}
He does better. {Pronoun,Pres,Adv}
Walking close. {Ger,Adv}
He charged back. {Pronoun,Past,Adv}
The well. {Det,Noun}
He sees well. {Pronoun,Pres,Adv}
`)
  t.end()
})

test('rule cleanup: too much and a bit much', t => {
  assertSpec(t, `
    too much {Adv,Adj}
    too much for us {Adv,Adj,Prep,Pronoun}
    this is too much {Pronoun,Copula,Adv,Adj}
    a bit much {Det,Adv,Adj}
    a bit much for me {Det,Adv,Adj,Prep,Pronoun}
    just a bit much {Adv,Det,Adv,Adj}
    a bit of cake {Det,Noun,Prep,Noun}
    too cold {Adv,Adj}
  `, here.trim())
  t.end()
})
