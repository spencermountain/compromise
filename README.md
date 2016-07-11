#new v7 API proposal! :heart::heart::heart::heart::heart:
```javascript
nlp('', {}).to(myTransform).as(myOutput)

nlp('', {}).sentences[0].to('PastTense').as('json')
nlp('', {}).if('Question').get('Nouns')

nlp('', {}).get('passiveVoice')
```

###Reasoning:
* clears-up immutable/mutable ambiguity
* supports no-install 'first-class' scripting/plugins
* less-surprising return values
* avoids re-parsing problems in pos-specific methods like `nlp.value()`

###no more `nlp.person(), nlp.value()...`
**every input** will now be pos-tagged, and automatically supplied the appropriate methods of each term.
* if you don't trust this, you can co-erce the POS:
```javascript
nlp('john is cool').to('Noun').to('plural').as('text')
//john is cools
```
* some conditional logic for applying appropriate transformation, like
```javascript
nlp('doctor').to('plural').as('text')
//doctors
nlp('we went to the doctor to visit.').to('plural').as('text')
//he went to the doctors to visit.
```

#API
##Change/Transform `.to()`
```javascript
nlp('john is cool').to('PastTense');

nlp('john is cool').to('Question');

nlp('john is cool').to(myTransform);
```
They alone should transform/mutate the state. These methods all return `this`.

##Query `.get()`
```javascript
nlp('john is cool').get(ngrams);
//['john is', 'is cool'...]
nlp('john is cool').get('verbs');
//[Term="is"]
nlp('john is cool').get('people');
//[Person="john"]
```
##Yes/No info `.is()`
```javascript
nlp('john is cool').is('Question');
//false
nlp('kick').is('Verb');
//true
nlp('oh, great new api.').is(isSarcastic);
//true
```


##Match/subset-lookup `.match()`
```javascript
nlp('john is cool and jane is nice').match('[Person] is');
// [Terms[], Terms[]]
```
not sure how to handle, and represent these subsets of sentences


##Conditional transforms? `.if()`
like `.is()`. but somehow disables subsequent transformations
```javascript
//and maybe this?
nlp('john is cool').if('Statement').to('Negative');
//'john is not cool'
nlp('john is cool').if('Copula').to('PastTense');
//'john was cool'
```

##rendering, return, output `.as()`
```javascript
nlp('John is cool').as('normal');
nlp('John is cool').as('text');
nlp('John is cool').as('html');
//also allows a cleaner, less-crowded result
nlp('John is cool').as('json');
//and adhoc-scripting
nlp('John is cool').as(myFunction);
```
