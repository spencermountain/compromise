import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/adverb-past] '

// [sentence, word, tag]
const arr = [
  // === a subject, then an adverb, takes a verb ===
  ['the walls really needed paint', 'needed', '#PastTense'],
  ['the walls needed paint', 'needed', '#PastTense'],
  ['the dogs really walked 5 miles', 'walked', '#PastTense'],
  ['he really needed home', 'needed', '#PastTense'],
  ['she truly loved him', 'loved', '#PastTense'],
  ['they still needed help', 'needed', '#PastTense'],
  ['I really appreciated the help', 'appreciated', '#PastTense'],
  ['the storm badly damaged the roof', 'damaged', '#PastTense'],
  ['his tales quite bewildered my mind', 'bewildered', '#PastTense'],
  ['it deeply affected the family', 'affected', '#PastTense'],
  ['she always loved the sea', 'loved', '#PastTense'],
  ['the kids totally lost interest', 'lost', '#PastTense'],
  ['Tom really needed a break', 'needed', '#PastTense'],
  ['nobody really expected rain', 'expected', '#PastTense'],
  ['we mostly failed', 'failed', '#PastTense'],
  ['I rather expected more', 'expected', '#PastTense'],
  // adverb chains
  ['he never really needed money', 'needed', '#PastTense'],
  ['she just really needed sleep', 'needed', '#PastTense'],
  // a subject pronoun starts its own predicate
  ['I think he really needed money', 'needed', '#PastTense'],
  ['that is what she really needed', 'needed', '#PastTense'],
  ['what he really needed was sleep', 'needed', '#PastTense'],
  ['I was sad but he really needed help', 'needed', '#PastTense'],
  ['he really worried about it', 'worried', '#PastTense'],
  // a perfect auxiliary
  ['they have still failed', 'failed', '#PastTense'],

  // === still an adjective ===
  // a copula before the adverb
  ['it is really needed', 'needed', '#Adjective'],
  ['he was really tired', 'tired', '#Adjective'],
  ['the room was still crowded', 'crowded', '#Adjective'],
  ['they were truly amazed', 'amazed', '#Adjective'],
  // an inverted copula before the subject
  ['is he really interested?', 'interested', '#Adjective'],
  ["isn't he really interested?", 'interested', '#Adjective'],
  ['is it really needed?', 'needed', '#Adjective'],
  ['are the drapes still closed?', 'closed', '#Adjective'],
  // the noun is an object, with a complement
  ['it made me really excited', 'excited', '#Adjective'],
  ['that left the kids really confused', 'confused', '#Adjective'],
  ['we found it really complicated', 'complicated', '#Adjective'],
  ['with the kids really excited we left', 'excited', '#Adjective'],
  ['me still confused', 'confused', '#Adjective'],
  // the noun leads a phrase
  ['everyone really interested should apply', 'interested', '#Adjective'],
  ['students still confused about the topic can ask', 'confused', '#Adjective'],
  // a contraction may hide a copula
  ["it's really crowded", 'crowded', '#Adjective'],
  ["he's really needed here", 'needed', '#Adjective'],
  // a linking verb
  ['she seemed truly amazed', 'amazed', '#Adjective'],
  ['I feel really worried', 'worried', '#Adjective'],
  ['he got really scared', 'scared', '#Adjective'],
  // inside a noun-phrase
  ['a much needed rest', 'needed', '#Adjective'],
  ['a really needed rest', 'needed', '#Adjective'],
  ['a truly gifted actor', 'gifted', '#Adjective'],
  ['the still unspecified details', 'unspecified', '#Adjective'],
  ['her really tired eyes', 'tired', '#Adjective'],
  // degree adverbs prefer an adjective
  ['he very tired', 'tired', '#Adjective'],
  ['me so excited', 'excited', '#Adjective'],
  // no subject
  ['badly damaged', 'damaged', '#Adjective'],
  ['deeply closed', 'closed', '#Adjective'],
]

test('adverb-past:', function (t) {
  arr.forEach(function (a) {
    const [str, word, tag] = a
    const doc = nlp(str)
    const m = doc.match(word)
    const tags = doc.json()[0].terms.map(term => term.tags[0])
    t.equal(m.has(tag), true, here + `'${str}' - [${word}] ${tag} - '${tags.join(', ')}'`)
  })
  t.end()
})
