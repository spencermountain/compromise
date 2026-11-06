import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-positive] '

// Both selections give one result, which is stable when repeated or reparsed.
const verify = (t, [input, expected]) => {
  for (const selection of ['verbs', 'sentences']) {
    const doc = nlp(input)
    doc[selection]().toPositive()
    t.equal(doc.text(), expected, here + selection + ': ' + input)
    doc[selection]().toPositive()
    t.equal(doc.text(), expected, here + selection + ' repeated: ' + input)
    const fresh = nlp(expected)
    fresh[selection]().toPositive()
    t.equal(fresh.text(), expected, here + selection + ' fresh: ' + expected)
  }
}

test(here + 'the negative goes and the auxiliary stays', t => {
  const rows = [
    ['Do the walls not really need 5 coats of paint?', 'Do the walls really need 5 coats of paint?'],
    ['Is he not happy?', 'Is he happy?'],
    ['Will she not walk?', 'Will she walk?'],
    ['Did she not walk?', 'Did she walk?'],
    ['Does he not walk?', 'Does he walk?'],
    ['Do they not walk?', 'Do they walk?'],
    ['Has she not eaten?', 'Has she eaten?'],
    ['Am I not late?', 'Am I late?'],
    ['Can he not swim?', 'Can he swim?'],
    ['Is she not being watched?', 'Is she being watched?'],
    ['Would he not have been walking?', 'Would he have been walking?'],
    ['Is he not going to walk?', 'Is he going to walk?'],
    ['Is he not happy (again)?', 'Is he happy (again)?'],
    ['Is he not happy', 'Is he happy'],
    // further along the predicate
    ['Is he really not happy?', 'Is he really happy?'],
    ['Do they really not need paint?', 'Do they really need paint?'],
    ['Has she never eaten?', 'Has she eaten?'],
    // in front of the subject
    ['Is not he happy?', 'Is he happy?'],
    ['Do not they walk?', 'Do they walk?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'contractions expand', t => {
  const rows = [
    ["Won't he walk?", 'Will he walk?'],
    ['Won’t he walk?', 'Will he walk?'],
    ["Isn't he happy?", 'Is he happy?'],
    ["Doesn't he walk?", 'Does he walk?'],
    ["Didn't she leave?", 'Did she leave?'],
    ["Why doesn't he walk?", 'Why does he walk?'],
    ["Can't you swim?", 'Can you swim?'],
    ["Haven't they eaten?", 'Have they eaten?'],
    ["Won't he?", 'Will he?'],
    ["What's he not doing?", "What's he doing?"],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'wh-questions keep the wh-phrase in front', t => {
  const rows = [
    ['Why did they not leave?', 'Why did they leave?'],
    ['When will he not leave?', 'When will he leave?'],
    ['Which books did she not read?', 'Which books did she read?'],
    ['In which city did she not live?', 'In which city did she live?'],
    ['Where is John not?', 'Where is John?'],
    ['Where is your dog not?', 'Where is your dog?'],
    ['Why did they not leave', 'Why did they leave'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'subjects, predicates and bare auxiliaries', t => {
  const rows = [
    ['Is your dog not happy?', 'Is your dog happy?'],
    ['Has the box of pencils not fallen?', 'Has the box of pencils fallen?'],
    ['Do Tom and Sue not walk?', 'Do Tom and Sue walk?'],
    ['Did John, the king, not leave?', 'Did John, the king, leave?'],
    ['Is Tom not a doctor?', 'Is Tom a doctor?'],
    ['Is the book not on the table?', 'Is the book on the table?'],
    ['Has she not eaten and slept?', 'Has she eaten and slept?'],
    ['Did you not?', 'Did you?'],
    ['Is it not?', 'Is it?'],
    ['Why did you not?', 'Why did you?'],
    ['Did Tom not?', 'Did Tom?'],
    // polite questions
    ['Could you not please open the door?', 'Could you please open the door?'],
    ['Could you please not leave?', 'Could you please leave?'],
  ]
  rows.forEach(row => verify(t, row))
  t.end()
})

test(here + 'positive questions stay as they are', t => {
  const rows = [
    'Is he happy?',
    'Does he walk?',
    'Do the walls really need paint?',
    'Why did they leave?',
    'Did you?',
    'Is Tom a doctor?',
  ]
  rows.forEach(str => verify(t, [str, str]))
  t.end()
})

test(here + 'other sentences keep the ordinary path', t => {
  const rows = [
    ['he does not walk', 'he walks'],
    ['she did not walk', 'she walked'],
    ['he is not nice', 'he is nice'],
    ['do not walk', 'walk'],
    ['Do not do the dishes quickly', 'do the dishes quickly'],
    ['Do not have fun and go home', 'have fun and go home'],
    ['Who does not walk?', 'Who walks?'],
    ['Who is not there?', 'Who is there?'],
    ['What is not your name?', 'What is your name?'],
    ['When he is not late, they walk.', 'When he is not late, they walk.'],
  ]
  rows.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.sentences().toPositive()
    t.equal(doc.text(), expected, here + 'ordinary: ' + input)
  })
  t.end()
})

test(here + 'not only is a negative too', t => {
  const rows = [
    ['Does he not only walk?', 'Does he only walk?'],
    ['Does he really not only walk?', 'Does he really only walk?'],
    ['it does not only happen', 'it only happens'],
    ['it did not only happen', 'it only happened'],
  ]
  rows.forEach(([input, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPositive()
      t.equal(doc.text(), expected, here + selection + ': ' + input)
    }
  })
  // and it isn't negated twice
  for (const selection of ['verbs', 'sentences']) {
    const doc = nlp('Does he not only walk?')
    doc[selection]().toNegative()
    t.equal(doc.text(), 'Does he not only walk?', here + selection + ' stays negative')
  }
  t.end()
})

test(here + 'toNegative then toPositive returns the input', t => {
  const rows = [
    'Do the walls really need 5 coats of paint?',
    'Is he happy?',
    'Will she walk?',
    'Did she walk?',
    'Does he walk?',
    'Has she eaten?',
    'Am I late?',
    'Can he swim?',
    'Is she swimming?',
    'Has she been watched?',
    'Is he going to walk?',
    'Does he want to walk?',
    'Is he happy (again)?',
    'Is he happy',
    'Why did they leave?',
    'Which books did she read?',
    "What's he doing?",
    'Where is John?',
    'Where is your dog?',
    'Is your dog happy?',
    'Did John, the king, leave?',
    'Is Tom a doctor?',
    'Is the book on the table?',
    'Did you?',
    'Is it?',
    'Did Tom?',
    'Has she eaten and slept?',
    'Has she eaten after he arrived?',
    'Does he only walk?',
    'Who walks?',
    'Who is there?',
    'What is your name?',
    'he walks',
    'he is nice',
    'she walked',
    'she knows that he works',
    'it only happens',
    'He walks. Is she happy? They sleep.',
    // phrasal verbs
    'he gives up',
    'he throws away the trash',
    'she keeps up',
    'he carries on',
    'she walked out',
    'they gave up',
    'he looks up the word',
    'Does he give up?',
    // polite questions
    'Could you please open the door?',
    'Can you please help?',
    'Will you please stop?',
  ]
  rows.forEach(input => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toNegative()
      doc[selection]().toPositive()
      t.equal(doc.text(), input, here + selection + ' round trip: ' + input)
    }
  })
  t.end()
})

test(here + 'selections stay inside their sentence and clause', t => {
  const source = 'She does not walk. Has he not eaten? They do not sleep.'
  const selectors = [
    doc => doc.sentences(1),
    doc => doc.sentences(1).verbs(),
    doc => doc.verbs().slice(1, 3),
  ]
  selectors.forEach(select => {
    const doc = nlp(source)
    select(doc).toPositive()
    t.equal(doc.text(), 'She does not walk. Has he eaten? They do not sleep.', here + 'neighbours preserved')
    select(doc).toPositive()
    t.equal(doc.text(), 'She does not walk. Has he eaten? They do not sleep.', here + 'repeated selection')
  })
  for (const selection of ['verbs', 'sentences']) {
    const doc = nlp(source)
    doc[selection]().toPositive()
    t.equal(doc.text(), 'She walks. Has he eaten? They sleep.', here + 'every ' + selection)
  }
  // A selection holding the 'not' can drop it. Any other has nothing to do.
  const partial = [
    ['Does he not walk?', 0, 'Does he not walk?'],
    ['Does he not walk?', 1, 'Does he walk?'],
    ['Has he not eaten?', 0, 'Has he not eaten?'],
    ['Has he not eaten?', 1, 'Has he eaten?'],
  ]
  partial.forEach(([input, index, expected]) => {
    const doc = nlp(input)
    doc.verbs(index).toPositive()
    t.equal(doc.text(), expected, here + 'verbs(' + index + '): ' + input)
  })
  // main and subordinate predicates
  const subordinate = 'Has she not eaten after he did not arrive?'
  const rows = [
    [doc => doc.sentences(), 'Has she eaten after he did not arrive?'],
    [doc => doc.verbs().slice(0, 2), 'Has she eaten after he did not arrive?'],
    [doc => doc.verbs(2), 'Has she not eaten after he arrived?'],
    [doc => doc.verbs(), 'Has she eaten after he arrived?'],
  ]
  rows.forEach(([select, expected]) => {
    const doc = nlp(subordinate)
    select(doc).toPositive()
    t.equal(doc.text(), expected, here + 'selected predicate only')
  })
  const clause = nlp('Did he leave when she did not stay?')
  clause.sentences().toPositive()
  t.equal(clause.text(), 'Did he leave when she did not stay?', here + 'a negative elsewhere stays')
  const neighbour = nlp("Isn't he here? Is she not happy?")
  neighbour.sentences(1).toPositive()
  t.equal(neighbour.text(), "Isn't he here? Is she happy?", here + 'contraction in another sentence')
  t.end()
})

test(here + 'positive questions keep converting', t => {
  const input = 'Do the walls not really need 5 coats of paint?'
  const rows = [
    ['toFutureTense', 'Will the walls really need 5 coats of paint?'],
    ['toPastTense', 'Did the walls really need 5 coats of paint?'],
    ['toNegative', input],
  ]
  rows.forEach(([method, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPositive()
      doc[selection]()[method]()
      t.equal(doc.text(), expected, here + selection + '.' + method)
    }
  })
  t.end()
})
