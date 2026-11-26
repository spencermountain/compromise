import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/agree-survey] '

// The verb conversions, over whole sentences: does the rest of the sentence still agree?
// These began as blind examples in tests/_hmm/verb-agree.hmm.js, and moved here once they passed.
//
// one example per line: 'method: input → expected'. A line without an arrow should not change.
const short = {
  past: 'toPastTense',
  present: 'toPresentTense',
  future: 'toFutureTense',
  inf: 'toInfinitive',
  gerund: 'toGerund',
  neg: 'toNegative',
  pos: 'toPositive',
}

const parse = str => str.trim().split('\n').map(line => {
  const [, method, rest] = line.match(/^(\w+): (.*)$/)
  const [input, want] = rest.split(' → ')
  return [short[method], input, want || input]
})

const group = (name, str) => {
  test(here + name, t => {
    parse(str).forEach(([method, input, want]) => {
      const doc = nlp(input)
      doc.verbs()[method]()
      t.equal(doc.text(), want, `${here}[${name}] ${method}: ${input}`)
    })
    t.end()
  })
}

// the present tense follows its subject
group('subject, to present', `
present: i walked home → i walk home
present: you walked home → you walk home
present: he walked home → he walks home
present: she walked home → she walks home
present: it worked → it works
present: we walked home → we walk home
present: they walked home → they walk home
present: the dog barked → the dog barks
present: the dogs barked → the dogs bark
present: Spencer walked home → Spencer walks home
present: my brother walked home → my brother walks home
present: my brothers walked home → my brothers walk home
present: the children played → the children play
present: the people left → the people leave
present: everyone laughed → everyone laughs
present: nobody cared → nobody cares
present: someone called → someone calls
present: this worked → this works
present: these worked → these work
present: the team won → the team wins
`)

// a subject of more than one word
group('longer subject, to present', `
present: Tom and Sue walked home → Tom and Sue walk home
present: the dog and the cat slept → the dog and the cat sleep
present: he and i walked → he and i walk
present: the dogs in the yard barked → the dogs in the yard bark
present: the dog in the yards barked → the dog in the yards barks
present: the keys on the table worked → the keys on the table work
present: the box of apples fell → the box of apples falls
present: each of the boys laughed → each of the boys laughs
present: one of the dogs barked → one of the dogs barks
present: the man who owns dogs laughed → the man who owns dogs laughs
present: the men who own a dog laughed → the men who own a dog laugh
present: the big red dog barked → the big red dog barks
present: his older brothers worked → his older brothers work
present: the United States agreed → the United States agrees
present: both of them left → both of them leave
`)

// am, is, are, was, were
group('copula', `
present: i was happy → i am happy
present: you were happy → you are happy
present: he was happy → he is happy
present: we were happy → we are happy
present: they were happy → they are happy
present: the dog was old → the dog is old
present: the dogs were old → the dogs are old
past: i am happy → i was happy
past: you are happy → you were happy
past: he is happy → he was happy
past: we are happy → we were happy
past: they are happy → they were happy
past: the dog is old → the dog was old
past: the dogs are old → the dogs were old
future: i am happy → i will be happy
future: he is happy → he will be happy
future: they were happy → they will be happy
present: i will be happy → i am happy
present: he will be happy → he is happy
present: they will be happy → they are happy
past: he will be happy → he was happy
past: they will be happy → they were happy
past: Tom and Sue are happy → Tom and Sue were happy
present: Tom and Sue were happy → Tom and Sue are happy
`)

// there is, and here are
group('there is', `
past: there is a dog outside → there was a dog outside
past: there are dogs outside → there were dogs outside
present: there was a dog outside → there is a dog outside
present: there were dogs outside → there are dogs outside
future: there is a dog outside → there will be a dog outside
future: there are dogs outside → there will be dogs outside
present: there will be dogs outside → there are dogs outside
present: there will be a dog outside → there is a dog outside
past: here are the keys → here were the keys
present: here were the keys → here are the keys
`)

// have, do, and be as helpers
group('helper verbs', `
past: he has walked → he had walked
past: they have walked → they had walked
present: he had walked → he has walked
present: they had walked → they have walked
present: i had walked → i have walked
future: he has walked → he will have walked
past: he is walking → he was walking
past: they are walking → they were walking
past: i am walking → i was walking
present: he was walking → he is walking
present: they were walking → they are walking
present: i was walking → i am walking
future: he is walking → he will be walking
present: he will be walking → he is walking
present: they will be walking → they are walking
present: i will be walking → i am walking
past: he does not walk → he did not walk
past: they do not walk → they did not walk
present: he did not walk → he does not walk
present: they did not walk → they do not walk
present: i did not walk → i do not walk
future: he does not walk → he will not walk
present: he will not walk → he does not walk
present: they will not walk → they do not walk
past: he has been walking → he had been walking
present: they had been walking → they have been walking
`)

// a contraction should stay one
group('contractions', `
past: i'm walking → i was walking
past: he's walking → he was walking
past: we're late → we were late
past: they're late → they were late
past: it's cold → it was cold
future: it's cold → it will be cold
past: she'll go → she went
present: she'll go → she goes
past: i've eaten → i had eaten
`)

// two verbs with one subject
group('joined verbs', `
past: he walks and talks → he walked and talked
present: he walked and talked → he walks and talks
present: they walked and talked → they walk and talk
past: she sings, dances and acts → she sang, danced and acted
present: she sang, danced and acted → she sings, dances and acts
past: he comes in and sits down → he came in and sat down
present: the dogs barked and ran → the dogs bark and run
present: the dog barked and ran → the dog barks and runs
past: he is tired and wants to sleep → he was tired and wanted to sleep
present: he was tired and wanted to sleep → he is tired and wants to sleep
`)

// two subjects, each with a verb
group('two clauses', `
past: she sings and he dances → she sang and he danced
present: she sang and he danced → she sings and he dances
present: he sang and they danced → he sings and they dance
past: when he walks, she runs → when he walked, she ran
present: when he walked, they ran → when he walks, they run
past: he says that she knows → he said that she knew
present: he said that they knew → he says that they know
past: if it rains, we stay home → if it rained, we stayed home
past: i think he is right → i thought he was right
present: i thought they were right → i think they are right
future: he walks. she runs. → he will walk. she will run.
past: he walks because she asks → he walked because she asked
present: the dog barked while the cats slept → the dog barks while the cats sleep
`)

// a second verb that does not carry the tense
group('verbs that stay', `
past: he wants to walk → he wanted to walk
present: he wanted to walk → he wants to walk
future: he wants to walk → he will want to walk
past: she likes swimming → she liked swimming
past: he starts running → he started running
past: to err is human → to err was human
past: he tries to help them win → he tried to help them win
present: they tried to help him win → they try to help him win
past: he makes me laugh → he made me laugh
past: running is fun → running was fun
present: swimming was fun → swimming is fun
past: he has a walking stick → he had a walking stick
past: she needs boiled water → she needed boiled water
past: he goes swimming → he went swimming
`)

// can, will, should
group('modals', `
past: he can walk → he could walk
past: they can walk → they could walk
past: he will walk → he walked
past: they will walk → they walked
present: he will walk → he walks
present: they will walk → they walk
present: i will walk → i walk
present: he would walk
neg: he will walk → he will not walk
neg: he should walk → he should not walk
pos: he cannot walk → he can walk
pos: he will not walk → he will walk
pos: he should not walk → he should walk
`)

// the helper verb comes first
group('questions', `
past: does he walk? → did he walk?
past: do they walk? → did they walk?
present: did he walk? → does he walk?
present: did they walk? → do they walk?
present: did i win? → do i win?
future: does he walk? → will he walk?
present: will he walk? → does he walk?
present: will they walk? → do they walk?
past: is he here? → was he here?
past: are they here? → were they here?
present: was he here? → is he here?
present: were they here? → are they here?
future: is he here? → will he be here?
past: where do they live? → where did they live?
present: where did he live? → where does he live?
past: who walks home? → who walked home?
past: what is it? → what was it?
past: has he left? → had he left?
present: were the dogs barking? → are the dogs barking?
present: was the dog barking? → is the dog barking?
`)

// does not, and did not
group('negative', `
neg: he walks → he does not walk
neg: they walk → they do not walk
neg: i walk → i do not walk
neg: the dog barks → the dog does not bark
neg: the dogs bark → the dogs do not bark
neg: he walked → he did not walk
neg: they walked → they did not walk
neg: he is nice → he is not nice
neg: they are nice → they are not nice
neg: i am here → i am not here
neg: he was here → he was not here
neg: he has left → he has not left
neg: he is walking → he is not walking
neg: Tom and Sue walk → Tom and Sue do not walk
neg: he went home → he did not go home
neg: she ate lunch → she did not eat lunch
neg: walk the dog → do not walk the dog
neg: he walks. she runs. → he does not walk. she does not run.
`)

// taking the 'not' back out
group('positive', `
pos: he does not walk → he walks
pos: they do not walk → they walk
pos: i do not walk → i walk
pos: the dog does not bark → the dog barks
pos: the dogs do not bark → the dogs bark
pos: he did not walk → he walked
pos: he did not go home → he went home
pos: she did not eat lunch → she ate lunch
pos: he is not nice → he is nice
pos: i am not here → i am here
pos: he has not left → he has left
pos: he doesn't walk → he walks
pos: they don't walk → they walk
pos: he didn't go → he went
pos: he isn't nice → he is nice
pos: he won't go → he will go
pos: he can't swim → he can swim
pos: do not walk the dog → walk the dog
pos: Tom and Sue do not walk → Tom and Sue walk
`)

// the thing done comes first
group('passive', `
present: the cake was eaten → the cake is eaten
present: the cakes were eaten → the cakes are eaten
past: the cake is eaten → the cake was eaten
past: the cakes are eaten → the cakes were eaten
future: the cake was eaten → the cake will be eaten
present: the cake will be eaten → the cake is eaten
present: the cakes will be eaten → the cakes are eaten
past: the cake has been eaten → the cake had been eaten
present: the cakes had been eaten → the cakes have been eaten
past: he is being followed → he was being followed
present: they were being followed → they are being followed
neg: the cake was eaten → the cake was not eaten
`)

// the past tense is not made with 'ed'
group('irregular verbs', `
past: he goes home → he went home
present: he went home → he goes home
present: they went home → they go home
past: she eats lunch → she ate lunch
present: she ate lunch → she eats lunch
past: he runs fast → he ran fast
present: he ran fast → he runs fast
past: she buys bread → she bought bread
present: she bought bread → she buys bread
past: he thinks so → he thought so
present: he thought so → he thinks so
past: she has a dog → she had a dog
present: she had a dog → she has a dog
present: they had a dog → they have a dog
past: he does the dishes → he did the dishes
present: he did the dishes → he does the dishes
present: they did the dishes → they do the dishes
past: she says no → she said no
present: she said no → she says no
past: he flies home → he flew home
present: he flew home → he flies home
past: she tries hard → she tried hard
present: she tried hard → she tries hard
past: she cuts the cake → she cut the cake
past: he reads books → he read books
present: she taught math → she teaches math
present: he caught fish → he catches fish
present: it cost a lot → it costs a lot
future: he went home → he will go home
`)

// words inside, and after, the verb
group('adverbs and particles', `
past: he quickly walks away → he quickly walked away
present: he quickly walked away → he quickly walks away
past: she gives up → she gave up
present: she gave up → she gives up
present: they gave up → they give up
past: he really likes it → he really liked it
present: he really liked it → he really likes it
past: he always walks → he always walked
present: he will always walk → he always walks
past: she never eats meat → she never ate meat
present: she never ate meat → she never eats meat
past: he picks it up → he picked it up
present: he looked it up → he looks it up
future: she gave up → she will give up
neg: he quickly walks away → he does not quickly walk away
`)

// capitals, and marks beside the verb
group('case and punctuation', `
past: He walks. → He walked.
present: He walked. → He walks.
future: He walks. → He will walk.
past: Is he here? → Was he here?
future: Is he here? → Will he be here?
past: Walks home. → Walked home.
past: he walks, then runs. → he walked, then ran.
past: he walks; she runs. → he walked; she ran.
past: he (really) walks → he (really) walked
past: "i walk" → "i walked"
past: he walks! → he walked!
neg: He walks. → He does not walk.
pos: He does not walk. → He walks.
pos: Do not walk the dog. → Walk the dog.
neg: Walk the dog. → Do not walk the dog.
present: Did he walk? → Does he walk?
past: he walks... → he walked...
`)

// make the plain form, and the -ing form
group('infinitive and gerund', `
inf: he walks home → he walk home
inf: he walked home → he walk home
inf: he is nice → he be nice
inf: they were nice → they be nice
inf: he will walk → he walk
inf: he has walked → he walk
gerund: he walks home → he is walking home
gerund: they walk home → they are walking home
gerund: i walk home → i am walking home
gerund: the dogs bark → the dogs are barking
gerund: Tom and Sue walk → Tom and Sue are walking
`)
