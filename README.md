Nlpcompromise version 2.0

## es6 classes
instead of bolting methods onto terms ad-hoc, we have
* a Term class - with things like `Term.syllables()`, `Term.normalised`
* each pos class inherits from Term - a Verb class with things like `Verb.conjugate()'

## typescript
* reduce bugs, reduce null-checking boilerplate

## advanced date & value parsing
* redaktor's cool units parsing, etc.

# To run:
```
npm install
grunt
```
