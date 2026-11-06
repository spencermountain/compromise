import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-rewrite] '

// a rewritten question should read the same, through either selection
const check = function (t, rows, method) {
  rows.forEach(([str, want]) => {
    const bySentence = nlp(str)
    bySentence.sentences()[method]()
    t.equal(bySentence.text(), want, `sentences: ${str}`)
    const byVerb = nlp(str)
    byVerb.verbs()[method]()
    t.equal(byVerb.text(), want, `verbs: ${str}`)
  })
}

test(here + 'keep punctuation after the verb', t => {
  check(t, [
    ['Is he "happy" again?', 'Was he "happy" again?'],
    ['Is he (happy) again?', 'Was he (happy) again?'],
    ['Is he [happy] again?', 'Was he [happy] again?'],
    ['Is he “happy” again?', 'Was he “happy” again?'],
    ["Is he 'happy' again?", "Was he 'happy' again?"],
    ['Is he *happy* again?', 'Was he *happy* again?'],
    ['Is he "really happy"?', 'Was he "really happy"?'],
    ['Will he "walk" again?', 'Did he "walk" again?'],
    ['Do they "really" walk?', 'Did they "really" walk?'],
  ], 'toPastTense')
  check(t, [
    ['Isn\'t he "happy" again?', 'Won\'t he be "happy" again?'],
    ['Is he "happy" again?', 'Will he be "happy" again?'],
    ['Does he "walk"?', 'Will he "walk"?'],
  ], 'toFutureTense')
  t.end()
})

test(here + 'keep punctuation around the subject', t => {
  check(t, [
    ['Is "he" happy?', 'Was "he" happy?'],
    ['Why is "he" happy?', 'Why was "he" happy?'],
    ['Will "the walls" need paint?', 'Did "the walls" need paint?'],
    ['Will the "walls" need paint?', 'Did the "walls" need paint?'],
    ['Will (the walls) need paint?', 'Did (the walls) need paint?'],
    ['Is John, or Mary, happy?', 'Was John, or Mary, happy?'],
  ], 'toPastTense')
  t.end()
})

test(here + 'keep punctuation after a wh-word', t => {
  check(t, [
    ['"Why" is he happy?', '"Why" was he happy?'],
    ['Why - is he happy?', 'Why - was he happy?'],
  ], 'toPastTense')
  t.end()
})

test(here + 'end-punctuation is not added or lost', t => {
  check(t, [
    ['Is he happy?', 'Was he happy?'],
    ['Is he happy?!', 'Was he happy?!'],
    ['Is he?', 'Was he?'],
    ['Is he "happy"?', 'Was he "happy"?'],
    ['Is he (happy)?', 'Was he (happy)?'],
  ], 'toPastTense')
  // spacing between sentences stays intact
  const doc = nlp('Is he "happy" again? They sleep.')
  doc.sentences(0).toPastTense()
  t.equal(doc.text(), 'Was he "happy" again? They sleep.', 'first sentence')
  const later = nlp('They sleep. Is he "happy" again? They wake.')
  later.sentences(1).toPastTense()
  t.equal(later.text(), 'They sleep. Was he "happy" again? They wake.', 'middle sentence')
  t.end()
})

test(here + 'do-support has one past tense', t => {
  check(t, [
    ['Will the walls need paint?', 'Did the walls need paint?'],
    ['Will the walls really need paint?', 'Did the walls really need paint?'],
    ['Will the walls really need 5 coats of paint?', 'Did the walls really need 5 coats of paint?'],
    ['Will he really need 5 coats?', 'Did he really need 5 coats?'],
    ['Will the wall always need paint?', 'Did the wall always need paint?'],
    ['Will the team really require help?', 'Did the team really require help?'],
    ['Will the dogs really walk home?', 'Did the dogs really walk home?'],
    ['Why will the walls really need paint?', 'Why did the walls really need paint?'],
    ['Will the walls really need and want 5 coats of paint?', 'Did the walls really need and want 5 coats of paint?'],
    ['Will the walls "really" need paint?', 'Did the walls "really" need paint?'],
  ], 'toPastTense')
  check(t, [
    ['Will the walls really need paint?', 'Do the walls really need paint?'],
    ['Will the wall really need paint?', 'Does the wall really need paint?'],
    ['Did the wall really need paint?', 'Does the wall really need paint?'],
  ], 'toPresentTense')
  t.end()
})

test(here + 'do-support ignores verbs in a later clause', t => {
  const rows = [
    ['Will the walls really need paint when they walk?', 'Did the walls really need paint when they walk?'],
    ['Why will he always need help when he walks?', 'Why did he always need help when he walks?'],
  ]
  rows.forEach(([str, want]) => {
    const doc = nlp(str)
    doc.sentences().toPastTense()
    t.equal(doc.text(), want, str)
  })
  // .verbs() selects the later clause too
  const doc = nlp('Will the walls really need paint when they walk?')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'Did the walls really need paint when they walked?', 'every selected verb')
  t.end()
})

test(here + 'opening punctuation before a question', t => {
  check(t, [
    ['"Is he happy?"', '"Was he happy?"'],
    ['(Is he happy?)', '(Was he happy?)'],
    ['[Is he happy?]', '[Was he happy?]'],
    ['“Is he happy?”', '“Was he happy?”'],
    ["'Is he happy?'", "'Was he happy?'"],
    ['"is he happy?"', '"was he happy?"'],
    ['"Why is he happy?"', '"Why was he happy?"'],
    ['"In which city is he happy?"', '"In which city was he happy?"'],
    ['"Will he really need paint?"', '"Did he really need paint?"'],
    ['"Is he "happy" again?"', '"Was he "happy" again?"'],
    ['«Is he happy?»', '«Was he happy?»'],
  ], 'toPastTense')
  // spacing between sentences stays intact
  const doc = nlp('"Is he happy?" They sleep.')
  doc.sentences(0).toPastTense()
  t.equal(doc.text(), '"Was he happy?" They sleep.', 'quoted first sentence')
  check(t, [
    ['"Is he happy?"', '"Will he be happy?"'],
    ['(Is he happy?)', '(Will he be happy?)'],
    ['(Why is he happy?)', '(Why will he be happy?)'],
    ['"Why" is he happy?', '"Why" will he be happy?'],
    ['"Isn\'t he happy?"', '"Won\'t he be happy?"'],
  ], 'toFutureTense')
  check(t, [
    ['"Was he happy?"', '"Is he happy?"'],
    ['"Did the wall need paint?"', '"Does the wall need paint?"'],
  ], 'toPresentTense')
  t.end()
})

test(here + 'opening punctuation on other sentences', t => {
  check(t, [
    ['"They are happy."', '"They were happy."'],
    ['(They walk home.)', '(They walked home.)'],
    ['"Will Smith walks home."', '"Will Smith walked home."'],
  ], 'toPastTense')
  t.end()
})

test(here + 'a copula moves ahead of its adverb', t => {
  check(t, [
    ['Will he really be happy?', 'Is he really happy?'],
    ['Will he always be happy?', 'Is he always happy?'],
    ['Will the walls really be happy?', 'Are the walls really happy?'],
    ['Will I really be happy?', 'Am I really happy?'],
    ['Why will he really be happy?', 'Why is he really happy?'],
    ['Will he really truly be happy?', 'Is he really truly happy?'],
    ['Will he really not be happy?', 'Is he really not happy?'],
    ['Will he really be "happy" again?', 'Is he really "happy" again?'],
    ['"Will he really be happy?"', '"Is he really happy?"'],
  ], 'toPresentTense')
  check(t, [
    ['Will he really be happy?', 'Was he really happy?'],
    ['Will the walls really be happy?', 'Were the walls really happy?'],
  ], 'toPastTense')
  // repeating it changes nothing
  const doc = nlp('Will he really be happy?')
  doc.verbs().toPresentTense()
  doc.verbs().toPresentTense()
  t.equal(doc.text(), 'Is he really happy?', 'present twice')
  t.end()
})

test(here + 'other verbs stay behind an adverb', t => {
  check(t, [
    ['Will he really do it?', 'Does he really do it?'],
    ['Will he really have a car?', 'Does he really have a car?'],
    ['Will he really walk?', 'Does he really walk?'],
    ['Will he really not walk?', 'Does he really not walk?'],
    ['Will he really be watched?', 'Is he really watched?'],
    ['Will he always be walking?', 'Is he always walking?'],
    ['Will he really have eaten?', 'Has he really eaten?'],
  ], 'toPresentTense')
  check(t, [
    ['Will he really do it?', 'Did he really do it?'],
    ['Will he really have a car?', 'Did he really have a car?'],
    ['Will he really not walk?', 'Did he really not walk?'],
    ['Will he really have eaten?', 'Had he really eaten?'],
  ], 'toPastTense')
  t.end()
})

test(here + 'questions with an elided verb', t => {
  check(t, [
    ['Will you?', 'Did you?'],
    ['Does he?', 'Did he?'],
    ['Do they?', 'Did they?'],
    ['Do I?', 'Did I?'],
    ['Have you?', 'Had you?'],
    ['Has he?', 'Had he?'],
    ['Can you?', 'Could you?'],
    ['Did you?', 'Did you?'],
    ["Won't you?", "Didn't you?"],
    ["Haven't you?", "Hadn't you?"],
    ["Can't you?", "Couldn't you?"],
    ['Where will they?', 'Where did they?'],
    ['Does he always?', 'Did he always?'],
    ['Will they really?', 'Did they really?'],
    ['Have you ever?', 'Had you ever?'],
  ], 'toPastTense')
  check(t, [
    ['Did you?', 'Do you?'],
    ['Did he?', 'Does he?'],
    ['Will she?', 'Does she?'],
    ['Did I?', 'Do I?'],
    ['Did they?', 'Do they?'],
    ['Had he?', 'Has he?'],
    ["Didn't you?", "Don't you?"],
    ["Didn't he?", "Doesn't he?"],
    ['Why did he?', 'Why does he?'],
    ['Did she really?', 'Does she really?'],
    ['Did you not?', 'Do you not?'],
  ], 'toPresentTense')
  check(t, [
    ['Did you?', 'Will you?'],
    ['Did he?', 'Will he?'],
    ['Does she?', 'Will she?'],
    ['Do they?', 'Will they?'],
    ['Do I?', 'Will I?'],
    ['Have you?', 'Will you have?'],
    ['Has he?', 'Will he have?'],
    ['Will you?', 'Will you?'],
    ["Didn't you?", "Won't you?"],
    ["Doesn't she?", "Won't she?"],
    ['Why did you?', 'Why will you?'],
    ['Did you?!', 'Will you?!'],
    ['"Did you?"', '"Will you?"'],
    ['(Did you?)', '(Will you?)'],
    ['Did you really?', 'Will you really?'],
    ['Does he always?', 'Will he always?'],
    ['Did you not?', 'Will you not?'],
    ['Did you really not?', 'Will you really not?'],
    ['Have you ever?', 'Will you have ever?'],
  ], 'toFutureTense')
  t.end()
})

test(here + 'adverbs that follow an elided verb', t => {
  check(t, [
    ['Did you then?', 'Will you then?'],
    ['Did you again?', 'Will you again?'],
    ['Did you too?', 'Will you too?'],
    ['Did you already?', 'Will you already?'],
    ['Did you, really?', 'Will you, really?'],
    ["Didn't you really?", "Won't you really?"],
    ['Have you again?', 'Will you have again?'],
  ], 'toFutureTense')
  check(t, [
    ['Did you then?', 'Do you then?'],
    ['Did he again?', 'Does he again?'],
    ['Will they then?', 'Do they then?'],
    ["Didn't you really?", "Don't you really?"],
  ], 'toPresentTense')
  check(t, [
    ['Do you then?', 'Did you then?'],
    ['Does he again?', 'Did he again?'],
    ['Have you again?', 'Had you again?'],
  ], 'toPastTense')
  t.end()
})

test(here + 'an elided verb has other forms', t => {
  const rows = [
    ['Did you?', 'toGerund', 'Are you?'],
    ['Does he?', 'toGerund', 'Is he?'],
    ['Did you?', 'toPastParticiple', 'Have you?'],
    ['Does he?', 'toPastParticiple', 'Has he?'],
    ['Did you?', 'toInfinitive', 'Do you?'],
  ]
  rows.forEach(([str, method, want]) => {
    const doc = nlp(str)
    doc.verbs()[method]()
    t.equal(doc.text(), want, `${method}: ${str}`)
  })
  t.end()
})

test(here + 'an elided verb keeps other sentences', t => {
  const first = nlp('Did you? They sleep.')
  first.sentences(0).toFutureTense()
  t.equal(first.text(), 'Will you? They sleep.', 'first sentence')
  const last = nlp('They sleep. Did you?')
  last.sentences(1).toFutureTense()
  t.equal(last.text(), 'They sleep. Will you?', 'last sentence')
  // every conversion can follow another
  const doc = nlp('Did you?')
  doc.verbs().toFutureTense()
  t.equal(doc.text(), 'Will you?', 'to future')
  doc.verbs().toPresentTense()
  t.equal(doc.text(), 'Do you?', 'to present')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'Did you?', 'to past')
  t.end()
})

test(here + 'a wh-word can be the subject of a short question', t => {
  // the pronoun is an object here, so nothing is elided
  check(t, [
    ['Who did it?', 'Who will do it?'],
    ['What did it?', 'What will do it?'],
    ['Which one did it?', 'Which one will do it?'],
  ], 'toFutureTense')
  check(t, [
    ['Who did it?', 'Who does it?'],
  ], 'toPresentTense')
  check(t, [
    ['Why did it?', 'Why will it?'],
    ['How did it?', 'How will it?'],
    ['When did you?', 'When will you?'],
  ], 'toFutureTense')
  t.end()
})

test(here + 'other short sentences are not elided questions', t => {
  // a command, a noun or a missing '?' stays on the ordinary path
  const rows = [
    ['Do it?', 'Will it?'],
    ['Have it?', 'Will it have?'],
    ['Have a drink?', 'Will a drink have?'],
    ['Do the dishes?', 'Will the dishes?'],
    ['Had lunch?', 'Will lunch have?'],
    ['Can openers?', 'Will openers?'],
    ['Did the dishes?', 'Will the dishes?'],
    ['Did you', 'Will you'],
    ['Do it now', 'Will it now'],
    ['Who has it?', 'Who will it have?'],
    ['What has you?', 'What will you have?'],
  ]
  rows.forEach(([str, wrong]) => {
    const bySentence = nlp(str)
    bySentence.sentences().toFutureTense()
    t.notEqual(bySentence.text(), wrong, `sentences: ${str}`)
    const byVerb = nlp(str)
    byVerb.verbs().toFutureTense()
    t.notEqual(byVerb.text(), wrong, `verbs: ${str}`)
  })
  t.end()
})

test(here + 'rewritten question can convert again', t => {
  const doc = nlp('Will the walls really need 5 coats of paint?')
  doc.verbs().toPastTense()
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'Did the walls really need 5 coats of paint?', 'past twice')
  doc.verbs().toFutureTense()
  t.equal(doc.text(), 'Will the walls really need 5 coats of paint?', 'then future')
  const quoted = nlp('Is he "happy" again?')
  quoted.verbs().toPastTense()
  quoted.verbs().toFutureTense()
  t.equal(quoted.text(), 'Will he be "happy" again?', 'quote survives both')
  t.end()
})

test(here + 'statements keep the ordinary path', t => {
  check(t, [
    ['the walls really need paint', 'the walls really needed paint'],
    ['he is "happy" again', 'he was "happy" again'],
  ], 'toPastTense')
  t.end()
})
