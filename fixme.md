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


##conjugations

// coming => com
// moving => mov
// joking => jok
// poking => pok
// naming => nam
// aching => ach
// tuning => tun
// bling => ble
// hazing => haz
// oozing => ooz
// gazing => gaz
// easing => eas
// dozing => doz
// raring => rar
// honing => hon
// fuming => fum
// razing => raz

// lied => ly
// shed => sh
// owed => ow
// aged => ag
// aced => ac
// axed => ax
// egged => eg
