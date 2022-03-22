[compromise](http://compromise.cool/) is a javascript library that can does natural-language-processing tasks in the browser.

v14 is a big release, a proud re-write. A lot of sticky problems are now gone.

main updates:

### Speed
v14 is much faster. Usually 2x faster. You should be able to parse twice as many documents, in the same time.

### Size
v14 has been split into 3 libraries, so you can choose how-much of the library you'd like to use.
this is possible by switching to esmodules.
```js
import nlp from 'compromise/one' // 68kb
import nlp from 'compromise/two' // 225kb
import nlp from 'compromise/three' // 275kb
```

in v14, we are dropping support for IE11 and node <12.

### Self-repairing pointers
we've finally found a quick way to support dynamic pointers to changing word data:
```js
let doc = nlp('the dog is nice')
let sub = doc.match('is')
doc.match('doc').insertBefore('brown')
console.log(sub.text())
// 'is'
```
This works by using a fast-mode index lookup, with id-based error-correction.

### Included plugins
`compromise-penn-tags` `compromise-plugin-scan` and `compromise-plugin-typeahead` are now included in `/one` by default, which is great news.
`compromise-plugin-numbers` and `compromise-plugin-adjectives` is included by default in `/three`

### New languages
We now support early-versions of [french](https://compromise.cool/one/french), [spanish](https://compromise.cool/one/spanish), and [german](https://compromise.cool/one/german)

### Measured tagging suggestion
a user-given lexicon is less co-ercive - so adding your own words is less-dangerous:

```js
nlp('Dan Brown', { brown: 'Color' }).has('#Color') //false
```

### Replace wildcards
```js
let doc = nlp('i am george and i live in France.')
doc.replace('i am [#Person+] and i live in [.]', '$0 is from $1')
doc.text()
// 'george is from France'
```

### Root-replace
`.swap()` is a way to replace via a root-word - where declinations are automatically handled:
```js
let doc = nlp('i strolled downtown').compute('root')
doc.swap('stroll', 'walk')
// 'i walked downtown'
```

### New plugin scheme
We finally have a `.plugin()` scheme strong-enough to use internally. v14 is completely constructed via .plugin().
See the [plugin documentation](https://observablehq.com/@spencermountain/compromise-plugins) for details.

### New plugins
see 
* [compromise-speed](https://github.com/spencermountain/compromise/tree/master/plugins/speed)
* [compromise-stats](https://github.com/spencermountain/compromise/tree/master/plugins/stats)
* [compromise-wikipedia](https://github.com/spencermountain/compromise/tree/master/plugins/wikipedia)

as well as our existing [compromise-speech](https://github.com/spencermountain/compromise/tree/master/plugins/speech) and [compromise-dates](https://github.com/spencermountain/compromise/tree/master/plugins/dates) functionality

---

## Misc changes

- **[breaking]** - remove `.parent()` and `.parents()` chain - (use `.all()` instead)
- **[breaking]** - remove `@titleCase` alias (use @isTitleCase)
- **[breaking]** - remove '.get()' alias - use '.eq()'
- **[breaking]** - remove `.json(0)` shorthand - use `.json()[0]`
- **[breaking]** - remove `.tagger()` - use .compute('tagger')
- **[breaking]** - remove `.export()` -> .load()  - use .json() -> nlp(json)
- **[breaking]** - remove `nlp.clone()`
- **[breaking]** - remove `.join()` *deprecated*
- **[breaking]** - remove `.lists()`  *deprecated*
- **[breaking]** - remove `.segment()` *deprecated*
- **[breaking]** - remove `.sententences().toParticiple()` & `.verbs().toParticiple()`
- **[breaking]** - remove `.nouns().toPossessive()` & `.nouns().hasPlural()`
- **[breaking]** - remove array support in match methods - (use `.match().match()` instead)
- **[breaking]** - refactor `.out('freq')` output format - (uses `.compute('freq').terms().unique().json()` instead)
- **[breaking]** - change `.json()` result format for subsets
- **[change]** merge re-used capture-group names in one match
- **[change]** drop support for undocumented empty '.split()' methods - which used to split the parent
- **[change]** subtle changes to `.text('fmt')` formats
- **[change]** @hasContraction is no-longer secretly-greedy. use `@hasContraction{2}`
- **[change]** `.and()` now does a set 'union' operation of results (no overlaps)
- **[change]** bestTag is now `.compute('tagRank')`
- **[change]** `.sort()` is no longer in-place (its now immutable)
- **[change]** drop undocumented options param to `.replaceWith()` method
- **[change]** add match-group as 2nd param to split methods
- **[change]** remove #FutureTense tag - which is not really a thing in english
- **[change]** `.unique()` no-longer mutates parent
- **[change]** `.normalize()` inputs cleanup
- **[change]** drop agreement parameters in .numbers() methods
- **[change]** - less-magical money parsing - `nlp('50 cents').money().get()` is no-longer `0.5`
- **[change]** - .find() does not return undefined on an empty result anymore
- **[change]** - fuzzy matches must now be wrapped in tildes, like `~this~`
- **[new]** `.union()`, .intersection(), .difference() and .complement() methods
- **[new]** `.confidence()` method - approximate tagging confidence score for arbitrary selections
- **[new]** `.settle()` - remove overlaps in matches
- **[new]** `.isDoc()` - helper-method for comparing two views
- **[new]** `.none()` - helper-method for returning an empty view of the document
- **[new]** `.toView()` method - drop back to a normal Class instance
- **[new]** `.grow()` `.growLeft()` and `.growRight()` methods
- **[new]** add punctuation match support via pre/post params
- **[new]** add ambiguous empty .map() state as 2nd param