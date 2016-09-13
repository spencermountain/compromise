# :sparkles: new v7 API working-draft :sparkles:
```javascript
// nlp('input', {context})
```
match/remove
```javascript
r = nlp('john is really nice. sara quickly walks.')
r.match('#Person').toTitleCase()
r.remove('#Adverb')
r.plaintext()
//'John is nice. Sara walks.'
```
Persistent transforms
```javascript
r = nlp('fifth of december')
r.toCardinal().plaintext()
//'five of december'
r.toValue().plaintext()
//'5 of december'
```
NounPhrase, VerbPhrase, AdjPhrase
```javascript
r = nlp('john would not have walked')
let vb = r.match('#VerbPhrase+') // 'would not have walked'
vb.toPositive().plaintext()
//would have walked
```
.clone() for non-persistent transforms
```javascript
r=nlp('This api is stable.')
let tmp=r.clone()
tmp.toNegative()
tmp.toExclamation()
tmp.plaintext()
//This api is not stable!
r.plaintext()
//This api is stable.
```

###Reasoning:
* requires less working knowledge of internals
* clears-up immutable/mutable ambiguity
* supports no-install 'first-class' scripting/plugins
* less-surprising return values
* avoids re-parsing problems in pos-specific methods like `nlp.value()`
