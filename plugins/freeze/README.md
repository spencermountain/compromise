experiment to create a new control-flow in the compromie tagger, where given tags can be co-erced, or frozen, within the compromise tagger, and any subsequent tagging attempts.

This freezing should imply that the user approves the given tags, and wishes to see them remain.

Freezing should only disable inconsistent tagging attempts, and allow any more-refined tags to be given.

### Use-case 1:

```js
let doc = nlp('i saw dr. who on ice.')
let m = doc.match('dr who')
m.tag('Person').freeze()

m.tag('TvShow') // x - now does nothing
m.tag('Doctor') // works, because consistent
m.tag('Foobar') // works, because not in tree
```

### Use-case 2:

```js
// apply freezing on all user-tagged words
nlp.freezeUserLex()
let doc = nlp('i saw dr. who on ice.', { 'dr who': 'Person' })

let m = doc.match('dr who')
m.tag('TvShow') // does nothing
```
