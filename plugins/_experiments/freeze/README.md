experiment to create a control-flow where given tags can be co-erced, or frozen, within the compromise tagger, and subsequent tagging attempts.

proposal 1:

```js
nlp.freeze({
  'dr who': 'Cartoon',
})
let doc = nlp('i saw dr. who on ice.')
```
