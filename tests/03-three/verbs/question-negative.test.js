import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-negative] '

// Both selections give one result, which is stable when repeated or reparsed.
const verify = (t, [input, expected]) => {
  for (const selection of ['verbs', 'sentences']) {
    const doc = nlp(input)
    doc[selection]().toNegative()
    t.equal(doc.text(), expected, here + selection + ': ' + input)
    doc[selection]().toNegative()
    t.equal(doc.text(), expected, here + selection + ' repeated: ' + input)
    const fresh = nlp(expected)
    fresh[selection]().toNegative()
    t.equal(fresh.text(), expected, here + selection + ' fresh: ' + expected)
  }
}

test(here + 'one negative follows the subject', t => {
  const rows = [
    ['Do the walls really need 5 coats of paint?', 'Do the walls not really need 5 coats of paint?'],
    ['Is he happy?', 'Is he not happy?'],
    ['Will she walk?', 'Will she not walk?'],
    ['Did she walk?', 'Did she not walk?'],
    ['Does he walk?', 'Does he not walk?'],
    ['Do they walk?', 'Do they not walk?'],
    ['Has she eaten?', 'Has she not eaten?'],
    ['Had he eaten?', 'Had he not eaten?'],
    ['Am I late?', 'Am I not late?'],
    ['Were they late?', 'Were they not late?'],
    ['Can he swim?', 'Can he not swim?'],
    ['Would they go?', 'Would they not go?'],
    ['Must we leave?', 'Must we not leave?'],
    ['Is she swimming?', 'Is she not swimming?'],
    ['Has she been watched?', 'Has she not been watched?'],
    ['Is she being watched?', 'Is she not being watched?'],
    ['Would he have been walking?', 'Would he not have been walking?'],
    ['Is he going to walk?', 'Is he not going to walk?'],
    ['Does he want to walk?', 'Does he not want to walk?'],
    ['Is he happy (again)?', 'Is he not happy (again)?'],
    ['Is he happy', 'Is he not happy'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'wh-questions keep the wh-phrase in front', t => {
  const rows = [
    ['Why did they leave?', 'Why did they not leave?'],
    ['Why does he walk?', 'Why does he not walk?'],
    ['When will he leave?', 'When will he not leave?'],
    ['How can he swim?', 'How can he not swim?'],
    ['Which books did she read?', 'Which books did she not read?'],
    ['In which city did she live?', 'In which city did she not live?'],
    ["What's he doing?", "What's he not doing?"],
    ['Why did they leave', 'Why did they not leave'],
    // the wh-word is the predicate
    ['Where is John?', 'Where is John not?'],
    ['How is she?', 'How is she not?'],
    ['Where is your dog?', 'Where is your dog not?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'a wh-word subject takes the ordinary path', t => {
  const rows = [
    ['Who walks?', 'Who does not walk?'],
    ['Who is there?', 'Who is not there?'],
    ['Who is John?', 'Who is not John?'],
    ['What is happening?', 'What is not happening?'],
    ['What is your name?', 'What is not your name?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'the subject can be a whole phrase', t => {
  const rows = [
    ['Is your dog happy?', 'Is your dog not happy?'],
    ['Did your dog walk?', 'Did your dog not walk?'],
    ['Is your happy dog big?', 'Is your happy dog not big?'],
    ['Are the dogs sleeping?', 'Are the dogs not sleeping?'],
    ['Has the box of pencils fallen?', 'Has the box of pencils not fallen?'],
    ['Do Tom and Sue walk?', 'Do Tom and Sue not walk?'],
    ['Did John, the king, leave?', 'Did John, the king, not leave?'],
    // ending in a predicate phrase
    ['Is Tom a doctor?', 'Is Tom not a doctor?'],
    ['Is the book on the table?', 'Is the book not on the table?'],
    ['Is the box of pencils on the table?', 'Is the box of pencils not on the table?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'a bare auxiliary takes the negative at the end', t => {
  const rows = [
    ['Did you?', 'Did you not?'],
    ['Do you?', 'Do you not?'],
    ['Can he?', 'Can he not?'],
    ['Will she?', 'Will she not?'],
    ['Is it?', 'Is it not?'],
    ['Why did you?', 'Why did you not?'],
    ['Did Tom?', 'Did Tom not?'],
    // polite questions
    ['Could you please open the door?', 'Could you not please open the door?'],
    ['Can you please help?', 'Can you not please help?'],
    ['Could you please not leave?', 'Could you please not leave?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'one negative covers coordinated verbs', t => {
  const rows = [
    ['Has she eaten and slept?', 'Has she not eaten and slept?'],
    ['Does he walk and talk?', 'Does he not walk and talk?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'negative questions stay as they are', t => {
  const rows = [
    "Won't he walk?",
    'Won’t he walk?',
    "Won't he?",
    "Isn't he happy?",
    "Doesn't he walk?",
    "Why doesn't he walk?",
    'Does he not walk?',
    'Why does he not walk?',
    'Is he not happy?',
    'Is he really not happy?',
    'Do they really not need paint?',
    'Has she never eaten?',
  ]
  rows.forEach(str => verify(t, [str, str]))
  t.end()
})

test(here + 'commands and leading clauses are not questions', t => {
  const rows = [
    ['Do the dishes quickly', 'Do not do the dishes quickly'],
    ['Do the dishes now.', 'Do not do the dishes now.'],
    ['Do the dishes and walk the dog', 'Do not do the dishes and walk the dog'],
    ['Do the dishes, walk the dog.', 'Do not do the dishes, walk the dog.'],
    ['Have fun and go home', 'Do not have fun and go home'],
    ['Have the kids walk home', 'Do not have the kids walk home'],
    ['Do it.', 'Do not do it.'],
    ['Do not walk', 'Do not walk'],
    ['When he is late, they walk.', 'When he is late, they do not walk.'],
    ['Will Smith walked.', 'Will Smith did not walk.'],
    ['is back on', 'is not back on'],
    ['Is wrong about him', 'Is not wrong about him'],
    ['is gettin', 'is not gettin'],
    ['has NumberRange tags', 'does not have NumberRange tags'],
    // a conditional inversion negates its main clause
    ['Had I known, I would have left earlier.', 'Had I known, I would not have left earlier.'],
    ['were you to leave, I would follow', 'were you to leave, I would not follow'],
  ]
  rows.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.sentences().toNegative()
    t.equal(doc.text(), expected, here + 'command: ' + input)
  })
  t.end()
})

test(here + 'selections stay inside their sentence and clause', t => {
  const source = 'She walks. Has he eaten? They sleep.'
  const selectors = [
    doc => doc.sentences(1),
    doc => doc.sentences(1).verbs(),
    doc => doc.verbs().slice(1, 3),
  ]
  selectors.forEach(select => {
    const doc = nlp(source)
    select(doc).toNegative()
    t.equal(doc.text(), 'She walks. Has he not eaten? They sleep.', here + 'neighbours preserved')
    select(doc).toNegative()
    t.equal(doc.text(), 'She walks. Has he not eaten? They sleep.', here + 'repeated selection')
  })
  for (const selection of ['verbs', 'sentences']) {
    const doc = nlp(source)
    doc[selection]().toNegative()
    t.equal(doc.text(), 'She does not walk. Has he not eaten? They do not sleep.', here + 'every ' + selection)
  }
  // partial phrases can't be negated alone
  for (const index of [1, 2]) {
    const doc = nlp(source)
    doc.verbs(index).toNegative()
    t.equal(doc.text(), source, here + 'incomplete inverted phrase remains intact')
  }
  // main and subordinate predicates
  const subordinate = 'Has she eaten after he arrived?'
  const rows = [
    [doc => doc.sentences(), 'Has she not eaten after he arrived?'],
    [doc => doc.verbs().slice(0, 2), 'Has she not eaten after he arrived?'],
    [doc => doc.verbs(2), 'Has she eaten after he did not arrive?'],
    [doc => doc.verbs(), 'Has she not eaten after he did not arrive?'],
  ]
  rows.forEach(([select, expected]) => {
    const doc = nlp(subordinate)
    select(doc).toNegative()
    t.equal(doc.text(), expected, here + 'selected predicate only')
  })
  const clause = nlp('Did he leave when she did not stay?')
  clause.sentences().toNegative()
  t.equal(clause.text(), 'Did he not leave when she did not stay?', here + 'a negative elsewhere does not count')
  // Rebuilding a question would re-run contractions on its neighbours.
  const neighbour = nlp("Isn't he here? Is she happy?")
  neighbour.sentences().toNegative()
  t.equal(neighbour.text(), "Isn't he here? Is she not happy?", here + 'contraction in another sentence')
  t.end()
})

test(here + 'negated questions keep converting', t => {
  const input = 'Do the walls really need 5 coats of paint?'
  const rows = [
    ['toFutureTense', 'Will the walls not really need 5 coats of paint?'],
    ['toPastTense', 'Did the walls not really need 5 coats of paint?'],
    ['toPresentTense', 'Do the walls not really need 5 coats of paint?'],
  ]
  rows.forEach(([method, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toNegative()
      doc[selection]()[method]()
      t.equal(doc.text(), expected, here + selection + '.' + method)
    }
  })
  const chained = nlp(input)
  chained.verbs().toNegative().verbs().toFutureTense()
  t.equal(chained.text(), 'Will the walls not really need 5 coats of paint?', here + 'returned selection')
  const fresh = nlp(input)
  fresh.verbs().toNegative()
  t.ok(fresh.match('not').has('#Negative'), here + 'inserted word is tagged')
  t.equal(fresh.text(), nlp(fresh.text()).text(), here + 'text reparses')
  t.end()
})

test(here + 'subject phrases convert without negating', t => {
  const rows = [
    ['Is your dog happy?', 'Will your dog be happy?'],
    ['Is his dog happy?', 'Will his dog be happy?'],
    ['Where is your dog?', 'Where will your dog be?'],
    ['Has your dog eaten?', 'Will your dog have eaten?'],
    // the result no longer parses as inverted
    ['Did your dog walk?', 'Will your dog walk?'],
  ]
  rows.forEach(([input, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toFutureTense()
      t.equal(doc.text(), expected, here + selection + ' future: ' + input)
    }
  })
  t.end()
})

test(here + 'an infinitive is negated through the verb before it', t => {
  const rows = [
    ['he wants to walk', 'he does not want to walk'],
    ['she left to walk', 'she did not leave to walk'],
    ['he tried to walk', 'he did not try to walk'],
    ['he wants to try to walk', 'he does not want to try to walk'],
    ['you have a chance to be happy', 'you do not have a chance to be happy'],
    // nothing else to negate it through
    ['to be watched', 'to not be watched'],
  ]
  rows.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.verbs().toNegative()
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})
