
// ---Nov 24th number agreement issue--
```js
let doc = nlp('7th hour').debug()
let num = doc.numbers()
num.toCardinal(false)
doc.debug()
//7 hours
```

// ---Nov 23rd tagger--
```js
let doc = nlp(`the latter a dire security threat`)
let doc = nlp(`My first thought was to push it away, he said.`)
let doc = nlp(`and too many of the rich made their money`)
let doc = nlp(`Puerto Rico only (I need historical inflation data)`)
let doc = nlp(`blows it up`)
let doc = nlp(`20 people, including many children`)
let doc = nlp(` with heads and arms rolling around`)
```
// --- verbphrase conjugation issues---
```js
let doc = nlp('i am being driven')
let doc = nlp('i should be driven')
let doc = nlp('i should have been driven')
doc.verbs().toParticiple()
doc.verbs().toPastTense()
doc.debug()
console.log(doc.verbs(0).conjugate())
doc.sentences().toFutureTense().debug()

 console.log(nlp('next week').dates().json())
 nlp('you are John, Lisa, Fred').match('#FirstName{1,2}').debug()

let doc = nlp('i could study').debug()
doc.verbs().toParticiple()
doc.sentences().toPastTense()
console.log(doc.text())
// i thought he really could have.

let doc = nlp('i did really walk')
doc.sentences().toPresentTense()
console.log(doc.text())
```

---- tagger issues ---
```js
nlp('lowered according').debug()
nlp('it bristles outwards, brushlike.').debug()
nlp('red-shouldered').debug()
nlp('age of it').debug()
nlp('so well that').debug()
nlp('is off-white').debug()
nlp('polyunsaturated').debug()
nlp('favoured treat').debug()
```

---- gerund uses ---
```
Snowboarding is a winter sport.   [snowboarding = subject]
I love snowboarding.    [snowboarding = object ]
I am excited by snowboarding.   [snowboarding = object of a preposition]
One popular sport is snowboarding.   [snowboarding = subject complement]
Right now, the athlete is snowboarding.   [is snowboarding = present continuous]    
He was snowboarding yesterday afternoon.   [was snowboarding = past continuous]
Tomorrow, my friends and I are going to be snowboarding.   [are going to be snowboarding = future 
```
