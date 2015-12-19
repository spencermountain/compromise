### Extending nlp_compromise with Plugins/Mixins
nlp_compromise attempts to become the best way to work with, interpret, and manipulate language in javascript. Any sort of procedure or analysis can be applied, then shared as a plugin. Multiple plugins can be applied, and co-ordinated.

```javascript
const nlp_compromise = require("nlp_compromise")
let my_mixin = {
  Term: {
    fun : function() {
      return this.text + '!';
    }
  }
};
nlp.mixin(my_mixin);
let w = nlp.term('work');
w.fun()
// "work!"
```
see a [basic plugin example](../plugins/demo)


##List of plugins:
**Please add yours here**
* [English simplification](../plugins/simple_english) - swaps hard words for their simpler synonyms
* [valley_girl abstraction](../plugins/valley_girl) - adds 'like' etc.
