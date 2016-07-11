#new v7 API proposal!
```javascript
nlp('', {}).to(myTransform).as(myOutput)`
```
:heart::heart::heart::heart::heart:

Reasoning:
* clears-up immutable/mutable ambiguity in the api
* supports 'no-install' first-class scripting/plugins
* stable no-surprise return values
* avoids re-parsing problems in pos-specific methods like `nlp.value()`

###no more `nlp.person()` etc.
*every input* will now be pos tagged, and automatically supply the appropriate methods of each term.

if, you know in advance, and desire to co-erce the pos:
```javascript
nlp('mayor of toronto').to('Noun').to('plural').as('text')
//mayors of toronto
```

#Change/Transforms `.to()`
```javascript
nlp('john is cool').to('PastTense');

nlp('john is cool').to('Question');

nlp('john is cool').to(myTransform);
```
They alone should transform/mutate the state. These methods all return `this`.

#Query `.get()`
```javascript
nlp('john is cool').get(ngrams);
//[..]
nlp('john is cool').get('verbs');
//[Term() "is"]
nlp('john is cool').get('people');
//[Person() "john"]
```
##Yes/No info `.is()`
```javascript
nlp('john is cool').is('Question');
//(false)
nlp('kick').is('Verb');
//(true)
nlp('oh, great new api.').is(isSarcastic);
//(true)
```


#Match/subset-lookup `.match()`
```javascript
nlp('john is cool. jane is nice').match('[Person] is');
//
```


#Conditional transforms?
like `.is()`. but somehow disables subsequent transformations
```javascript
//and maybe this?
nlp('john is cool').if('Statement').to('Negative');
//'john is not cool'
nlp('john is cool').if('Copula').to('PastTense');
//'john was cool'
```

#returning/outputs
```javascript
nlp('John is cool').as('normal');
nlp('John is cool').as('text');
nlp('John is cool').as('html');
nlp('John is cool').as('json');
nlp('John is cool').as('debug');
nlp('John is cool').as(myFunction);
```
