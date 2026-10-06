import test from 'tape'
import assertSpec from '../../_spec.js'

test('two/tagger/hyphen-context: hyphenated adjectives and irregular past readings', t => {
  assertSpec(t, `
# rule cleanup: hyphenated adjectives and irregular past readings
off-white paint {Adj,Adj,Noun}
an off-white shirt {Det,Adj,Adj,Noun}
the wall is off-white {Det,Noun,Copula,Adj,Adj}
a two-fold increase {Det,Adj,Adj,Noun}
a three-fold improvement {Det,Adj,Adj,Noun}
a ten-fold reduction {Det,Adj,Adj,Noun}
a must-win game {Det,Adj,Adj,Noun}
a must-see movie {Det,Adj,Adj,Noun}
a must-read book {Det,Adj,Adj,Noun}
vacuum-sealed food {Adj,Adj,Noun}
a vacuum-sealed bag {Det,Adj,Adj,Noun}
she drew a picture {Pronoun,Past,Det,Noun}
they drew the curtains {Pronoun,Past,Det,Plural}
the cat woke {Det,Noun,Past}
the baby woke suddenly {Det,Noun,Past,Adv}
she woke early {Pronoun,Past,Adv}
Drew walked home {Person,Past,Noun}
Drew Smith arrived {Person,Person,Past}
we met Drew {Pronoun,Past,Person}
they must win {Pronoun,Modal,Inf}
we must read this book {Pronoun,Modal,Inf,Det,Noun}
she used a vacuum {Pronoun,Past,Det,Noun}
`)
  t.end()
})

test('two/tagger/hyphen-context: hyphenated verb compounds', t => {
  assertSpec(t, `
# rule cleanup: hyphenated verb compounds
freeze-dried fruit {Adj,Adj,Noun}
`)
  t.end()
})
