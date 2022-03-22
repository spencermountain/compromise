main things:

- esmodules
- one/two/three split
- drop IE11
- cache a sequence of matches
- better logging

* user-given lexicon is less co-ercive

```js
nlp('Dan Brown', { brown: 'Color' }).has('#Color') //false
```

this means adding your own words is less-dangerous.

---

### One

### Two

### Three

---

### Unmaintained indexes

```js
let m = nlp('the dog is nice')
let sub = m.match('is')
sub.insertAfter('really')
// t.equal(sub.out('normal')
```

### Clone/Fork

`.clone()` will copy the document data
<!-- , and `.fork()` will copy the linguistic context. 
a subset of a document can be cloned.-->

### Loop changes

- .find() does not return undefined on an empty result anymore

- .sort() does not change the document in-place anymore

### Text formats

- **normal**
  human-readable, lowercased, ascii-when-possible

- **machine**
  expanded contractions, no apostrophes,

```js
{
  text: "Spencer's",
  normal: "spencer's",
  machine: 'spencer'
},
{
  text: 're-factor',
  normal: 're-factor',
  machine: 'refactor'
}
```

```js
//matching from an array
match(['foo', 'far'])
```

### Tagger
<!-- - **[change]** Infinitive & Gerund are no longer PresentTense, automatically -->

### Number parsing
`compromise-plugin-numbers` is now included by default, which is great news.
- **[breaking]** - change `numbers().json()` result format
- **[change]** - less-magic with money parsing - `nlp('50 cents').money().get()` is no-longer `0.5`

### Date parsing
- **[change]** .json() date metadata has moved-around

### Replace wildcards
```js
let doc = nlp('i am george and i live in France.')
doc.replace('i am [#Person+] and i live in [.]', '$0 is from $1')
doc.text()
// 'george is from France'
```


### Main
- **[breaking]** - drop `.parent()` and `.parents()` chain - (use `.all()` instead)
- **[breaking]** - refactor `.out('freq')` output format - (uses `.compute('freq').terms().unique().json()` instead)
- **[breaking]** - drop array support in match methods - (use `.match().match()` instead)
- **[breaking]** - drop `@titleCase` alias (use @isTitleCase)
- **[breaking]** - drop '.get()' alias - use '.eq()'
- **[breaking]** - drop `.json(0)` shorthand - use `.json()[0]`
- **[breaking]** - drop .tagger() - use .compute('tagger')
- **[breaking]** - drop .export() -> .load()  - use .json() -> nlp(json)
- **[breaking]** - drop nlp.clone()
- **[breaking]** - drop .join() *deprecated*
- **[breaking]** - drop .lists()  *deprecated*
- **[breaking]** - drop .segment() *deprecated*
- **[breaking]** - drop .sententences().toParticiple() & .verbs().toParticiple()

- move fuzzy matching to a plugin


- **[change]** merge re-used capture-group names in one match
- **[change]** drop support for undocumented empty '.split()' methods - which used to split the parent
- **[change]** change .text('fmt') formats
- **[change]** @hasContraction is no-longer secretly-greedy. use `@hasContraction{2}`
- **[change]** .and() now does a set 'union' operation of results (no overlaps)
- **[change]** bestTag is now `.compute('tagRank')`
- **[change]** .sort() is no longer in-place (its now immutable)
- **[change]** drop undocumented options param to `.replaceWith()` method
- **[change]** add match-group as 2nd param to split methods
- **[change]** remove #FutureTense tag - which is not really a thing in english
- **[change]** .unique() no-longer mutates parent
- **[change]** .normalize() inputs cleanup
- **[change]** drop agreement parameters in .numbers() methods

### new methods
- **[new]** .union(), .intersection(), .difference() and .complement() methods
- **[new]** .confidence() method - approximate tagging confidence score for arbitrary selections
- **[new]** .settle() - remove overlaps in matches
- **[new]** .is() - helper-method for comparing two views
- **[new]** .none() - helper-method for returning an empty view of the document
- **[new]** .toView() method - drop back to a normal Class instance
- **[new]** .growLeft() and .growRight() methods
- **[new]** add punctuation match support via pre/post params
- **[new]** add ambiguous empty .map() state as 2nd param


---
