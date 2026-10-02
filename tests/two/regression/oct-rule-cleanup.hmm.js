import test from 'tape'
import nlp from '../_lib.js'
import leftRight from '../../../src/2-two/left-right/plugin.js'
import compileLeftRight from '../../../src/2-two/left-right/model/_lib.js'
const here = '[two/match-spec] '

test('left/right alternatives preserve context and action order', t => {
  const byWord = compileLeftRight({
    foo: ['(my|your) _ (cat|dog) -> #Adjective'],
    bar: ['(near|#Determiner) _ (#Plural|#Pronoun) -> #Adjective'],
    baz: ['as _ as -> #Adjective', 'more _ than -> #Adjective'],
    quux: ['_ (cat|dog) -> #Adjective', 'my _ -> #Verb'],
  })
  const cases = [
    ['my foo cat', 'foo', true],
    ['your foo dog', 'foo', true],
    ['their foo dog', 'foo', false],
    ['my foo horse', 'foo', false],
    ['foo dog', 'foo', false],
    ['my foo', 'foo', false],
    ['my. foo dog', 'foo', false],
    ['near bar cats', 'bar', true],
    ['the bar she', 'bar', true],
    ['near bar cat', 'bar', false],
    ['as baz as', 'baz', true],
    ['more baz than', 'baz', true],
    ['as baz than', 'baz', false],
    ['more baz as', 'baz', false],
    ['my quux dog', 'quux', false],
  ]
  cases.forEach(([text, target, expected]) => {
    const doc = nlp(text)
    doc.match(target).tag('Verb')
    leftRight.methods.two.leftRight(doc.docs, { byWord, byTag: {} }, doc.world)
    t.equal(doc.match(target).has('#Adjective'), expected, text)
  })
  const invalid = ['(my|)', '(|my)', '(my)', '(my|(your|their))', 'my|your', '(#Noun|!)']
  invalid.forEach(context => {
    t.throws(() => compileLeftRight({ foo: [`${context} _ -> #Adjective`] }), /Invalid left-right rule/, context)
  })
  t.end()
})

test('migrated tag-based left/right contexts', t => {
  const cases = [
    ['a well made table', 'made', 'Adjective'],
    ['as entertaining as a movie', 'entertaining', 'Adjective'],
    ['more amusing than a movie', 'amusing', 'Adjective'],
    ['very annoying', 'annoying', 'Adjective'],
    ['a blown motor', 'blown', 'Adjective'],
    ['no doubt', 'doubt', 'Noun'],
    ['any charge', 'charge', 'Noun'],
    ['the above is clear', 'above', 'Singular'],
    ['who he knows', 'who', 'Preposition'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
  })
  const gerund = nlp('the running horse')
  gerund.match('running').tag('Gerund')
  leftRight.methods.two.leftRight(gerund.docs, gerund.world.model.two.leftRight, gerund.world)
  t.equal(gerund.match('running').has('#Adjective'), true, 'gerund modifier with incoming Gerund tag')
  t.end()
})

test('left/right target tags', t => {
  const byTag = compileLeftRight({ '#ProperNoun': ['in _ -> #Place'] })
  const run = (doc, byWord = {}) => leftRight.methods.two.leftRight(doc.docs, { byWord, byTag }, doc.world)
  const doc = nlp('in foo near bar')
  doc.match('(foo|bar)').tag('ProperNoun')
  run(doc)
  t.equal(doc.match('foo').has('#Place'), true, 'matching target tag and left neighbour')
  t.equal(doc.match('bar').has('#Place'), false, 'target tag still requires the neighbour')

  const ordinary = nlp('in box')
  run(ordinary)
  t.equal(ordinary.match('box').has('#Place'), false, 'ordinary noun does not match ProperNoun')

  const both = nlp('in foo')
  both.match('foo').tag('ProperNoun')
  run(both, compileLeftRight({ foo: ['in _ -> #Adjective'] }))
  t.equal(both.match('foo').has('#Place'), true, 'tag rules see incoming tags even when a word rule removes them')

  const fresh = nlp('in foo')
  fresh.match('foo').tag('Verb')
  run(fresh, compileLeftRight({ foo: ['in _ -> #ProperNoun'] }))
  t.equal(fresh.match('foo').has('#ProperNoun'), true, 'word rule applies')
  t.equal(fresh.match('foo').has('#Place'), false, 'new tags do not trigger tag rules in the same pass')
  run(fresh)
  t.equal(fresh.match('foo').has('#Place'), true, 'new tag is available on the next pass')
  t.end()
})

test('matching respects edits to parsed patterns', t => {
  const doc = nlp('red blue')
  const pattern = nlp.parseMatch('green red blue')
  t.equal(doc.match(pattern).found, false, 'required prefix is missing')
  pattern[0].optional = true
  t.equal(doc.match(pattern).text(), 'red blue', 'prefix can become optional')
  pattern[0].optional = false
  t.equal(doc.match(pattern).found, false, 'prefix can become required again')
  t.end()
})

test('more left/right tagging contexts', t => {
  const cases = [
    ['They have running water.', 'running', 'Adjective'],
    ['It left an enduring legacy.', 'enduring', 'Adjective'],
    ['She is pretty happy.', 'pretty', 'Adverb'],
    ['Even the dog left.', 'even', 'Adverb'],
    ['He looks happy.', 'looks', 'PresentTense'],
    ['She sounds happy.', 'sounds', 'PresentTense'],
    ['They start singing.', 'start', 'Infinitive'],
    ['We left right after lunch.', 'right', 'Adverb'],
    ['It is always there.', 'there', 'Adjective'],
    ['I said sorry.', 'sorry', 'Expression'],
    ['We flew to Turkey.', 'Turkey', 'Country'],
    ['Is there any more?', 'more', 'Singular'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
  })
  t.end()
})

test('left/right string rules', t => {
  const rules = compileLeftRight({
    second: ['#Cardinal _ -> #Unit', '_ #Noun -> #Ordinal'],
    said: ['the _ #Noun -> #Adjective'],
  })
  const cases = [
    ['one second', 'second', 'Unit'],
    ['second dog', 'second', 'Ordinal'],
    ['the said dog', 'said', 'Adjective'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    doc.match(target).tag('Verb')
    leftRight.methods.two.leftRight(doc.docs, { byWord: rules, byTag: {} }, doc.world)
    t.equal(doc.match(target).has('#' + tag), true, text)
  })
  const invalid = [
    '#Cardinal -> #Unit',
    '_ _ -> #Unit',
    'one two _ -> #Unit',
    '_ -> Unit',
    '_ -> #Unit -> #Ordinal',
    '(one|) _ -> #Unit',
    '^ _ -> #Unit',
  ]
  invalid.forEach(rule => {
    t.throws(() => compileLeftRight({ second: [rule] }), /Invalid left-right rule for "second"/, rule)
  })
  t.end()
})

test('left/right rules in the tagging pipeline', t => {
  const examples = [
    ['The said elephant vanished.', 'said', 'Adjective'],
    ['She still sings.', 'still', 'Adverb'],
    ['The shelf is high enough.', 'enough', 'Adverb'],
    ['A ticket is a must.', 'must', 'Singular'],
    ['We must march.', 'march', 'Infinitive'],
    ['She will dance.', 'will', 'Modal'],
    ['They said that she left.', 'that', 'Conjunction'],
    ['It looks nothing like a cat.', 'like', 'Preposition'],
    ['There is plenty of food.', 'plenty', 'Uncountable'],
    ['I waited a while.', 'while', 'Singular'],
  ]
  examples.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
  })
  t.end()
})

test('left/right tagger sketch', t => {
  const run = (doc, rules) => leftRight.methods.two.leftRight(doc.docs, { byWord: rules, byTag: {} }, doc.world)
  const doc = nlp('my foo and your foo')
  doc.match('foo').tag('Verb')
  run(doc, { foo: [{ pre: 'my', post: '', tag: 'Noun' }] })
  t.equal(doc.match('my #Noun').found, true, 'left literal selects the target')
  t.equal(doc.match('your #Verb').found, true, 'unmatched target stays unchanged')

  const right = nlp('foo bar')
  right.match('foo').tag('Verb')
  right.match('bar').tag('Noun')
  run(right, { foo: [{ post: '#Noun', tag: 'Adjective' }] })
  t.equal(right.match('#Adjective #Noun').found, true, 'right tag condition')

  const boundary = nlp('my. foo')
  boundary.match('foo').tag('Verb')
  run(boundary, { foo: [{ pre: 'my', tag: 'Noun' }] })
  t.equal(boundary.match('foo').has('#Verb'), true, 'does not cross sentences')

  const deferred = nlp('my foo bar')
  deferred.match('foo bar').tag('Verb')
  run(deferred, {
    foo: [{ pre: 'my', tag: 'Noun' }],
    bar: [{ pre: '#Noun', tag: 'Adjective' }],
  })
  t.equal(deferred.match('bar').has('#Verb'), true, 'checks see tags from before the pass')
  run(deferred, { foo: [{ pre: 'my', tag: 'Adjective' }, { pre: 'my', tag: 'Verb' }] })
  t.equal(deferred.match('foo').has('#Verb'), true, 'bucket order resolves conflicting actions')
  t.end()
})

test('fixed-length matches preserve captures and fallbacks', t => {
  t.deepEqual(nlp('the red fox and the red fox').match('the [red fox]', 0).out('array'), ['red fox', 'red fox'], 'capture offsets at multiple starts')
  t.equal(nlp('the red fox').match('^the [red fox]$', 0).text(), 'red fox', 'anchored capture')
  t.equal(nlp('the red fox').match('the red fox jumps').found, false, 'short input')
  t.equal(nlp("we've arrived").match("we've arrived").text(), "we've arrived", 'contraction consumes its implicit terms')
  t.equal(nlp('the red fox').match('the very? red fox').text(), 'the red fox', 'optional term fallback')
  t.equal(nlp('red red fox').match('red+ fox').text(), 'red red fox', 'repetition fallback')
  t.end()
})

test('matcher cleanup preserves occurrence order and boundaries', t => {
  const doc = nlp('red blue red blue')
  t.deepEqual(doc.match('red blue').out('array'), ['red blue', 'red blue'], 'repeated matches')
  t.deepEqual(doc.match('^red blue').out('array'), ['red blue'], 'first occurrence')
  t.deepEqual(doc.match('red blue$').out('array'), ['red blue'], 'last occurrence')
  t.deepEqual(doc.match('!blue blue').out('array'), ['red blue', 'red blue'], 'negative first term')
  t.deepEqual(nlp('red red red').match('red red').out('array'), ['red red'], 'nonoverlapping matches')
  t.deepEqual(nlp('red blue. red blue.').match('^red blue$').out('array'), ['red blue.', 'red blue.'], 'sentence boundaries')
  t.end()
})

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
  Is it a joke, Dad, or do I need help? {Copula,Pronoun,Det,Noun,Noun,Conj,Vb,Pronoun,Vb,Noun}
  It has fins, Jim, and has a motor. {Pronoun,Pres,Plural,Person,Conj,Pres,Det,Noun}
  We discussed the engine, bag, and evacuating the building. {Pronoun,Past,Det,Noun,Noun,Conj,Ger,Det,Noun}

  # Share locative patterns without losing adjective context.
  Dogs on the wooden porch bark. {Plural,Prep,Det,Adj,Noun,Inf}
  Children behind the tall fence play. {Plural,Prep,Det,Adj,Noun,Inf}

  # Copula variants share passive syntax; adjectives remain adjectives.
  I am watched by everyone. {Pronoun,Aux|Passive,Past|Passive,Prep,Noun}
  The parcel is delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels are delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels were delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was quickly delivered. {Det,Noun,Aux,Adv,Past}
  She was tired. {Pronoun,Copula,Adj}

  # Multiple alternatives in one sentence must retain each correction.
  They let John shoulder the burden and made Mary shoulder the cost. {Pronoun,Vb,Person,Inf,Det,Noun,Conj,Past,Person,Inf,Det,Noun}
  She had to Google the answer and he has to Google the address. {Pronoun,Vb,Connector,Inf,Det,Noun,Conj,Pronoun,Vb,Connector,Inf,Det,Noun}
  We scheduled a software reinstall on Monday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
  We scheduled an engine rebuild on Tuesday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
  I know why he is happy and where she is working. {Pronoun,Inf,Connector,Pronoun,Copula,Adj,Conj,Connector,Pronoun,Aux,Ger}

  # Smaller word-hook families: exceptions, particles, and perfect forms.
  Everyone but me agreed. {Noun,Prep,Pronoun,Past}
  Anybody but him could help. {Noun,Prep,Pronoun,Modal,Inf}
  She picked it up and put it down. {Pronoun,Past,Pronoun,Adv,Conj,Vb,Pronoun,Adv}
  She has read the note and he has put the book on the table. {Pronoun,Aux,Participle,Det,Noun,Conj,Pronoun,Aux,Participle,Det,Noun,Prep,Det,Noun}
  The plane flew directly above the clouds. {Det,Noun,Past,Adv,Prep,Det,Plural}
  She stood right below the window. {Pronoun,Past,Adv,Prep,Det,Noun}
  They slept just under the bridge. {Pronoun,Past,Adv,Prep,Det,Noun}
  The plane flew well over the hill. {Det,Noun,Past,Adv,Prep,Det,Noun}
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
