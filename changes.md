main things:

- esmodules
- one/two/three split
- drop IE11
- cache a sequence of matches
- better logging

---

### One

### Two

### Three

---

```js
//matching from an array
match(['foo', 'far'])
```

-**[breaking]** - drop `.parent()` and `.parents()` (use `.all()`)

- move fuzzy matching to a plugin
- drop array support in match methods
- drop support for using Doc as match input
- drop '.get()' alias - use '.eq()'
- **[change]** merge re-used capture-group names in one match
- **[change]** drop support for undocumented empty '.split()' methods - which used to split the parent
- **[change]** change .text('fmt') formats
- **[change]** @hasContraction is no-longer secretly-greedy. use `@hasContraction{2}`

---
