### tense - tricky cases
```js
//infinitives
['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop']

//passive
['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre']

//grammatical-number
['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop']
```


## negation - tricky cases
```js
//middle-adverb
[`he quietly walked`, `he did not quietly walk`],
```

## inflection - add article
```js
  var str = 'men go';
  var m = nlp(str).sentences().toPastTense().nouns().toSingular();
  t.equal(m.out('normal'), 'a man went', str);
```
