import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/prepositions-conjunctions-spec] '

// Hand-written assessment cases in docs/spec-format.md syntax.
// Expectations are independent of tagger output; do not regenerate from nlp().
// Use the traditional distinction: Prep introduces a nominal complement (including
// a gerund); Conj links coordinated units or introduces a finite subordinate clause.
// Thus before/after/since/until/as/than/for/but/like depend on their context.
// Colloquial like + finite clause is Conj; exceptive but + object is Prep.
// Embedded clauses inside a noun phrase do not change its governing preposition.
// Broad Noun/Vb slots reduce unrelated morphology noise. Ger marks verbal -ing
// complements explicitly. Punctuation takes no slot; each term takes one slot.
// These are desired expectations, not a record of current passing behavior.
const spec = `
# Basic prepositions: noun phrases and pronoun objects
The cat slept under the table. {Det,Noun,Vb,Prep,Det,Noun}
She waited at the gate. {Noun,Vb,Prep,Det,Noun}
We walked through the tunnel. {Noun,Vb,Prep,Det,Noun}
He sat beside me. {Noun,Vb,Prep,Noun}
They stood behind us. {Noun,Vb,Prep,Noun}
The letter came from her. {Det,Noun,Vb,Prep,Noun}
We spoke about the plan. {Noun,Vb,Prep,Det,Noun}
She left without him. {Noun,Vb,Prep,Noun}
The bird flew over the fence. {Det,Noun,Vb,Prep,Det,Noun}
He leaned against the wall. {Noun,Vb,Prep,Det,Noun}

# Before: noun phrase versus finite clause, including misleading pronouns
We left before the storm. {Noun,Vb,Prep,Det,Noun}
We left before the storm arrived. {Noun,Vb,Conj,Det,Noun,Vb}
Before the meal, we washed our hands. {Prep,Det,Noun,Noun,Vb,Poss,Noun}
Before the meal began, we washed our hands. {Conj,Det,Noun,Vb,Noun,Vb,Poss,Noun}
She arrived before me. {Noun,Vb,Prep,Noun}
She arrived before I did. {Noun,Vb,Conj,Noun,Vb}
He stood before us. {Noun,Vb,Prep,Noun}
He stood before we entered. {Noun,Vb,Conj,Noun,Vb}
We left before her speech. {Noun,Vb,Prep,Poss,Noun}
We left before her speech ended. {Noun,Vb,Conj,Poss,Noun,Vb}
They prayed before eating. {Noun,Vb,Prep,Ger}
They prayed before they ate. {Noun,Vb,Conj,Noun,Vb}

# After: same surface word with different complements
We rested after the race. {Noun,Vb,Prep,Det,Noun}
We rested after the race ended. {Noun,Vb,Conj,Det,Noun,Vb}
After lunch, she called. {Prep,Noun,Noun,Vb}
After lunch ended, she called. {Conj,Noun,Vb,Noun,Vb}
The dog ran after him. {Det,Noun,Vb,Prep,Noun}
The dog ran after he shouted. {Det,Noun,Vb,Conj,Noun,Vb}
She spoke after me. {Noun,Vb,Prep,Noun}
She spoke after I finished. {Noun,Vb,Conj,Noun,Vb}
We stayed after their performance. {Noun,Vb,Prep,Poss,Noun}
We stayed after their performance ended. {Noun,Vb,Conj,Poss,Noun,Vb}
He rested after swimming. {Noun,Vb,Prep,Ger}
He rested after he swam. {Noun,Vb,Conj,Noun,Vb}

# Since: temporal preposition, temporal conjunction, causal conjunction, adverb
We have waited since noon. {Noun,Vb,Vb,Prep,Noun}
We have waited since the bell rang. {Noun,Vb,Vb,Conj,Det,Noun,Vb}
Since the accident, he walks slowly. {Prep,Det,Noun,Noun,Vb,Adv}
Since the accident happened, he walks slowly. {Conj,Det,Noun,Vb,Noun,Vb,Adv}
She has changed since her graduation. {Noun,Vb,Vb,Prep,Poss,Noun}
She has changed since she graduated. {Noun,Vb,Vb,Conj,Noun,Vb}
Since you asked, I will explain. {Conj,Noun,Vb,Noun,Modal,Vb}
I have seen him since. {Noun,Vb,Vb,Noun,Adv}
She has since moved. {Noun,Vb,Adv,Vb}

# Until and till: noun phrases versus clauses
We waited until dawn. {Noun,Vb,Prep,Noun}
We waited until the sun rose. {Noun,Vb,Conj,Det,Noun,Vb}
She worked until her retirement. {Noun,Vb,Prep,Poss,Noun}
She worked until she retired. {Noun,Vb,Conj,Noun,Vb}
Stay till noon. {Vb,Prep,Noun}
Stay till I return. {Vb,Conj,Noun,Vb}
He slept till the alarm. {Noun,Vb,Prep,Det,Noun}
He slept till the alarm rang. {Noun,Vb,Conj,Det,Noun,Vb}

# As: role prepositions versus temporal, causal, and manner conjunctions
She works as a nurse. {Noun,Vb,Prep,Det,Noun}
She waved as the train departed. {Noun,Vb,Conj,Det,Noun,Vb}
As a child, he loved books. {Prep,Det,Noun,Noun,Vb,Noun}
As the child slept, we whispered. {Conj,Det,Noun,Vb,Noun,Vb}
They used the box as a seat. {Noun,Vb,Det,Noun,Prep,Det,Noun}
They moved the box as I instructed. {Noun,Vb,Det,Noun,Conj,Noun,Vb}
We hired her as our guide. {Noun,Vb,Noun,Prep,Poss,Noun}
As our guide was tired, we stopped. {Conj,Poss,Noun,Vb,Adj,Noun,Vb}
Do as I say. {Vb,Conj,Noun,Vb}
As rain fell, the river rose. {Conj,Noun,Vb,Det,Noun,Vb}

# Than: explicit object versus explicit finite clause (avoid elliptical subjects)
She is taller than me. {Noun,Vb,Comparative,Prep,Noun}
She is taller than I am. {Noun,Vb,Comparative,Conj,Noun,Vb}
He runs faster than us. {Noun,Vb,Comparative,Prep,Noun}
He runs faster than we do. {Noun,Vb,Comparative,Conj,Noun,Vb}
The tower is older than the bridge. {Det,Noun,Vb,Comparative,Prep,Det,Noun}
The tower is older than the bridge looks. {Det,Noun,Vb,Comparative,Conj,Det,Noun,Vb}
The bag is heavier than mine. {Det,Noun,Vb,Comparative,Prep,Poss}
The bag is heavier than I expected. {Det,Noun,Vb,Comparative,Conj,Noun,Vb}

# For: beneficiary, purpose, and duration versus causal coordination
She bought flowers for me. {Noun,Vb,Noun,Prep,Noun}
She bought flowers, for I was ill. {Noun,Vb,Noun,Conj,Noun,Vb,Adj}
We waited for the driver. {Noun,Vb,Prep,Det,Noun}
We waited, for the driver was late. {Noun,Vb,Conj,Det,Noun,Vb,Adj}
He left for the station. {Noun,Vb,Prep,Det,Noun}
He left, for the station was closing. {Noun,Vb,Conj,Det,Noun,Vb,Vb}
They stayed for dinner. {Noun,Vb,Prep,Noun}
They stayed, for dinner was ready. {Noun,Vb,Conj,Noun,Vb,Adj}
We rested for an hour. {Noun,Vb,Prep,Det,Noun}
This brush is for painting. {Det,Noun,Vb,Prep,Ger}

# But: exceptive preposition versus coordination
Everyone but me agreed. {Noun,Prep,Noun,Vb}
Everyone agreed, but I objected. {Noun,Vb,Conj,Noun,Vb}
Nobody but her noticed. {Noun,Prep,Noun,Vb}
She noticed, but nobody listened. {Noun,Vb,Conj,Noun,Vb}
We packed everything but the kettle. {Noun,Vb,Noun,Prep,Det,Noun}
We packed the kettle but forgot the cups. {Noun,Vb,Det,Noun,Conj,Vb,Det,Noun}
The room was small but comfortable. {Det,Noun,Vb,Adj,Conj,Adj}
He walked slowly but steadily. {Noun,Vb,Adv,Conj,Adv}

# Like: resemblance preposition, colloquial manner conjunction, and lexical verb
She sings like her mother. {Noun,Vb,Prep,Poss,Noun}
She sings like her mother does. {Noun,Vb,Conj,Poss,Noun,Vb}
He looks like me. {Noun,Vb,Prep,Noun}
He cooks like I do. {Noun,Vb,Conj,Noun,Vb}
Like his brother, he enjoys chess. {Prep,Poss,Noun,Noun,Vb,Noun}
I like his brother. {Noun,Vb,Poss,Noun}
They really like the music. {Noun,Adv,Vb,Det,Noun}
It sounds like you need help. {Noun,Vb,Conj,Noun,Vb,Noun}

# Coordination of nouns, verbs, adjectives, adverbs, and prepositional phrases
Tea and coffee were available. {Noun,Conj,Noun,Vb,Adj}
Tea or coffee would help. {Noun,Conj,Noun,Modal,Vb}
She opened the door and smiled. {Noun,Vb,Det,Noun,Conj,Vb}
He can stay or leave. {Noun,Modal,Vb,Conj,Vb}
The path was steep and narrow. {Det,Noun,Vb,Adj,Conj,Adj}
She spoke quietly and clearly. {Noun,Vb,Adv,Conj,Adv}
We looked under the bed and behind the desk. {Noun,Vb,Prep,Det,Noun,Conj,Prep,Det,Noun}
He sat beside me or near the door. {Noun,Vb,Prep,Noun,Conj,Prep,Det,Noun}
She was tired, yet she continued. {Noun,Vb,Adj,Conj,Noun,Vb}
He never called, nor did he write. {Noun,Adv,Vb,Conj,Vb,Noun,Vb}

# Unambiguous finite subordinating clauses
We stayed because it rained. {Noun,Vb,Conj,Noun,Vb}
Because the road flooded, we waited. {Conj,Det,Noun,Vb,Noun,Vb}
Although he was tired, he smiled. {Conj,Noun,Vb,Adj,Noun,Vb}
He smiled though he was tired. {Noun,Vb,Conj,Noun,Vb,Adj}
While she cooked, he washed the plates. {Conj,Noun,Vb,Noun,Vb,Det,Noun}
He washed the plates while she cooked. {Noun,Vb,Det,Noun,Conj,Noun,Vb}
She likes tea whereas he prefers coffee. {Noun,Vb,Noun,Conj,Noun,Vb,Noun}
Whenever the bell rings, the dog barks. {Conj,Det,Noun,Vb,Det,Noun,Vb}
We will leave when the rain stops. {Noun,Modal,Vb,Conj,Det,Noun,Vb}
When the rain stops, we will leave. {Conj,Det,Noun,Vb,Noun,Modal,Vb}

# Prepositions can precede gerunds or contain embedded clauses
She left without saying anything. {Noun,Vb,Prep,Ger,Noun}
He learned by watching birds. {Noun,Vb,Prep,Ger,Noun}
They argued about buying a car. {Noun,Vb,Prep,Ger,Det,Noun}
We succeeded through working together. {Noun,Vb,Prep,Ger,Adv}
She insisted on paying. {Noun,Vb,Prep,Ger}
He apologized for shouting. {Noun,Vb,Prep,Ger}
We talked about the fact that she resigned. {Noun,Vb,Prep,Det,Noun,Conj,Noun,Vb}
She left after the news that he resigned. {Noun,Vb,Prep,Det,Noun,Conj,Noun,Vb}
He waited for the signal that we agreed on. {Noun,Vb,Prep,Det,Noun,Conj,Noun,Vb,Prep}
She spoke before the announcement that the shop was closing. {Noun,Vb,Prep,Det,Noun,Conj,Det,Noun,Vb,Vb}

# Longer subjects: the first following noun does not establish a preposition
We left before the last bus departed. {Noun,Vb,Conj,Det,Adj,Noun,Vb}
We left before the last bus. {Noun,Vb,Prep,Det,Adj,Noun}
After my older sister arrived, we ate. {Conj,Poss,Comparative,Noun,Vb,Noun,Vb}
After my older sister, I spoke. {Prep,Poss,Comparative,Noun,Noun,Vb}
We waited until the very tired driver returned. {Noun,Vb,Conj,Det,Adv,Adj,Noun,Vb}
Since the new bridge opened, traffic flows smoothly. {Conj,Det,Adj,Noun,Vb,Noun,Vb,Adv}
Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}
After the guests from the village arrived, we ate. {Conj,Det,Noun,Prep,Det,Noun,Vb,Noun,Vb}
We stayed until the man with the keys returned. {Noun,Vb,Conj,Det,Noun,Prep,Det,Noun,Vb}
As the woman beside me spoke, I listened. {Conj,Det,Noun,Prep,Noun,Vb,Noun,Vb}

# The same ambiguous word changes role within a single sentence
Before dinner, we rested before we cooked. {Prep,Noun,Noun,Vb,Conj,Noun,Vb}
After lunch, we walked after the rain stopped. {Prep,Noun,Noun,Vb,Conj,Det,Noun,Vb}
Since the wedding, she has called since she misses us. {Prep,Det,Noun,Noun,Vb,Vb,Conj,Noun,Vb,Noun}
We waited until noon, until the bus arrived. {Noun,Vb,Prep,Noun,Conj,Det,Noun,Vb}
As a teacher, she listens as her students speak. {Prep,Det,Noun,Noun,Vb,Conj,Poss,Noun,Vb}
She bought it for him, for he needed it. {Noun,Vb,Noun,Prep,Noun,Conj,Noun,Vb,Noun}
Everyone but me stayed, but I left. {Noun,Prep,Noun,Vb,Conj,Noun,Vb}
I like tea, like my sister does. {Noun,Vb,Noun,Conj,Poss,Noun,Vb}
He looks like me but acts like she does. {Noun,Vb,Prep,Noun,Conj,Vb,Conj,Noun,Vb}
We rested after swimming and before we ate. {Noun,Vb,Prep,Ger,Conj,Conj,Noun,Vb}

# Nearby words that must not turn into prepositions or conjunctions
I have heard that story before. {Noun,Vb,Vb,Det,Noun,Adv}
We met shortly after. {Noun,Vb,Adv,Adv}
The children played outside. {Det,Noun,Vb,Adv}
The children played outside the house. {Det,Noun,Vb,Prep,Det,Noun}
She looked up. {Noun,Vb,Particle}
She climbed up the ladder. {Noun,Vb,Prep,Det,Noun}
He was so tired. {Noun,Vb,Adv,Adj}
He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}
She has not arrived yet. {Noun,Vb,Negative,Vb,Adv}
She was late, yet we waited. {Noun,Vb,Adj,Conj,Noun,Vb}

# Punctuation, negation, questions, and stranded prepositions
Did she leave before lunch? {Vb,Noun,Vb,Prep,Noun}
Did she leave before you arrived? {Vb,Noun,Vb,Conj,Noun,Vb}
We did not leave until noon. {Noun,Vb,Negative,Vb,Prep,Noun}
We did not leave until she arrived. {Noun,Vb,Negative,Vb,Conj,Noun,Vb}
Before you leave, please call. {Conj,Noun,Vb,Expr,Vb}
Before you, I was the youngest. {Prep,Noun,Noun,Vb,Det,Superlative}
Who did you buy it for? {QuestionWord,Vb,Noun,Vb,Noun,Prep}
Who did she arrive before? {QuestionWord,Vb,Noun,Vb,Prep}
Who did he run after? {QuestionWord,Vb,Noun,Vb,Prep}
Which chair did she sit on? {QuestionWord,Noun,Vb,Noun,Vb,Prep}
`

test('prepositions and conjunctions spec:', function (t) {
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
