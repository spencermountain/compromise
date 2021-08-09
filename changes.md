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

- **[breaking]** - drop `.parent()` and `.parents()` chain - (use `.all()` instead)
- **[breaking]** - drop `.out('freq')` output format - (use`.compute('freq').json()` instead)
- **[breaking]** - drop array support in match methods - (use `.match().match()` instead)
- **[breaking]** - drop support for using Doc object as match input
- **[breaking]** - drop `@titleCase` alias (use @isTitleCase)
- **[breaking]** - drop '.get()' alias - use '.eq()'
- move fuzzy matching to a plugin

- **[change]** merge re-used capture-group names in one match
- **[change]** drop support for undocumented empty '.split()' methods - which used to split the parent
- **[change]** change .text('fmt') formats
- **[change]** @hasContraction is no-longer secretly-greedy. use `@hasContraction{2}`

---
