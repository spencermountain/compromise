import test from 'tape'
import nlp from '../_lib.js'

// Assert resulting tags so overlapping rules can be removed or rewritten.
const spec = `
# Consecutive gerunds: preserve the action and the adjective modifier.
They are repairing crumbling roads. {Pronoun,Aux,Ger,Adj,Plural}
They are repairing leaking pipes. {Pronoun,Aux,Ger,Adj,Plural}

# Perfect progressives: preserve auxiliaries with and without intervening adverbs.
She had been walking. {Pronoun,Aux,Aux,Ger}
He has not been sleeping. {Pronoun,Aux,Negative,Aux,Ger}
They had already been working. {Pronoun,Aux,Adv,Aux,Ger}
She would have been walking. {Pronoun,Modal|Aux,Aux,Aux,Ger}

# Synthetic overlap probes: preserve coverage of the second had.
John would have had not been walking. {Person,Modal|Aux,Aux,Aux,Negative,Aux,Ger}
John would not have had really been walking. {Person,Modal|Aux,Negative,Aux,Aux,Adv,Aux,Ger}

# A later adjective correction must survive intervening Actor rules.
a semiprofessional bodyworker {Det,Adj,Noun}
on stable foundations {Prep,Adj,Plural}

# Adjective correction before a proper noun.
This is the classic London. {Pronoun,Copula,Det,Adj,Place}
It is the premier university. {Pronoun,Copula,Det,Adj,Noun}

# Relative clause: preserve the finite verb after that.
A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}

# A verb-shaped word used as a noun after a preposition.
We waited until release. {Pronoun,Past,Prep,Noun}
It served as cover. {Pronoun,Past,Prep,Noun}
She acted as judge. {Pronoun,Past,Prep,Noun}

# Locative subjects: preserve both the preposition and the final verb.
Dogs near the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs under the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs beside the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs behind the porch bark. {Plural,Prep,Det,Noun,Inf}
Children on the playground play. {Plural,Prep,Det,Noun,Inf}
`

test('rule cleanup candidate specs', t => {
  spec.split('\n').forEach(line => {
    if (!line.trim() || line.trimStart().startsWith('#')) {
      return
    }
    const sentence = line.slice(0, line.lastIndexOf('{')).trim()
    const failing = nlp.testSpec(line, false)
    t.equal(failing.found, false, sentence)
    if (failing.found) {
      t.comment(`Expected: ${line}`)
      t.comment(`Actual: ${failing.out('spec')}`)
    }
  })
  t.end()
})

test('that-leads-to without a preceding noun', t => {
  // Keep the unrelated determiner/pronoun ambiguity out of this assertion.
  const doc = nlp('That works to our advantage.')
  t.equal(doc.match('that [#PresentTense] to', 0).text(), 'works', 'works is a finite verb')
  t.end()
})
