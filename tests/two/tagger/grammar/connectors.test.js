import test from 'tape'
import nlp from '../../_lib.js'

test('connectors distinguish nominal objects from finite clauses', t => {
  const cases = [
    ['She left before me.', 'before', 'Preposition'],
    ['She left before I finished.', 'before', 'Conjunction'],
    ['Before dinner, we rested.', 'before', 'Preposition'],
    ['Before the dinner ended, we rested.', 'before', 'Conjunction'],
    ['He rested after swimming.', 'after', 'Preposition'],
    ['He rested after she finished.', 'after', 'Conjunction'],
    ['Since the wedding, she has called.', 'since', 'Preposition'],
    ['Since the new bridge opened, traffic flows smoothly.', 'since', 'Conjunction'],
    ['We waited until noon.', 'until', 'Preposition'],
    ['We waited until the very tired driver returned.', 'until', 'Conjunction'],
    ['After the guests from the village arrived, we ate.', 'after', 'Conjunction'],
    ['She works as a nurse.', 'as', 'Preposition'],
    ['As the child slept, we whispered.', 'as', 'Conjunction'],
    ['She is taller than me.', 'than', 'Preposition'],
    ['She is taller than I am.', 'than', 'Conjunction'],
    ['She bought flowers for me.', 'for', 'Preposition'],
    ['She bought flowers, for I was ill.', 'for', 'Conjunction'],
    ['Everyone but me agreed.', 'but', 'Preposition'],
    ['She sings like her mother.', 'like', 'Preposition'],
    ['She sings like her mother does.', 'like', 'Conjunction'],
    ['Like his brother, he enjoys chess.', 'like', 'Preposition'],
    ['We talked about the fact that she resigned.', 'that', 'Conjunction'],
    ['The cat slept under the table.', 'under', 'Preposition'],
    ['He sat beside me.', 'beside', 'Preposition'],
    ['The bird flew over the fence.', 'over', 'Preposition'],
    ['They stood behind us.', 'behind', 'Preposition'],
    ['He leaned against the wall.', 'against', 'Preposition'],
    ['He sat near the door.', 'near', 'Preposition'],
  ]
  for (const [str, word, tag] of cases) {
    const term = nlp(str).match(word)
    t.equal(term.has('#' + tag), true, str)
    const other = tag === 'Preposition' ? 'Conjunction' : 'Preposition'
    t.equal(term.has('#' + other), false, str + ' excludes ' + other)
  }
  t.end()
})

test('connector rules preserve boundaries and other word senses', t => {
  for (const [str, word, tag] of [
    ['Before you, I was the youngest.', 'before', 'Preposition'],
    ['After dinner I left.', 'after', 'Preposition'],
    ['Before lunch she called.', 'before', 'Preposition'],
    ['Since the wedding she has called.', 'since', 'Preposition'],
    ['Before dinner, we rested before we cooked.', 'before', 'Preposition'],
    ['We left before dinner, and the guests arrived.', 'before', 'Preposition'],
    ['After the news that she resigned, we called.', 'after', 'Preposition'],
    ['She spoke before the announcement that the shop was closing.', 'before', 'Preposition'],
    ['The nurses are sweet as pie and the doctor is wonderful.', 'as', 'Preposition'],
    ['I thanked everyone but she left.', 'but', 'Conjunction'],
    ['I like her mother.', 'like', 'Verb'],
    ['I would like tea.', 'like', 'Verb'],
    ['We do like tea.', 'like', 'Verb'],
    ['Like my page.', 'like', 'Verb'],
    ['The game is over.', 'over', 'Adjective'],
    ['The ship will near the coast.', 'near', 'Verb'],
    ['She has since moved.', 'since', 'Adverb'],
    ['I have heard that story before.', 'before', 'Adverb'],
    ['We met shortly after.', 'after', 'Adverb'],
    ['She has not arrived yet.', 'yet', 'Adverb'],
    ['Who did she arrive before?', 'before', 'Preposition'],
  ]) {
    t.equal(nlp(str).match(word).first().has('#' + tag), true, str)
  }
  const doc = nlp('Before dinner, we rested before we cooked.')
  t.equal(doc.match('before').last().has('#Conjunction'), true, 'same word, different complements')
  t.end()
})
