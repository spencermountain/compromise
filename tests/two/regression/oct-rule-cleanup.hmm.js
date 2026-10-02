import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match-spec] '

const spec = `

  On Friday, food and drinks are free. {Prep,Date,Noun,Conj,Noun,Vb,Adj}
  On Friday, food or drinks will be provided. {Prep,Date,Noun,Conj,Noun,Vb,Vb,Vb}
  On Tuesday, gifts and thanks arrived. {Prep,Date,Noun,Conj,Noun,Past}
  We discussed London, Paris and travel. {Noun,Past,Noun,Noun,Conj,Noun}

  The dog runs. {Det,Noun,Pres}
  My dog barks loudly. {Poss,Noun,Pres,Adv}
  The small child walks slowly. {Det,Adj,Noun,Pres,Adv}
  Her cat usually sleeps peacefully. {Poss,Noun,Adv,Pres,Adv}
  The young athlete swims well. {Det,Adj,Noun,Pres,Adv}
  Our old dog often barks loudly. {Poss,Adj,Noun,Adv,Pres,Adv}
  A tired baby sleeps soundly. {Det,Adj,Noun,Pres,Adv}

  Hope changed the world. {Noun,Past,Det,Noun}
  Love changed my life. {Noun,Past,Poss,Noun}
  Work consumed his time. {Noun,Past,Poss,Noun}
  Rain ruined the picnic. {Noun,Past,Det,Noun}
  Support exceeded our expectations. {Noun,Past,Poss,Noun}
  Change brought a new opportunity. {Noun,Past,Det,Adj,Noun}
  Fear gripped the small town. {Noun,Past,Det,Adj,Noun}
  Trust saved our friendship. {Noun,Past,Poss,Noun}

  Let John shoulder the burden. {Vb,Noun,Inf,Det,Noun}
  Make Sarah shoulder the responsibility. {Vb,Noun,Inf,Det,Noun}
  We made John shoulder the burden. {Noun,Past,Noun,Inf,Det,Noun}
  Let her shoulder the burden. {Vb,Noun,Inf,Det,Noun}
  Make Google shoulder the cost. {Vb,Noun,Inf,Det,Noun}
  They made Canada shoulder the cost. {Noun,Past,Noun,Inf,Det,Noun}

  # ^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun
  Hope changed the world. {Noun,Past,Det,Noun}
  Love changed my life. {Noun,Past,Poss,Noun}

  # (let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)
  Let John shoulder the burden. {Vb,Person,Inf,Det,Noun}
  They made Canada shoulder the cost. {Noun,Past,Place,Inf,Det,Noun}

  # #Gerund [#Gerund] #Plural
  They are repairing crumbling roads. {Noun,Vb,Ger,Adj,Plural}
  They are repairing leaking pipes. {Noun,Vb,Ger,Adj,Plural}

  # #Pronoun #Infinitive [#Gerund] #PresentTense
  I think tipping sucks. {Noun,Inf,Noun,Pres}
  We believe running improves health. {Noun,Inf,Noun,Pres,Noun}

  # ^[#Infinitive] #Value #Noun
  Add two eggs. {Imp,Val,Noun}
  Buy three books. {Imp,Val,Noun}

  # ^(like && @hasComma)
  Like, I understand. {Expr,Noun,Vb}
  Like, what happened? {Expr,QuestionWord,Past}

  # ^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$
  Had he walked? {Aux,Noun,Past}
  Had they already finished? {Aux,Noun,Adv,Past}

  # ^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$
  Had she walked the dog? {Aux,Noun,Past,Det,Noun}
  Had they already finished their homework? {Aux,Noun,Adv,Past,Poss,Noun}

  # #Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$
  John and Mary work. {Person,Conj,Person,Inf}
  Alice and Bob dance. {Person,Conj,Person,Inf}

  # #Plural [on] #Determiner #Adjective+? #Noun [%Noun|Verb%]$
  Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
  Children on the playground play. {Plural,Prep,Det,Noun,Inf}

  # #PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]
  We waited until release. {Noun,Past,Prep,Noun}

  # as [#Infinitive] as
  She is as fit as ever. {Noun,Vb,Connector,Adj,Connector,Adv}
  They are as welcome as ever. {Noun,Vb,Connector,Adj,Connector,Adv}

  # #Preposition #Plural and [%Plural|Verb%] #Gerund
  We watched with smiles and waves greeting us. {Noun,Past,Prep,Plural,Conj,Plural,Ger,Noun}
  With dogs and bears running, we left. {Prep,Plural,Conj,Plural,Ger,Noun,Past}

  # that [#Plural] to
  A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}
  A road that winds to the coast. {Det,Noun,Conj,Pres,Prep,Det,Noun}

  # [(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb
  She had been walking. {Noun,Aux,Vb,Ger}
  He has not been sleeping. {Noun,Aux,Negative,Vb,Ger}

  # #Copula the [%Adj|Noun%] #Noun
  It is the premier university. {Noun,Vb,Det,Adj,Noun}
  This is the principal reason. {Noun,Vb,Det,Adj,Noun}

  # ^[some] #Infinitive #Noun
  Some like coffee. {Pronoun,Inf,Noun}
  Some prefer tea. {Pronoun,Inf,Noun}

  # (#TextValue && #Date) #TextValue
  May twenty five. {Date,TextValue|Date,TextValue|Date}
  June twenty one. {Date,TextValue|Date,TextValue|Date}

  # (is|was|were) [(under|over) #PastTense]
  They were under paid. {Noun,Vb,Adv,Adj}
  It is over rated. {Noun,Vb,Adv,Adj}

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

  # Lists need their comma context; coordinated subjects still take verbs.
  We sell books, toys and watches. {Pronoun,Inf,Plural,Plural,Conj,Plural}
  I enjoy music, art and dance. {Pronoun,Inf,Noun,Noun,Conj,Noun}
  On Friday, John and Mary work. {Prep,Date,Person,Conj,Person,Inf}
  John and Mary work. {Person,Conj,Person,Inf}

  # Share locative patterns without losing adjective context.
  Dogs on the wooden porch bark. {Plural,Prep,Det,Adj,Noun,Inf}
  Children behind the old school play. {Plural,Prep,Det,Adj,Noun,Inf}

  # Copula variants share passive syntax; adjectives remain adjectives.
  I am watched. {Pronoun,Aux|Passive,Past|Passive}
  The parcel is delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels are delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels were delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was quickly delivered. {Det,Noun,Aux,Adv,Past}
  She was tired. {Pronoun,Copula,Adj}
`

test('match spec:', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const aliases = {}
  Object.entries(tagSet).forEach(([tag, info]) => {
    if (info.alias) aliases[info.alias] = tag
  })
  spec
    .split('\n')
    .filter(line => line.trim() && !line.trimStart().startsWith('#'))
    .forEach(line => {
      const failing = nlp.testSpec(line, false)
      const brace = line.lastIndexOf('{')
      const sentence = line.slice(0, brace).trim()
      const differences = []
      if (failing.found) {
        failing.compute('tagRank')
        const slots = line
          .slice(brace + 1)
          .replace(/\}[ \t]*#.*$/, '}')
          .replace(/\}$/, '')
          .split(',')
        const terms = failing.docs.flat()
        slots.forEach((slot, i) => {
          const expected = slot.split('|').map(tag => tag.trim())
          const term = terms[i]
          if (!term) {
            differences.push(`term ${i + 1}: missing, expected ${slot}`)
          } else if (!expected.every(tag => term.tags.has(aliases[tag] || tag))) {
            const word = term.implicit || term.text
            const actual = term.tagRank[0] || 'Untagged'
            const missing = expected.find(tag => !term.tags.has(aliases[tag] || tag))
            differences.push(`'${word}' #${actual}!=#${missing}`)
          }
        })
        if (terms.length !== slots.length) {
          differences.push(`expected ${slots.length} terms, got ${terms.length}`)
        }
        if (differences.length === 0) differences.push('tags align, but the sentence pattern did not match')
      }
      const detail = differences.length > 0 ? ' — ' + differences.join('; ') : ''
      t.equal(failing.found, false, here + sentence + detail)
    })
  t.end()
})
