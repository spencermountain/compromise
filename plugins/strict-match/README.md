<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-strict-match">
    <img src="https://img.shields.io/npm/v/compromise-strict-match.svg?style=flat-square" />
  </a>
  v
  <!-- file size -->
  <a href="https://unpkg.com/compromise-strict-match/builds/compromise-strict-match.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/strict-match/builds/compromise-strict-match.min.js" />
  </a>
   <hr/>
   <div >
   by <a href="https://github.com/kelvinhammond">Kelvin Hammond</a>
   </div>
</div>

<div align="center">
  <code>npm install compromise-strict-match</code>
</div>

The <a href="https://observablehq.com/@spencermountain/compromise-match-syntax">compromise match syntax</a> is a custom language for matching and querying tags and metadata in a document.

This plugin is an experimental re-write of this syntax using a formal parser (<a href="https://github.com/SAP/chevrotain">chevrotrain</a>) and a strict spec.

This may be useful for some purposes, where recursive queries, or error-reporting is required. 

This library implements a subset of the match-syntax, and has different edge-cases.

It does add 135kb to filesize, so is not meant as a replacement of the default match method.

This library can be used <a href="./lib">to generate rail-road diagrams</a> of match queries, or to test them for syntax errors. Pre-compiling matches may result in small, but noticable performance improvements over the native .match().

```javascript
import nlp from "compromise";
import plugin from "compromise-strict-match";

nlp.extend(plugin);

let doc = nlp("hello world")
  .strictMatch("(?P<greeting>hi|hello|good morning) #Noun")
  .groups("greeting");
console.log(doc.text());
```

**commonjs:**

```javascript
const nlp = require("compromise");
nlp.extend(require("compromise-strict-match").plugin);

let doc = nlp("Good morning world")
  .strictMatch("(?P<greeting>hi|hello|good morning) #Noun")
  .groups("greeting");
console.log(doc.text());
```
### Compling regexp

**es6:**

```javascript
import { NLPRegexP } from "compromise-strict-match";
// ... rest from usage above

const regex = new NLPRegexP("(?P<greeting>hi|hello|good morning) #Noun");
// or: const regex = nlp.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');
// or: const regex = doc.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');

let doc = nlp("hello world").strictMatch(regex).groups("greeting");
console.log(doc.text());
```

### Supported RegexP grammar

- StartOf: `^` - start of string
- Value: can be repeated
  - Any: `.` - match any word
  - Tag: `#Noun` - part of speech / tags
  - Word: `hello` - just the word
    - EscapedWord: `\#Noun` matches the word `#Noun`
  - Group: `(...)` - match groups, will also capture which saves group
    content, values of `...` will be matched.
    - Or: `(value0|value1|value2 value3)` - matches either value statements in
      group.
    - Named: `(?P<name>...)` - saves group which can later be accessed by name
    - NonCapturing: `(?:...)` - don't save group's matched content
    - Positive Lookahead: `(?=...)` - does not consume, asserts that group matches ahead
    - Negative Lookahead: `(?!...)` - does not consume, opposite of positive lookahead
  - Modifiers: goes at the end of value, ex: `Hi+`
    - Plus: `+` - matches one or more occurances of value
    - Star: `*` - matches zero or more occurances of value
    - Question: `?` - matches zer or one occurance of value
    - Non Greedy Matches: `+?`, `*?`, `??` match as little as possible while
      still maintining a match.
    - **Note**: repeatedly matched groups will overwrite and save only the last value.
- EndOf: `$` - end of string


GPL-3