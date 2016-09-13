#new v7 API proposal! :heart::heart::heart:
```javascript
// nlp('input', {context})

r = nlp('John is really nice. Sara quickly walks.')
r.remove('#Adverb')
r.plaintext()
//'John is nice. Sara walks.'

r = nlp('fifth of december')
r.toCardinal().plaintext()
//'five of december'
r.toValue().plaintext()
//'5 of december'

r = nlp('john would not have walked')
let vb = r.match('#VerbPhrase+') // 'would not have walked'
vb.toPositive().plaintext()
//would have walked

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
* clears-up immutable/mutable ambiguity
* requires less working knowledge of internals
* supports no-install 'first-class' scripting/plugins
* less-surprising return values
* avoids re-parsing problems in pos-specific methods like `nlp.value()`
