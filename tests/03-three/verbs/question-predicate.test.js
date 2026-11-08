import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/question-predicate] '

const convert = (str, method, select = 'sentences') => {
  const doc = nlp(str)
  doc[select]()[method]()
  return doc.text()
}

test(here + 'commands are not read as questions', t => {
  const arr = [
    'Do the dishes quickly',
    'Do the dishes and walk the dog',
    'Do the dishes before you leave',
    'Do the dishes before the kids eat',
    'Do the dishes, walk the dog',
    'Do it quickly',
    'Have a seat quickly',
  ]
  arr.forEach(str => t.equal(convert(str, 'toFutureTense'), str, str))
  // they convert like any other command: 'Wash the dishes quickly'
  const single = ['Do the dishes quickly', 'Do it quickly', 'Have a seat quickly']
  single.forEach(str => t.equal(convert(str, 'toPastTense'), str, 'past: ' + str))
  t.end()
})

test(here + 'questions that look like commands stay questions', t => {
  const arr = [
    ['Do the kids walk the dog?', 'Will the kids walk the dog?'],
    ['Do the walls need paint', 'Will the walls need paint'],
    ['Do the walls really need paint?', 'Will the walls really need paint?'],
    ['Do Tom and Mary walk?', 'Will Tom and Mary walk?'],
    ['Do the people near you know?', 'Will the people near you know?'],
    ['Did the dog bark when you left?', 'Will the dog bark when you left?'],
  ]
  arr.forEach(([str, want]) => t.equal(convert(str, 'toFutureTense'), want, str))
  t.end()
})

test(here + 'the predicate is not part of the subject', t => {
  const arr = [
    ['Is Tom a doctor?', 'Will Tom be a doctor?'],
    ['Is Tom a doctor', 'Will Tom be a doctor'],
    ['Is Tom a good doctor?', 'Will Tom be a good doctor?'],
    ['Is Tom my friend?', 'Will Tom be my friend?'],
    ['Is the winner you?', 'Will the winner be you?'],
    ['Is the man in the room a doctor?', 'Will the man in the room be a doctor?'],
    ['Were Tom and Mary a couple?', 'Will Tom and Mary be a couple?'],
    ['Is the book on the table?', 'Will the book be on the table?'],
    ['Is the book on the table', 'Will the book be on the table'],
    ['Is the book on the table when you arrive?', 'Will the book be on the table when you arrive?'],
    ['Is the cat with the hat on the table?', 'Will the cat with the hat be on the table?'],
    ['Is the king of Spain in the room?', 'Will the king of Spain be in the room?'],
    ['Are some of them in the room?', 'Will some of them be in the room?'],
    ['Is water on the table?', 'Will water be on the table?'],
    ['Is dinner at six?', 'Will dinner be at six?'],
    ["Isn't the book on the table?", "Won't the book be on the table?"],
    ['Why is Tom a doctor?', 'Why will Tom be a doctor?'],
    ['Why is the book on the table?', 'Why will the book be on the table?'],
  ]
  arr.forEach(([str, want]) => t.equal(convert(str, 'toFutureTense'), want, str))
  t.end()
})

test(here + 'the predicate moves in every conversion', t => {
  const arr = [
    ['toPastTense', 'Was Tom a doctor?'],
    ['toPresentTense', 'Is Tom a doctor?'],
    ['toFutureTense', 'Will Tom be a doctor?'],
    ['toGerund', 'Is Tom being a doctor?'],
    ['toPastParticiple', 'Has Tom been a doctor?'],
  ]
  arr.forEach(([method, want]) => t.equal(convert('Is Tom a doctor?', method, 'verbs'), want, method))
  t.end()
})

test(here + 'a rewritten question can be converted again', t => {
  const doc = nlp('Is the book on the table?')
  doc.sentences().toFutureTense()
  t.equal(doc.text(), 'Will the book be on the table?', 'to future')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'Was the book on the table?', 'and back to past')
  doc.verbs().toFutureTense()
  t.equal(doc.text(), 'Will the book be on the table?', 'and with .verbs()')
  t.end()
})

test(here + 'long subjects keep working', t => {
  const arr = [
    ['Is the box on the table heavy?', 'Will the box on the table be heavy?'],
    ['Is all the food gone?', 'Will all the food be gone?'],
    ['Are both the dogs here?', 'Will both the dogs be here?'],
    ['Are some of them here?', 'Will some of them be here?'],
    // the wh-word is the predicate
    ['Where is the book on the table?', 'Where will the book on the table be?'],
    ['Who is the man in the room?', 'Who will the man in the room be?'],
  ]
  arr.forEach(([str, want]) => t.equal(convert(str, 'toFutureTense'), want, str))
  // an appositive stays in the subject
  const appositive = convert('Is Tom, a doctor, happy?', 'toFutureTense')
  t.ok(appositive.startsWith('Will Tom, a doctor'), appositive)
  // 'of' does not divide a subject from its predicate
  const str = 'Which I believe was some sort of hovercraft.'
  t.equal(convert(str, 'toPresentTense'), 'Which I believe is some sort of hovercraft.', str)
  t.end()
})

test(here + 'fragments are not questions', t => {
  const arr = [
    ['is back on', 'will be back on'],
    ['is back on?', 'will be back on?'],
    ['is back on track', 'will be back on track'],
    ['Is wrong about him', 'will be wrong about him'],
    ['Is wrong about him?', 'will be wrong about him?'],
    ['Is happy about it', 'will be happy about it'],
  ]
  arr.forEach(([str, want]) => t.equal(convert(str, 'toFutureTense'), want, str))
  // a capitalized copula is still a copula
  t.equal(convert('Is wrong about him', 'toPastTense', 'verbs'), 'was wrong about him', 'not Ied')
  t.equal(convert('Are happy', 'toPastTense', 'verbs'), 'were happy', 'not Ared')
  t.end()
})

test(here + 'fragments never throw', t => {
  const strs = ['is back on', 'is back on?', 'Is wrong about him', 'Is wrong about him?', 'Was wrong about him', 'Is the book on?', 'is back on track', 'What I want is a dog', 'Which I believe was some sort of hovercraft.']
  const methods = ['toPastTense', 'toPresentTense', 'toFutureTense', 'toInfinitive', 'toGerund', 'toPastParticiple']
  strs.forEach(str => {
    methods.forEach(method => {
      t.doesNotThrow(() => convert(str, method, 'verbs'), `${method}: ${str}`)
    })
    t.doesNotThrow(() => convert(str, 'toFutureTense'), `sentences: ${str}`)
  })
  t.end()
})

test(here + 'a growing subordinate verb does not lose text', t => {
  const str = 'could you swim when you were young?'
  t.equal(convert(str, 'toPastParticiple', 'verbs'), 'could you have swum when you have been young?', 'participle')
  t.equal(convert(str, 'toGerund', 'verbs'), 'are you swimming when you are being young?', 'gerund')

  // the returned view selects the verbs, after they are rewritten
  const doc = nlp(str)
  const res = doc.verbs().toPastParticiple()
  t.equal(res.out('array').join(' '), 'could have swum have been', 'returned selection')
  t.equal(doc.text(), 'could you have swum when you have been young?', 'doc is intact')

  // surrounding sentences are left alone
  const two = nlp('She walks. Could you swim when you were young? They sleep.')
  two.sentences(1).verbs().toPastParticiple()
  t.equal(two.text(), 'She walks. Could you have swum when you have been young? They sleep.', 'neighbours')
  t.end()
})

test(here + 'a modal question gets a full participle', t => {
  const arr = [
    ['Could she eat?', 'Could she have eaten?'],
    ['Must the dog eat?', 'Must the dog have eaten?'],
    ['Could she eat after he arrived?', 'Could she have eaten after he has arrived?'],
  ]
  arr.forEach(([str, want]) => t.equal(convert(str, 'toPastParticiple', 'verbs'), want, str))
  t.end()
})

test(here + 'a sentence view can be replaced after it grows', t => {
  const doc = nlp('could you swim when you were young?')
  const sentence = doc.sentences().eq(0).harden()
  doc.match('were').replaceWith('have been')
  sentence.replaceWith('a new sentence')
  t.equal(doc.text(), 'a new sentence?', 'whole sentence is replaced')
  t.end()
})
