> todo:

- lexicon expand

- multi-word lexicon

- tag deduction

> questions:

- how should pointers work?

---

### Changes

- rename internal Tag properties
  -- Tag.upstream -> Tag.children
  -- Tag.isA -> Tag.parents

- move nlp.verbose()
