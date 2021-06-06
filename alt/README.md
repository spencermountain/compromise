## View

```
  View (input) {
    parsers
    methods
    model
      - -
    document
    pointer
  }
```

### Plugin

```js
// apply a plugin
plugin(methods, model, process)
```

### Pointer

[
'/1/2:4',
'/0/foo:bar',

]

groups = {foo: [pntr, pntr]}

### View change

match(regs, view<document, pointer>)

### Reg

'#Noun foo' -> {hasTag:['Noun'], hasWord:['foo'], regs:[{}, {}] }
