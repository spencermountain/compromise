
A Natural-Language-Processing library *in Javascript*, small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

> Welcome to v2.0!
> Please [file an issue](https://github.com/spencermountain/nlp_compromise/issues/new) if you find something

[![Video](http://i.vimeocdn.com/video/493948602_640.jpg)](https://vimeo.com/109880250)

[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](http://badge.fury.io/js/nlp_compromise)

[Changelog](https://github.com/spencermountain/nlp_compromise/blob/master/docs/changelog.md)
[Development](https://github.com/spencermountain/nlp_compromise/blob/master/docs/development.md)

# Install
```javascript
$ npm install nlp_compromise

nlp = require("nlp_compromise")
nlp.Term("hamburger").syllables()
//[ 'ham', 'bur', 'ger' ]
```

```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/master/client_side/nlp.min.js"> </script>
<script>
  nlp.Noun("dinosaur").pluralize()
  //dinosaurs
</script>
```

#API
```javascript
const API = function(str) {
  this.Term = function(s) {
    return new Term(s);
  };
  this.Verb = function(s) {
    return new Verb(s);
  };
  this.Adverb = function(s) {
    return new Adverb(s);
  };
  this.Adjective = function(s) {
    return new Adjective(s);
  };
  this.Text = function(s) {
    return new Text(s);
  };

  this.Noun = function(s) {
    return new Noun(s);
  };
  this.Person = function(s) {
    return new Person(s);
  };
  this.Date = function(s) {
    return new _Date(s);
  };
  this.Value = function(s) {
    return new Value(s);
  };
  this.Place = function(s) {
    return new Place(s);
  };
  this.Organisation = function(s) {
    return new Organisation(s);
  };
  if (str) {
    return new Text(str);
  }
};
```

## Licence
MIT