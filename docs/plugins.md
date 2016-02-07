### Plugins/Mixins
nlp_compromise attempts to become the best way to work with, interpret, and manipulate language in javascript. Any sort of procedure or analysis can be applied, then shared as a plugin. Multiple plugins can be applied, and co-ordinated.

```javascript
let my_mixin = {
  Term: {
    fun : function() {
      return this.text + '!';
    }
  }
};
nlp_compromise.plugin(my_mixin);
let w = nlp_compromise.term('work');
w.fun()
// "work!"
```
see a [basic plugin example](../plugins/demo)

**New in v3**

You can also pass a function to `nlp_compromise.plugin` to get access to the library instance. For example:

```javascript
let my_mixin = function (nlp) {
  return {
    Term: {
      fun : function() {
        return nlp.sentence(this.text + 'is fun!');
      }
    }
  };
};
nlp_compromise.plugin(my_mixin);
let w = nlp_compromise.term('work');
w.fun()
// Sentence "work is fun!"
```

see a [basic plugin example](../plugins/demo)

###Existing plugins:
* [English simplification](../plugins/simple_english) - swaps hard words for their simpler synonyms
* [valley_girl abstraction](../plugins/valley_girl) - adds 'like' etc.
