### compromise-freeze ☃️

experiment to create a new control-flow in the compromie tagger, where given tags can be co-erced, or frozen, within both the compromise tagger, and any subsequent tagging attempts.

This freezing should imply that the user approves the given tags, and does not want to see them be changed indirectly, in some subsequent tagging process.

Freezing should only disable inconsistent tagging attempts, and allow any more-refined child tags to be given.

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

User has a strong subset of their lexicon they want to guarantee passes-through, while other lexicon items may defer to the tagger's interpretation.

This can be achieved by adding a `frozen?:boolean` param to addWords:

```js
nlp.addWords({ 'shoe in': 'Noun' }) //normal ugc lex
nlp.addWords({ 'dr who': 'Person' }, true) //stronger lexicon

let doc = nlp('the dr who threw a shoe in the car.')
doc.debug() // 'dr who' lasts, but 'shoe in' is replaced
```

This may be especially helpful for multiple-word terms, which can be later mis-interpreted, when viewed independently:

```js
nlp.addWords({ 'spot on': 'Adjective' }) // weaker
nlp.addWords({
  'game over': 'Expression'
  'drop dead fred': 'Film'
}, true) // stronger
```

### Freeze and the tag-tree

Freeze behviour will guard current tags against any destructive tagging. It will allow any child tags, or non-tree tags to be set:

```js
nlp.addTags({
  TvShow: {
    is: 'Organization',
    not: ['SportsTeam'],
  },
  Doctor: {
    is: 'Person',
    not: ['Athlete'],
  },
})

let doc = nlp('i saw dr. who on ice.')
let m = doc.match('dr who')
m.tag('Person') //set it
m.freeze() //prevent any loss of tags

m.tag('TvShow') // ❌ - now does nothing
m.tag('Doctor') // ✅ because consistent
m.tag('Foobar') // ✅ because not in tree
```

### Implementation

API work can be detailed in a plugin, while the bulk of the changes will in `compromise/two` tagger. A frozen term will need to be respected in all various places where a tag can be changed:

- from `.tag()` and `.unTag()`
- tagging in `.sweep()`
- misc suffix/prefix/regex taggers in `/two/compute`
- retagging after contraction
- retagging after .insert, or remove
- retagging after .compute('tagger')
- tagging after conjugation

If term is frozen, all new tags should be evaluated before they are written. This should not slow down the tagger, assuming frozen terms are rare. This violation-check needs to be fast, and placed in-front.

### Thoughts

- may be helped with a vizualization of the tag-tree (as part of the plugin?)
- we may want logging when a tag is skipped because it's frozen
- does this interfere with `.cache()`?
- do we need a '@isFrozen' term-method? or `.isFrozen()` match?
- can a frozen term still conjugate/inflect?

If the concept works, it would be a low-overhead feature to add to the main compromise API, and live in compromise/two.
