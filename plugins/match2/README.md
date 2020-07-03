# compromise-match2

A batter match function for nlp compromise.

## Links

- [Github](https://github.com/catalogm/compromise-match2)
- [npm](https://www.npmjs.com/package/compromise-match2)

## Quickstart

**Install:**

```
npm install compromise-match2
```

### Usage

**es6**:

```javascript
import nlp from "compromise";
import compromise_match2 from "compromise-match2";

nlp.extend(compromise_match2);

let doc = nlp("hello world")
  .match2("(?P<greeting>hi|hello|good morning) #Noun")
  .groups("greeting");
console.log(doc.text());
```

**commonjs:**

```javascript
const nlp = require("compromise");
nlp.extend(require("compromise-match2"));

let doc = nlp("Good morning world")
  .match2("(?P<greeting>hi|hello|good morning) #Noun")
  .groups("greeting");
console.log(doc.text());
```

## API

### Compling regexp

**es6:**

```javascript
import { NLPRegexP } from "compromise-match2";
// ... rest from usage above

const regex = new NLPRegexP("(?P<greeting>hi|hello|good morning) #Noun");
// or: const regex = nlp.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');
// or: const regex = doc.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');

let doc = nlp("hello world").match2(regex).groups("greeting");
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
