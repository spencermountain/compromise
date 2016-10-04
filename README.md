<div align="center">
  <strong>nlp_compromise</strong>
  <div>natural-language processing in the browser</div>

  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/nlp_compromise">
    <img src="https://img.shields.io/npm/v/nlp_compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" />
  </a>
</div>

<div align="center">
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/nlp_compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>

<div align="center">
  <code>npm install nlp_compromise</code>
</div>

<br/>
```javascript
var r = nlp('i look just like buddy holly')

r.normalize().toPast().text()
// "I looked just like Buddy Holly."

r.toNegative().text()
// "I didn't look just like Buddy Holly."

r.match('#Adverb').remove()
// "I didn't look like Buddy Holly."

r.match('#Person').toPronoun()
// "I didn't look like him."

```

##Basic match/remove flow
```javascript
r = nlp('john is really nice. sara quickly walks.')

//reach-in and transform parts
r.match('#Person').toTitleCase()

//pluck-out some parts
r.remove('#Adverb')

r.plaintext()
// 'John is nice. Sara walks.'
```
##Persistent transforms
```javascript
r = nlp('fifth of december')

r.toCardinal().plaintext()
// 'five of december'

r.toValue().plaintext()
// '5 of december'
```
##Multi-term `NounPhrase`, `VerbPhrase`, `AdjPhrase`
```javascript
r = nlp('john would not have walked')

vb = r.match('#VerbPhrase+')
vb.plaintext()
// 'would not have walked'

vb.toPositive().plaintext()
//would have walked
```
##`.clone()` - non-persistent transforms
```javascript
r=nlp('This api is stable.')

//make a non-transitive copy
tmp=r.clone()
tmp.toNegative()
tmp.toExclamation()
tmp.plaintext()
//This api is not stable!

r.plaintext()
//This api is stable.
```

##Reasoning:
Instead of `Term` objects having the methods & tooling, the library now hoists all this functionality to the main API, so you can filter-down, act-upon, and inspect a list of terms, just as easy as acting on a single term.

One word is now just a list of words, of length 1.

The idea is that now you can work on **arbitrary** text without **arbitrary** `nlp_compromise` choices getting in the way:
```javascript
r= nlp('singing').conjugate()
//valid

r= nlp('would have been singing').conjugate()
//valid

r= nlp('john was singing').conjugate()
//valid

r= nlp('john was singing. Sara was singing.').conjugate()
//valid
```
