<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>parse and format numbers in text</div>
  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-numbers">
    <img src="https://img.shields.io/npm/v/compromise-numbers.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-numbers/builds/compromise-numbers.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/numbers/builds/compromise-numbers.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-numbers</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-numbers'))

let doc = nlp('I’d like to request seventeen dollars for a push broom rebristling')
doc.numbers().debug()
// 17
```

## [Demo](https://observablehq.com/@spencermountain/compromise-values)

## API

- **[.numbers()](https://observablehq.com/@spencermountain/compromise-values)** - grab all written and numeric values
  - **[.numbers().json()](https://observablehq.com/@spencermountain/compromise-values)** - overloaded output with number metadata
  - **[.numbers().get()](https://observablehq.com/@spencermountain/compromise-values)** - retrieve the parsed number(s)
  - **[.numbers().fractions()](https://observablehq.com/@spencermountain/compromise-values)** - things like `1/3rd`
  - **[.numbers().toText()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `five` or `fifth`
  - **[.numbers().toNumber()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `5` or `5th`
  - **[.numbers().toOrdinal()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `fifth` or `5th`
  - **[.numbers().toCardinal()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `five` or `5`
  - **[.numbers().add(n)](https://observablehq.com/@spencermountain/compromise-values)** - increase number by n
  - **[.numbers().subtract(n)](https://observablehq.com/@spencermountain/compromise-values)** - decrease number by n
  - **[.numbers().increment()](https://observablehq.com/@spencermountain/compromise-values)** - increase number by 1
  - **[.numbers().decrement()](https://observablehq.com/@spencermountain/compromise-values)** - decrease number by 1
  - **[.numbers().isEqual(n)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers with this value
  - **[.numbers().greaterThan(min)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers bigger than n
  - **[.numbers().lessThan(max)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers smaller than n
  - **[.numbers().between(min, max)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers between min and max
  - **[.numbers().isOrdinal()](https://observablehq.com/@spencermountain/compromise-values)** - return only ordinal numbers
  - **[.numbers().isCardinal()](https://observablehq.com/@spencermountain/compromise-values)** - return only cardinal numbers
  - **[.numbers().toLocaleString()](https://observablehq.com/@spencermountain/compromise-values)** - add commas, or nicer formatting for numbers
  - **[.numbers().normalize()](https://observablehq.com/@spencermountain/compromise-values)** - split-apart numbers and units `20mins` -> `20 mins`
- **[.money()](https://observablehq.com/@spencermountain/compromise-values)** - like \$5.50 or '5 euros'
  - **[.money().get()](https://observablehq.com/@spencermountain/compromise-values)** - retrieve the parsed amount(s) of money
  - **[.money().json()](https://observablehq.com/@spencermountain/compromise-values)** - currency + number info
  - **[.money().currency()](https://observablehq.com/@spencermountain/compromise-values)** - which currency the money is in
- **[.fractions()](https://observablehq.com/@spencermountain/compromise-values)** - like '2/3rds'
- **[.percentages()](https://observablehq.com/@spencermountain/compromise-values)** - like '2.5%'

### Opinions:

if a number is changed within a sentence, attempts are made at sentence-agreement - in both a leading determiner, and the plurality of a following noun.
This is done safely, but it may have sneaky or unintended effects for some applications.

**money, fractions, and percentages** will be returned and work fine in `.numbers()`, but can be isolated with `.money()`, `.fractions()` and `.percentages()`

### Ambiguous currencies
many currency symbols are re-used, for different countries. We try to make some safe assumptions about this. compromise-numbers assumes a naked `$` is USD, `£` is GBP, `₩` is South Korean, and `'kr'` is Swedish Krona.

Configuring this should be possible in future versions.

### Years and Time
**times** like `5pm` are parsed and handled by [compromise-dates](https://observablehq.com/@spencermountain/compromise-dates) and are not returned by `.numbers()`.

### Decimal seperators
compromise-numbers uses the [period decimal point](https://en.wikipedia.org/wiki/Decimal_separator) and supports comma as a thousands-seperator.
Some european or latin-american number formats like comma-decimals, or space-separated-thousands do not parse properly.

### Serial numbers
attempts are made to ignore phone-numbers, postal-codes and credit-card numbers from `.numbers()` results, but there may be numbers used in other ways that are not accounted for.


work in progress!

MIT
