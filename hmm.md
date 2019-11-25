dangling child replace....

```js
let doc = nlp("springfield, springfield, it's a hell of a town.")
// keep a 'dangling' child document
let a = doc.match('a hell of a town')
// transform the parent document
doc.replace('hell of a', 'reasonable')
//dangling document is updated?
return a.text()
```

empty split() parent

```js
let doc = nlp(`i have two questions for Homer - 'Why lie?' and 'Lies, why?'`)
doc
  .quotations()
  .split()
  .out('array')
doc.clauses().split()
```

ngram collisions

```js
let doc = nlp('he fished and caught two fish')
doc.normalize('heavy')
console.log(doc.ngram())
```

syllables issues

```js
let doc = nlp(`Andreas Johnsson, Auston Matthews, and Zach Hyman.`)
let names = doc.clauses().split()
let json = names.syllables()
```

phone number missing

```js
nlp(`That’s right. I’m a surgeon. (800) 555-0000.`)
  .phoneNumbers()
  .out('array')
```

emojis

```js
nlp('good night! 💋')
  .emojis()
  .json()
```

```js
nlp(`wayne's world, party time`)
  .possessives()
  .out('array')
```

```js
nlp('it is a UNESCO world heritage site')
  .acronyms()
  .text()
```
