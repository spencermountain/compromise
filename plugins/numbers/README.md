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
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-numbers/master/builds/compromise-numbers.min.js" />
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
  - **[.money()](https://observablehq.com/@spencermountain/compromise-values)** - things like `'$2.50'`
  - **[.fractions()](https://observablehq.com/@spencermountain/compromise-values)** - things like `1/3rd`
  - **[.money()](https://observablehq.com/@spencermountain/compromise-values)** - things like `twenty bucks`
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

MIT
