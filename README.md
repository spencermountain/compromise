# :sparkles: new v7 API working-draft :sparkles:
`nlp('my text', {context})`

Basic match/remove flow
```javascript
r = nlp('john is really nice. sara quickly walks.')
//reach-in and transform parts
r.match('#Person').toTitleCase()
//pluck-out some parts
r.remove('#Adverb')
r.plaintext()
// 'John is nice. Sara walks.'
```
Persistent transforms
```javascript
r = nlp('fifth of december')
r.toCardinal().plaintext()
// 'five of december'
r.toValue().plaintext()
// '5 of december'
```
Multi-term NounPhrase, VerbPhrase, AdjPhrase
```javascript
r = nlp('john would not have walked')
let vb = r.match('#VerbPhrase+')
vb.plaintext()
// 'would not have walked'
vb.toPositive().plaintext()
//would have walked
```
`.clone()` - non-persistent transforms
```javascript
r=nlp('This api is stable.')
//make a non-transitive copy
let tmp=r.clone()
tmp.toNegative()
tmp.toExclamation()
tmp.plaintext()
//This api is not stable!
r.plaintext()
//This api is stable.
```

###Reasoning:
Instead of `Term` objects having the methods & tooling, the library now hoists all this functionality to the main API, so you can filter-down, act-upon, and inspect a list of terms, just as easy as acting on a single term.

One word is now just a list of words, of length 1.

The idea is that now you can work on arbitrary text without arbitrary `nlp_compromise` choices getting in the way.
```javascript
r=nlp('singing').conjugate() //valid
r=nlp('was singing').conjugate() //valid
r=nlp('john was singing').conjugate() //valid
r=nlp('john was singing. Sara was also singing.').conjugate() //valid
```
