### compromise-freeze ☃️

experiment to create a new control-flow in the compromie tagger, where given tags can be co-erced, or frozen, within both the compromise tagger, and any subsequent tagging attempts.

This freezing should imply that the user approves the given tags, and does not want to see them be changed indirectly, in some subsequent tagging process.

Freezing should only disable inconsistent tagging attempts, and allow any more-refined tags to be given.

### Use-case 1: Manual use of _.freeze()_

```js
let doc = nlp('a shoe in the closet')
let m = doc.match('shoe').tag('Noun')
m.freeze() // ☃️
m.tag('Verb') // ❌ (does nothing)
m.tag('Singular') // ✅ works

m.unfreeze() // 🏖️
m.tag('Verb') // ✅ works
```

### Use-case 2: implied use of _.freeze()_

User has a strong subset of their lexicon they want to guarantee passes-through, while other lexicon items may defer to the tagger's interpretation:

```js
nlp.frezeTerms({ 'dr who': 'Person' }) //stronger lexicon
nlp.addWords({ 'shoe in': 'Noun' }) //normal ugc lex

let doc = nlp('the dr who threw a shoe in the car.')
doc.debug() // 'dr who' lasts, but 'shoe in' is replaced
```

This may be especially helpful for multiple-word terms, which can be later mis-interpreted, when viewed independently:

```js
nlp.frezeTerms({ 'spot on': 'Adjective' }) // stronger
nlp.addWords({ 'spot on': 'Adjective' }) // weaker
```

---

### Use-case 3:

```js
// apply freezing on all user-tagged words
nlp.freezeUserLex()
let doc = nlp('i saw dr. who on ice.', { 'dr who': 'Person' })

let m = doc.match('dr who')
m.tag('TvShow') // does nothing
```

### Use-case 4

```js
let doc = nlp('i saw dr. who on ice.')
let m = doc.match('dr who')
m.tag('Person')
m.freeze() //prevent any loss of tags

m.tag('TvShow') // x - now does nothing
m.tag('Doctor') // works, because consistent
m.tag('Foobar') // works, because not in tree
```
