#new v7 API proposal! :heart::heart::heart:
```javascript
nlp('', {}).to(myTransform).render(myOutput)

nlp('This is experimental.', {}).to('Exclamation').render('Text')
//"This is experimental!"

nlp('washing machine', {}).to('Noun').to('Plural').render('Html')
//<span class="Noun Plural"/>washing&nbsp;machines</span>

nlp("It's really   good ", {}).to('PastTense').to('StripAdverbs').render('Normalized')
//it was good.

nlp("two tbsp of sugar", {}).info('Values')[0].unit
//tablespoon
```

###Reasoning:
* clears-up immutable/mutable ambiguity
* requires less working knowledge of internals
* supports no-install 'first-class' scripting/plugins
* less-surprising return values
* avoids re-parsing problems in pos-specific methods like `nlp.value()`

###no more `nlp.person(), nlp.value()...`
**every input** will now be pos-tagged, and automatically supplied the appropriate methods of each term.
* if you don't trust this, you can co-erce the POS:
```javascript
nlp('john is cool').to('Noun').to('plural').render('text')
//john is cools
```
* some conditional logic for applying appropriate transformation, like
```javascript
nlp('doctor').to('plural').render('text')
//doctors
nlp('we went to the doctor to visit.').to('plural').render('text')
//he went to the doctors to visit.
```

#API
##Change/Transform `.render()`
```javascript
nlp('john is cool').render('PastTense');

nlp('john is cool').render('Question');

nlp('john is cool').render(myTransform);
```
They alone should transform/mutate the state. These methods all return `this`.

##Query `.info()`
```javascript
nlp('john is cool').info(ngramsFn);
//['john is', 'is cool'...]
nlp('john is cool').info('verbs');
//[Term="is"]
nlp('john is cool').info('people');
//[Person="john"]
```
##Yes/No info `.is()`
```javascript
nlp('john is cool').is('Question');
//false
nlp('kick').is('Verb');
//true
nlp('oh, great new api.').is(mySarcasmDetector);
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

##rendering, return, output `.render()`
```javascript
nlp('John is cool').render('normal');
nlp('John is cool').render('text');
nlp('John is cool').render('html');
//also allows a cleaner, less-crowded result
nlp('John is cool').render('json');
//and adhoc-scripting
nlp('John is cool').render(myFunction);
```
