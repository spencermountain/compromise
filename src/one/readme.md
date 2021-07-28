<h1 align="center">
  <a href="https://github.com/spencermountain/compromise/tree/master/src/one"><code>./one</code></a>
</h1>
<p align="center">compromise <code>tokenizer</code> and core API</p>

## Contractions:

> _API:_

- `View.json()`
- `View.text()`
- `View.debug()`
- `View.out()`

- `View.match()`
- `View.matchOne()`
- `View.has()`
- `View.if()`
- `View.ifNo()`
- `View.not()`

- `View.sort()`
- `View.reverse()`
- `View.unique()`

- `View.splitOn()`
- `View.splitAfter()`
- `View.splitBefore()`

- `View.tag()`
- `View.tagSafe()`
- `View.unTag()`
<!-- - `View.canBe()` -->

- `View.all()`
- `View.fork()`
- `View.compute()`
  <!-- - `View.cache()` -->
  <!-- - `View.uncache()` -->

- `View.termList()`
- `View.terms()`
- `View.groups()`
- `View.eq()`
- `View.first()`
- `View.last()`
- `View.slice()`

- `View.toLowerCase()`
- `View.toUpperCase()`
- `View.toTitleCase()`
- `View.toCamelCase()`

- `View.wordCount()`

> _model:_

```js
{
  aliases:{},
  abbreviations:[], //(a Set)
  lexicon:{},
}
```

> _methods:_

```ts
{
  termMethods:{
    hasQuote: <function>,
    hasQuotation: <function>,
    hasComma: <function>,
    hasPeriod: <function>,
    hasExclamation: <function>,
    hasQuestionMark: <function>,
    hasEllipses: <function>,
    hasSemicolon: <function>,
    hasSlash: <function>,
    hasHyphen: <function>,
    hasDash: <function>,
    hasContraction: <function>,
    isAcronym: <function>,
    isKnown: <function>,
    isTitleCase: <function>,
    titleCase: <function>
  },
  compute: {
    freq: <function>
  }
}
```
